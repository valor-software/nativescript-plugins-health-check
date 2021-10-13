import * as core from '@actions/core';
import * as exec from '@actions/exec';
import { ExecOptions } from "@actions/exec/lib/interfaces";

import { pluginsList, pluginI } from "../../plugins-list";

interface PluginStateI {
  latestVersion?: string;
  testedVersion?: string;
  [key: string]: string // { [project (folder name)]: +/- [test_result]
}

class CheckForPluginUpdatesAction {
  ANDROID_RESULT_JSON_FILE = "android-result.json";
  IOS_RESULT_JSON_FILE = "ios-result.json";
  delimiter = ', ';
  errors = '';
  execOptions: ExecOptions = {};
  pluginsState: { [key: string]: PluginStateI } = {}; // key: plugin name
  projectsFolders: string[] = [];
  isAndroid = false;


  async start() {
    let foundedNewVersions = false;

    try {
      const nativescriptVersions: string[] = core.getInput('nativescript-versions')
        .replace(/\s/g, '')
        .split(',');
      this.projectsFolders = core.getInput('projects-folders')
        .replace(/\s/g, '')
        .split(',');
      this.isAndroid = !!core.getInput('is-android');

      this.pluginsState = await this.getOldPluginsStateFromFile();

      if (!this.projectsFolders || !this.projectsFolders.length) {
        core.setFailed('No projects to test!');
        return;
      }

      for (let i = 0; i < this.projectsFolders.length; i++) {
        this.execOptions.cwd = './' + this.projectsFolders[i];

        this.execOptions.listeners = {
          stderr: (data) => {
            this.errors += '\n=install {N} logs= ' + data.toString();
          }
        };
        await exec.exec(`npm uninstall -g nativescript`, [], this.execOptions);
        await exec.exec(`npm install -g nativescript@${nativescriptVersions[i]} `, [], this.execOptions);

        for (let i = 0; i < pluginsList.length; i++) {
          const pluginName = pluginsList[i].name;

          if (!pluginName) {
            core.setFailed('Failed to get a plugin name! Check the plugin list, please.');
            return;
          }

          if (!this.pluginsState[pluginName]) {
            this.pluginsState[pluginName] = {}
          }

          const testedVersion = this.pluginsState[pluginName].latestVersion || '';
          const latestVersion = await this.getLatestPluginVersion(pluginName);

          this.pluginsState[pluginName].testedVersion = testedVersion;
          this.pluginsState[pluginName].latestVersion = latestVersion;

          if (!latestVersion) {
            core.setFailed('Failed to get a plugin version for ' + pluginName + ' ! Check plugin name, please.');
            return;
          }

          if (testedVersion !== latestVersion) {
            foundedNewVersions = true
          }
        }

        if (foundedNewVersions) {
          await this.checkAllPluginsState(this.projectsFolders[i]);
        } else {
          console.log(`No updates for plugins!`);
          return;
        }
      }

      await this.setOutput();

    } catch (error) {
      core.setFailed(error.message);
    }
  }

  async getLatestPluginVersion(pluginName: string): Promise<string> {
    let version = '';

    this.execOptions.listeners = {
      stdout: (data) => {
        const output = data.toString().trim();
        const match = output.match(/[0-9.]+$/g) || [];
        version = match[0];
      },
      stderr: (data) => {
        this.errors += '\n=npm info logs= ' + data.toString();
      }
    };
    await exec.exec(`npm info ${pluginName} version`, [], this.execOptions);

    return version;
  }

  async getOldPluginsStateFromFile() {
    const fileWithPreviousTestResult = this.isAndroid ? this.ANDROID_RESULT_JSON_FILE : this.IOS_RESULT_JSON_FILE;
    let pluginsState = {};

    this.execOptions.listeners = {
      stdout: (data) => {
        const output = data.toString();
        try {
          pluginsState = JSON.parse(output || '{}');
        } catch (err) {
          pluginsState = {};
        }
      },
      stderr: (data) => {
        pluginsState = {};
        this.errors += '\n=no json files!= ' + data.toString();
      }
    };
    await exec.exec(`cat ./reports/${fileWithPreviousTestResult}`, [], {
      ...this.execOptions,
      ignoreReturnCode: true
    });

    return pluginsState;
  }


