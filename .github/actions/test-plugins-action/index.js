"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var core = require("@actions/core");
var exec = require("@actions/exec");
var plugins_list_1 = require("../../plugins-list");
var CheckForPluginUpdatesAction = /** @class */ (function () {
    function CheckForPluginUpdatesAction() {
        this.ANDROID_RESULT_JSON_FILE = "android-result.json";
        this.IOS_RESULT_JSON_FILE = "ios-result.json";
        // FILE_NAME_FOR_REPORT = '../PLUGINS_COMPATIBILITY.md';
        this.delimiter = ', ';
        this.errors = '';
        this.execOptions = {};
        this.pluginsState = {}; // key: plugin name
        this.workingDirectories = [];
        this.nativescriptVersions = [];
        this.isAndroid = false;
    }
    CheckForPluginUpdatesAction.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var foundedNewVersion, fileWithPreviousTestResult, i, _loop_1, this_1, i_1, state_1, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        foundedNewVersion = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 14, , 15]);
                        this.nativescriptVersions = core.getInput('nativescript-versions').replace(/\s/g, '').split(',');
                        this.workingDirectories = core.getInput('working-directories').replace(/\s/g, '').split(',');
                        this.isAndroid = !!core.getInput('is-android');
                        fileWithPreviousTestResult = this.isAndroid ? this.ANDROID_RESULT_JSON_FILE : this.IOS_RESULT_JSON_FILE;
                        this.execOptions.listeners = {
                            stdout: function (data) {
                                var output = data.toString();
                                console.log('output ====>', output);
                                try {
                                    _this.pluginsState = JSON.parse(output || '{}');
                                }
                                catch (err) {
                                    _this.pluginsState = {};
                                }
                                console.log('this.pluginsState ====>', _this.pluginsState);
                            },
                            stderr: function (data) {
                                _this.pluginsState = {};
                                _this.errors += '=no json files!=' + data.toString();
                            }
                        };
                        return [4 /*yield*/, exec.exec("cat ../reports/" + fileWithPreviousTestResult, [], __assign(__assign({}, this.execOptions), { ignoreReturnCode: true }))];
                    case 2:
                        _a.sent();
                        if (!this.workingDirectories || !this.workingDirectories.length) {
                            core.setFailed('No projects to test!');
                            return [2 /*return*/];
                        }
                        i = 0;
                        _a.label = 3;
                    case 3:
                        if (!(i < this.workingDirectories.length)) return [3 /*break*/, 13];
                        if (!this.workingDirectories[i]) {
                            return [2 /*return*/];
                        }
                        this.execOptions.cwd = './' + this.workingDirectories[i];
                        this.execOptions.listeners = {
                            stderr: function (data) {
                                _this.errors += '=install {N} error=' + data.toString();
                            }
                        };
                        return [4 /*yield*/, exec.exec("npm uninstall -g nativescript", [], this.execOptions)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, exec.exec("npm install -g nativescript@" + this.nativescriptVersions[i] + " ", [], this.execOptions)];
                    case 5:
                        _a.sent();
                        _loop_1 = function (i_1) {
                            var pluginName, testedVersion, latestVersion;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        pluginName = plugins_list_1.pluginsList[i_1].name;
                                        this_1.pluginsState[pluginName] = {};
                                        // this.execOptions.listeners = {
                                        //   stdout: (data) => {
                                        //     const output = data.toString().trim();
                                        //     const match = output.match(/[0-9.]+/g) || [];
                                        //     this.pluginsState[pluginName].testedVersion = match[0];
                                        //   },
                                        //   stderr: (data) => {
                                        //     this.errors += '=grep tested error=' + data.toString();
                                        //   }
                                        // };
                                        // await exec.exec(`grep ${pluginName} ${this.FILE_NAME_FOR_REPORT}`, [], {
                                        //   ...this.execOptions,
                                        //   ignoreReturnCode: true
                                        // });
                                        // find the last tested version of the plugin in PLUGINS_COMPATIBILITY.md, where the test results are saved
                                        // await exec.exec(`grep ${pluginName} ${this.FILE_NAME_FOR_REPORT}`, [], {
                                        //   ...this.execOptions,
                                        //   ignoreReturnCode: true
                                        // });
                                        this_1.execOptions.listeners = {
                                            stdout: function (data) {
                                                var output = data.toString().trim();
                                                var match = output.match(/[0-9.]+$/g) || [];
                                                _this.pluginsState[pluginName].latestVersion = match[0];
                                            },
                                            stderr: function (data) {
                                                _this.errors += '=npm info error=' + data.toString();
                                            }
                                        };
                                        return [4 /*yield*/, exec.exec("npm info " + pluginName + " version", [], this_1.execOptions)];
                                    case 1:
                                        _b.sent();
                                        testedVersion = this_1.pluginsState[pluginName].testedVersion;
                                        latestVersion = this_1.pluginsState[pluginName].latestVersion;
                                        if (!latestVersion) {
                                            core.setFailed('Failed to get a plugin version for ' + pluginName + ' ! Check plugin name, please.');
                                            return [2 /*return*/, { value: void 0 }];
                                        }
                                        if (testedVersion !== latestVersion) {
                                            foundedNewVersion = true;
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        i_1 = 0;
                        _a.label = 6;
                    case 6:
                        if (!(i_1 < plugins_list_1.pluginsList.length)) return [3 /*break*/, 9];
                        return [5 /*yield**/, _loop_1(i_1)];
                    case 7:
                        state_1 = _a.sent();
                        if (typeof state_1 === "object")
                            return [2 /*return*/, state_1.value];
                        _a.label = 8;
                    case 8:
                        i_1++;
                        return [3 /*break*/, 6];
                    case 9:
                        if (!foundedNewVersion) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.updatePlugins(this.workingDirectories[i])];
                    case 10:
                        _a.sent();
                        return [3 /*break*/, 12];
                    case 11:
                        console.log("No updates for plugins!");
                        return [2 /*return*/];
                    case 12:
                        i++;
                        return [3 /*break*/, 3];
                    case 13:
                        this.setOutput();
                        return [3 /*break*/, 15];
                    case 14:
                        error_1 = _a.sent();
                        core.setFailed(error_1.message);
                        return [3 /*break*/, 15];
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    CheckForPluginUpdatesAction.prototype.updatePlugins = function (workingDirectory) {
        return __awaiter(this, void 0, void 0, function () {
            var i, pluginName, testedVersion, latestVersion, isSuccess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < plugins_list_1.pluginsList.length)) return [3 /*break*/, 6];
                        pluginName = plugins_list_1.pluginsList[i].name;
                        testedVersion = this.pluginsState[pluginName].testedVersion;
                        latestVersion = this.pluginsState[pluginName].latestVersion;
                        isSuccess = true;
                        if (!(latestVersion && testedVersion !== latestVersion)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.testPlugin(plugins_list_1.pluginsList[i], latestVersion)];
                    case 2:
                        isSuccess = _a.sent();
                        return [4 /*yield*/, this.uninstallPlugin(pluginName)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        this.pluginsState[pluginName][workingDirectory] = isSuccess ? '+' : '-';
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    CheckForPluginUpdatesAction.prototype.testPlugin = function (plugin, version) {
        return __awaiter(this, void 0, void 0, function () {
            var isSuccess, filePath, error_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isSuccess = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        this.execOptions.listeners = {
                            stdout: function (data) {
                                isSuccess = true;
                            },
                            stderr: function (data) {
                                _this.errors += '=npm install error=' + data.toString();
                                isSuccess = false;
                            }
                        };
                        return [4 /*yield*/, exec.exec('npm install ' + plugin.name + '@' + version + ' --save-exact', [], this.execOptions)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.activatePluginModule(plugin)];
                    case 3:
                        _a.sent();
                        this.execOptions.listeners = {
                            stdout: function (data) {
                                isSuccess = true;
                            },
                            stderr: function (data) {
                                _this.errors += '=tns build error=' + data.toString();
                                isSuccess = false;
                            }
                        };
                        return [4 /*yield*/, exec.exec("tns build " + (this.isAndroid ? 'android' : 'ios'), [], __assign(__assign({}, this.execOptions), { ignoreReturnCode: true }))];
                    case 4:
                        _a.sent();
                        filePath = "./src/app/app-routing.module.ts";
                        return [4 /*yield*/, exec.exec("cp -f " + filePath + ".bkp " + filePath, [], this.execOptions)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, isSuccess];
                    case 6:
                        error_2 = _a.sent();
                        console.log("Test for plugin " + plugin.name + " finished with the error: ====>", error_2.message);
                        return [2 /*return*/, false];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    CheckForPluginUpdatesAction.prototype.activatePluginModule = function (plugin) {
        return __awaiter(this, void 0, void 0, function () {
            var filePath;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filePath = "./src/app/app-routing.module.ts";
                        this.execOptions.listeners = {
                            stderr: function (data) {
                                _this.errors += '=change routing error=' + data.toString();
                            }
                        };
                        // -i'.bkp' to make a backup
                        return [4 /*yield*/, exec.exec("sed -i'' -e \"s/.default/" + plugin.folderName + "/\" " + filePath, [], this.execOptions)];
                    case 1:
                        // -i'.bkp' to make a backup
                        _a.sent();
                        return [4 /*yield*/, exec.exec("sed -i'' -e \"s/DefaultModule/" + plugin.moduleName + "/\" " + filePath, [], this.execOptions)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CheckForPluginUpdatesAction.prototype.uninstallPlugin = function (pluginName) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.execOptions.listeners = {
                            stderr: function (data) {
                                _this.errors += '=npm uninstall error=' + data.toString();
                            }
                        };
                        return [4 /*yield*/, exec.exec('npm uninstall ' + pluginName, [], this.execOptions)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CheckForPluginUpdatesAction.prototype.setOutput = function () {
        return __awaiter(this, void 0, void 0, function () {
            var jsonOutputFile, jsonOutput, output, _i, pluginsList_1, plugin, _a, _b, workingDirectory;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        jsonOutputFile = (this.isAndroid ? 'android-' : 'ios-') + 'report.json';
                        jsonOutput = JSON.stringify(this.pluginsState);
                        console.log('jsonOutput ====>', jsonOutput);
                        return [4 /*yield*/, exec.exec("echo \"" + jsonOutput + "\" > result.txt", [], this.execOptions)];
                    case 1:
                        _c.sent();
                        output = '';
                        for (_i = 0, pluginsList_1 = plugins_list_1.pluginsList; _i < pluginsList_1.length; _i++) {
                            plugin = pluginsList_1[_i];
                            output += this.isAndroid ? plugin.name + this.delimiter + this.pluginsState[plugin.name].latestVersion + this.delimiter : '';
                            for (_a = 0, _b = this.workingDirectories; _a < _b.length; _a++) {
                                workingDirectory = _b[_a];
                                output += this.pluginsState[plugin.name][workingDirectory] + this.delimiter;
                            }
                            output = output.replace(/[,\s]+$/, ';');
                            console.log('output =>', output);
                            console.log('ALL ERRORS =======================>', this.errors);
                        }
                        core.setOutput('pluginsTestResult', output);
                        core.setOutput('pluginsTestResultJson', jsonOutput);
                        return [2 /*return*/];
                }
            });
        });
    };
    return CheckForPluginUpdatesAction;
}());
(new CheckForPluginUpdatesAction()).start();
