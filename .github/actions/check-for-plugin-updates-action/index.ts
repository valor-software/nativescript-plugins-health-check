import * as core from '@actions/core';
import * as exec from '@actions/exec';
import { ExecOptions } from "@actions/exec/lib/interfaces";

import { pluginsList } from "../../workflows/plugins-list";


interface PluginVersion {
  tested?: string;
  latest?: string;
}


class CheckForPluginUpdatesAction {
  FILE_NAME_FOR_REPORT = 'PLUGINS_COMPATIBILITY.md';
  delimiter = '\|';
  options: ExecOptions = {};
  myError = '';
  pluginVersionsForPrint = '';
  pluginsVersions: { [key: number]: PluginVersion } = {};


  async start() {
    let foundedNewVersion = false;

    try {
      const workingDirectory = core.getInput('working-directory');
      console.log(`Current working directory is ${workingDirectory}!`);

      this.options.cwd = workingDirectory || './';

      for (let i = 0; i < pluginsList.length; i++) {
        const pluginName = pluginsList[i];
        console.log('pluginName ! ====>', pluginName);
        this.pluginsVersions[i] = {};


        this.options.listeners = {
          stdout: (data) => {
            const myOutput = data.toString().trim();
            // const match = myOutput.match(/[0-9.]+$/g) || [];
            const match = myOutput.match(/[0-9.]+/g) || [];
            this.pluginsVersions[i].tested = match[0];
          },
          stderr: (data) => {
            this.myError += '=grep tested=' + data.toString();
          }
        };
        // await exec.exec('npm list ' + pluginName + ' --depth=0', [], options);
        // todo: move ignoreReturnCode to options
        await exec.exec(`grep ${pluginName} ${this.FILE_NAME_FOR_REPORT}`, [], {
          ...this.options,
          ignoreReturnCode: true
        });


        this.options.listeners = {
          stdout: (data) => {
            const myOutput = data.toString().trim();
            const match = myOutput.match(/[0-9.]+$/g) || [];
            this.pluginsVersions[i].latest = match[0];
          },
          stderr: (data) => {
            this.myError += '=npm info=' + data.toString();
          }
        };

        await exec.exec(`npm info ${pluginName} version`, [], this.options);

        const testedVersion = this.pluginsVersions[i]?.tested;
        console.log('testedVersion ====>', testedVersion);
        const latestVersion = this.pluginsVersions[i]?.latest;
        console.log('latestVersion ====>', latestVersion);

        if (!latestVersion) {
          core.setFailed('Failed to get a plugin version for ' + pluginName + ' ! Check plugin name, please.');
          // todo: write to a log file
          return;
        }

        if (testedVersion !== latestVersion) {
          foundedNewVersion = true
        }
      }

      if (foundedNewVersion) {
        await this.updatePlugins();
      } else {
        console.log(`No updates for plugins!`);
      }

    } catch (error) {
      core.setFailed(error.message);
    }
  }

  async updatePlugins() {
    for (let i = 0; i < pluginsList.length; i++) {
      const testedVersion = this.pluginsVersions[i].tested;
      const latestVersion = this.pluginsVersions[i].latest;
      let isSuccess = true;

      if (latestVersion && testedVersion !== latestVersion) {
        console.log('<===    PLUGIN TEST IS HERE     ====>');
        isSuccess = await this.testPlugin(pluginsList[i], latestVersion);
        // await this.uninstallPlugin(this.pluginsVersions[i]);
      }

      this.pluginVersionsForPrint += i + 1 + this.delimiter + pluginsList[i] + this.delimiter + latestVersion
        + this.delimiter + (isSuccess ? '+\n' : '-\n');

      console.log('pluginVersionsForPrint ====>', this.pluginVersionsForPrint);
    }

    core.setOutput("pluginVersionsForPrint", this.pluginVersionsForPrint);
    // Get the JSON webhook payload for the event that triggered the workflow
    // const payload = JSON.stringify(github.context.payload, undefined, 2)
    // console.log(`The event payload: ${payload}`);
  }


  async testPlugin(pluginName, version) {
    console.log('test the Plugin pluginName ====>');
    let isSuccess = false;
    try {
      this.options.listeners = {
        stdout: (data) => {
          // const myOutput = data.toString();
          isSuccess = true;
        },
        stderr: (data) => {
          this.myError += '=npm install=' + data.toString();
          isSuccess = false;
        }
      };
      await exec.exec('npm install ' + pluginName + '@' + version + ' --save-exact', [], this.options);

      this.options.listeners = {
        stdout: (data) => {
          // const myOutput = data.toString();
          isSuccess = true;
        },
        stderr: (data) => {
          this.myError += '=tns build android=' + data.toString();
          console.log('this.myError ====>', this.myError);
          isSuccess = false
        }
      };
      await exec.exec('tns FAILED-build android', [], this.options);

      return isSuccess;

    } catch (error) {
      core.setFailed(error.message);
      return false;
    }
  }


  async uninstallPlugin(pluginName) {
    console.log('uninstallPlugin ====>');
    this.options.listeners = {
      stdout: (data) => {
        // const myOutput = data.toString();
      },
      stderr: (data) => {
        this.myError += '=npm uninstall=' + data.toString();
      }
    };

    await exec.exec('npm uninstall ' + pluginName, [], this.options);
  }
}

(new CheckForPluginUpdatesAction()).start();