  async checkAllPluginsState(workingDirectory: string) {
    for (let i = 0; i < pluginsList.length; i++) {
      const pluginName = pluginsList[i].name;
      const testedVersion = this.pluginsState[pluginName].testedVersion;
      const latestVersion = this.pluginsState[pluginName].latestVersion;
      let isSuccess = true;

      if (latestVersion && testedVersion !== latestVersion) {
        isSuccess = await this.testPlugin(pluginsList[i]);
      }

      this.pluginsState[pluginName][workingDirectory] = isSuccess ? '✔' : 'failed';
    }
  }


  async testPlugin(plugin: pluginI) {
    let isSuccess = false;
    const version = this.pluginsState[plugin.name].latestVersion;

    try {
      this.execOptions.listeners = {
        stdout: (data) => {
          isSuccess = true;
        },
        stderr: (data) => {
          this.errors += '\n=build logs= ' + data.toString();
          isSuccess = false;
        }
      };
      await exec.exec('npm install ' + plugin.name + '@' + version + ' --save-exact', [], this.execOptions);

      await this.specifyRoutingToPlugin(plugin);

      await exec.exec(`tns build ${ this.isAndroid ? 'android' : 'ios'}`, [], this.execOptions);

      await this.removePlugin(plugin.name);

      return isSuccess;

    } catch (error) {
      console.log(`ERROR: Test for plugin ${plugin.name} finished with the error: ====>`, error.message);
      await this.removePlugin(plugin.name);

      return false;
    }
  }


  async specifyRoutingToPlugin(plugin: pluginI) {
    const fileWithRouting = `./src/app/app-routing.module.ts`;

    this.execOptions.listeners = {
      stderr: (data) => {
        this.errors += '\n=routing change logs= ' + data.toString();
      }
    };
    // -i'.bkp' to make a backup
    await exec.exec(`sed -i'' -e "s/\.default/${plugin.folderName}/" ${fileWithRouting}`, [], this.execOptions);
    await exec.exec(`sed -i'' -e "s/DefaultModule/${plugin.moduleName}/" ${fileWithRouting}`, [], this.execOptions);
    // await exec.exec(`cat ${fileWithRouting}`, [], this.execOptions);
  }


  async removePlugin(pluginName: string) {
    try {
      this.execOptions.listeners = {
        stderr: (data) => {
          this.errors += '\n=plugin removing logs= ' + data.toString();
        }
      };
      await exec.exec('npm uninstall ' + pluginName, [], {
        ...this.execOptions,
        ignoreReturnCode: true
      });

      // restore default routing
      const fileWithRouting = `./src/app/app-routing.module.ts`;
      await exec.exec(`cp -f ${fileWithRouting}.bkp ${fileWithRouting}`, [], this.execOptions);

      console.log('ALL PLUGIN ERRORS ====>', this.errors);
      this.errors = '';
    } catch (error) {
      console.log('ERROR: plugin removing error', error);
    }
  }


  async setOutput() {
    let output = '';
    const jsonOutput = `'` + JSON.stringify(this.pluginsState) + `'`;

    for (const plugin of pluginsList) {
      // put columns with plugin names and plugin versions before the Android test result
      output += this.isAndroid ? plugin.name + this.delimiter + this.pluginsState[plugin.name].latestVersion + this.delimiter : '';

      for (const workingDirectory of this.projectsFolders) {
        output += this.pluginsState[plugin.name][workingDirectory] + this.delimiter;
      }
      output = output.replace(/[,\s]+$/, ';');
    }
    output = output.replace(/[;\s]+$/, '');

    core.setOutput('pluginsTestResult', output);
    core.setOutput('pluginsTestResultJson', jsonOutput);
  }
}

(new CheckForPluginUpdatesAction()).start();
