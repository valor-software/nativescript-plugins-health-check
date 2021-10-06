import * as core from '@actions/core';
import * as exec from '@actions/exec';
import { ExecOptions } from "@actions/exec/lib/interfaces";

import { pluginsList } from "../../workflows/plugins-list";


interface PluginVersion {
  tested?: string;
  latest?: string;
}

interface TestResultItem {
  version?: string;
  [key: string]: string // { directory: test_result (+/-)
}


class CheckForPluginUpdatesAction {
  FILE_NAME_FOR_REPORT = 'PLUGINS_COMPATIBILITY.md';
  delimiter = ', ';
  options: ExecOptions = {};
  myError = '';
  testResult: { [key: string]: TestResultItem } = {};
  pluginsVersions: { [key: number]: PluginVersion } = {};
  workingDirectories: string[] = [];
  needAddPluginsNames = false;


  async start() {
    let foundedNewVersion = false;

    try {
      this.needAddPluginsNames = !!core.getInput('add-plugins-names');
      this.workingDirectories = core.getInput('working-directories').replace(/\s/g, '').split(',');
      console.log('workingDirectories ====>', this.workingDirectories);
      if (!this.workingDirectories || !this.workingDirectories.length) {
        core.setFailed('No projects to test!');
        return;
      }

      for await (const workingDirectory of this.workingDirectories) {
        if (!workingDirectory) {
          return;
        }

        console.log(`Current working directory is ${workingDirectory}!`);

        this.options.cwd = './' + workingDirectory;

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
          // this.pluginsTestResult += workingDirectories + ';';
          await this.updatePlugins(workingDirectory);
        } else {
          console.log(`No updates for plugins!`);
        }
      }

      this.setOutput();
      // Get the JSON webhook payload for the event that triggered the workflow
      // const payload = JSON.stringify(github.context.payload, undefined, 2)
      // console.log(`The event payload: ${payload}`);

    } catch (error) {
      core.setFailed(error.message);
    }
  }


  async updatePlugins(workingDirectory: string) {
    for (let i = 0; i < pluginsList.length; i++) {
      const testedVersion = this.pluginsVersions[i].tested;
      const latestVersion = this.pluginsVersions[i].latest;
      let isSuccess = true;

      if (latestVersion && testedVersion !== latestVersion) {
        console.log('<===    PLUGIN TEST IS HERE     ====>');
        isSuccess = await this.testPlugin(pluginsList[i], latestVersion);
        // await this.uninstallPlugin(this.pluginsVersions[i]);
      }

      if (!this.testResult[pluginsList[i]]) {
        this.testResult[pluginsList[i]] = {};
      }

      this.testResult[pluginsList[i]].version = latestVersion;
      this.testResult[pluginsList[i]][workingDirectory] = isSuccess ? '+' : '-';
    }
  }


  async testPlugin(pluginName, version) {
    console.log('test the Plugin pluginName ====> ', pluginName);
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
      // core.setFailed('BUILD FILED  ---- < ----');
      // await exec.exec('tns FAILED-build android', [], this.options);

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

  setOutput() {
    let output = '';

    for (const pluginName of pluginsList) {
      output += this.needAddPluginsNames ? pluginName + this.delimiter + this.testResult[pluginName].version : '';

      for (const workingDirectory of this.workingDirectories) {
        output += this.delimiter + this.testResult[pluginName][workingDirectory];
      }
      output += ';';
    }

    core.setOutput('pluginsTestResult', output);
  }
}

(new CheckForPluginUpdatesAction()).start();
