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
        this.delimiter = ', ';
        this.errors = '';
        this.execOptions = {};
        this.pluginsState = {}; // key: plugin name
        this.projectsFolders = [];
        this.isAndroid = false;
    }
    CheckForPluginUpdatesAction.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var foundedNewVersions, nativescriptVersions, _a, i, i_1, pluginName, testedVersion, latestVersion, error_1;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        foundedNewVersions = false;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 15, , 16]);
                        nativescriptVersions = core.getInput('nativescript-versions')
                            .replace(/\s/g, '')
                            .split(',');
                        this.projectsFolders = core.getInput('projects-folders')
                            .replace(/\s/g, '')
                            .split(',');
                        this.isAndroid = !!core.getInput('is-android');
                        _a = this;
                        return [4 /*yield*/, this.getOldPluginsStateFromFile()];
                    case 2:
                        _a.pluginsState = _b.sent();
                        if (!this.projectsFolders || !this.projectsFolders.length) {
                            core.setFailed('No projects to test!');
                            return [2 /*return*/];
                        }
                        i = 0;
                        _b.label = 3;
                    case 3:
                        if (!(i < this.projectsFolders.length)) return [3 /*break*/, 13];
                        this.execOptions.cwd = './' + this.projectsFolders[i];
                        this.execOptions.listeners = {
                            stderr: function (data) {
                                _this.errors += '\n=install {N} logs= ' + data.toString();
                            }
                        };
                        return [4 /*yield*/, exec.exec("npm uninstall -g nativescript", [], this.execOptions)];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, exec.exec("npm install -g nativescript@" + nativescriptVersions[i] + " ", [], this.execOptions)];
                    case 5:
                        _b.sent();
                        i_1 = 0;
                        _b.label = 6;
                    case 6:
                        if (!(i_1 < plugins_list_1.pluginsList.length)) return [3 /*break*/, 9];
                        pluginName = plugins_list_1.pluginsList[i_1].name;
                        if (!pluginName) {
                            core.setFailed('Failed to get a plugin name! Check the plugin list, please.');
                            return [2 /*return*/];
                        }
                        if (!this.pluginsState[pluginName]) {
                            this.pluginsState[pluginName] = {};
                        }
                        testedVersion = this.pluginsState[pluginName].latestVersion || '';
                        return [4 /*yield*/, this.getLatestPluginVersion(pluginName)];
                    case 7:
                        latestVersion = _b.sent();
                        this.pluginsState[pluginName].testedVersion = testedVersion;
                        this.pluginsState[pluginName].latestVersion = latestVersion;
                        if (!latestVersion) {
                            core.setFailed('Failed to get a plugin version for ' + pluginName + ' ! Check plugin name, please.');
                            return [2 /*return*/];
                        }
                        if (testedVersion !== latestVersion) {
                            foundedNewVersions = true;
                        }
                        _b.label = 8;
                    case 8:
                        i_1++;
                        return [3 /*break*/, 6];
                    case 9:
                        if (!foundedNewVersions) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.checkAllPluginsState(this.projectsFolders[i])];
                    case 10:
                        _b.sent();
                        return [3 /*break*/, 12];
                    case 11:
                        console.log("No updates for plugins!");
                        return [2 /*return*/];
                    case 12:
                        i++;
                        return [3 /*break*/, 3];
                    case 13: return [4 /*yield*/, this.setOutput()];
                    case 14:
                        _b.sent();
                        return [3 /*break*/, 16];
                    case 15:
                        error_1 = _b.sent();
                        core.setFailed(error_1.message);
                        return [3 /*break*/, 16];
                    case 16: return [2 /*return*/];
                }
            });
        });
    };
    CheckForPluginUpdatesAction.prototype.getLatestPluginVersion = function (pluginName) {
        return __awaiter(this, void 0, void 0, function () {
            var version;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        version = '';
                        this.execOptions.listeners = {
                            stdout: function (data) {
                                var output = data.toString().trim();
                                var match = output.match(/[0-9.]+$/g) || [];
                                version = match[0];
                            },
                            stderr: function (data) {
                                _this.errors += '\n=npm info logs= ' + data.toString();
                            }
                        };
                        return [4 /*yield*/, exec.exec("npm info " + pluginName + " version", [], this.execOptions)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, version];
                }
            });
        });
    };
    CheckForPluginUpdatesAction.prototype.getOldPluginsStateFromFile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fileWithPreviousTestResult, pluginsState;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fileWithPreviousTestResult = this.isAndroid ? this.ANDROID_RESULT_JSON_FILE : this.IOS_RESULT_JSON_FILE;
                        pluginsState = {};
                        this.execOptions.listeners = {
                            stdout: function (data) {
                                var output = data.toString();
                                try {
                                    pluginsState = JSON.parse(output || '{}');
                                }
                                catch (err) {
                                    pluginsState = {};
                                }
                            },
                            stderr: function (data) {
                                pluginsState = {};
                                _this.errors += '\n=no json files!= ' + data.toString();
                            }
                        };
                        return [4 /*yield*/, exec.exec("cat ./reports/" + fileWithPreviousTestResult, [], __assign(__assign({}, this.execOptions), { ignoreReturnCode: true }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, pluginsState];
                }
            });
        });
    };
    CheckForPluginUpdatesAction.prototype.checkAllPluginsState = function (workingDirectory) {
        return __awaiter(this, void 0, void 0, function () {
            var i, pluginName, testedVersion, latestVersion, isSuccess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < plugins_list_1.pluginsList.length)) return [3 /*break*/, 5];
                        pluginName = plugins_list_1.pluginsList[i].name;
                        testedVersion = this.pluginsState[pluginName].testedVersion;
                        latestVersion = this.pluginsState[pluginName].latestVersion;
                        isSuccess = true;
                        if (!(latestVersion && testedVersion !== latestVersion)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.testPlugin(plugins_list_1.pluginsList[i])];
                    case 2:
                        isSuccess = _a.sent();
                        _a.label = 3;
                    case 3:
                        this.pluginsState[pluginName][workingDirectory] = isSuccess ? '✔' : 'failed';
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    CheckForPluginUpdatesAction.prototype.testPlugin = function (plugin) {
        return __awaiter(this, void 0, void 0, function () {
            var isSuccess, version, error_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isSuccess = false;
                        version = this.pluginsState[plugin.name].latestVersion;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 8]);
                        this.execOptions.listeners = {
                            stdout: function (data) {
                                isSuccess = true;
                            },
                            stderr: function (data) {
                                _this.errors += '\n=build logs= ' + data.toString();
                                isSuccess = false;
                            }
                        };
                        return [4 /*yield*/, exec.exec('npm install ' + plugin.name + '@' + version + ' --save-exact', [], this.execOptions)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.specifyRoutingToPlugin(plugin)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, exec.exec("tns build " + (this.isAndroid ? 'android' : 'ios'), [], this.execOptions)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.removePlugin(plugin.name)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, isSuccess];
                    case 6:
                        error_2 = _a.sent();
                        console.log("ERROR: Test for plugin " + plugin.name + " finished with the error: ====>", error_2.message);
                        return [4 /*yield*/, this.removePlugin(plugin.name)];
                    case 7:
                        _a.sent();
                        return [2 /*return*/, false];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    CheckForPluginUpdatesAction.prototype.specifyRoutingToPlugin = function (plugin) {
        return __awaiter(this, void 0, void 0, function () {
            var fileWithRouting;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fileWithRouting = "./src/app/app-routing.module.ts";
                        this.execOptions.listeners = {
                            stderr: function (data) {
                                _this.errors += '\n=routing change logs= ' + data.toString();
                            }
                        };
                        // -i'.bkp' to make a backup
                        return [4 /*yield*/, exec.exec("sed -i'' -e \"s/.default/" + plugin.folderName + "/\" " + fileWithRouting, [], this.execOptions)];
                    case 1:
                        // -i'.bkp' to make a backup
                        _a.sent();
                        return [4 /*yield*/, exec.exec("sed -i'' -e \"s/DefaultModule/" + plugin.moduleName + "/\" " + fileWithRouting, [], this.execOptions)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CheckForPluginUpdatesAction.prototype.removePlugin = function (pluginName) {
        return __awaiter(this, void 0, void 0, function () {
            var fileWithRouting, error_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        this.execOptions.listeners = {
                            stderr: function (data) {
                                _this.errors += '\n=plugin removing logs= ' + data.toString();
                            }
                        };
                        return [4 /*yield*/, exec.exec('npm uninstall ' + pluginName, [], __assign(__assign({}, this.execOptions), { ignoreReturnCode: true }))];
                    case 1:
                        _a.sent();
                        fileWithRouting = "./src/app/app-routing.module.ts";
                        return [4 /*yield*/, exec.exec("cp -f " + fileWithRouting + ".bkp " + fileWithRouting, [], this.execOptions)];
                    case 2:
                        _a.sent();
                        console.log('ALL PLUGIN ERRORS ====>', this.errors);
                        this.errors = '';
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        console.log('ERROR: plugin removing error', error_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CheckForPluginUpdatesAction.prototype.setOutput = function () {
        return __awaiter(this, void 0, void 0, function () {
            var output, jsonOutput, _i, pluginsList_1, plugin, _a, _b, workingDirectory;
            return __generator(this, function (_c) {
                output = '';
                jsonOutput = "'" + JSON.stringify(this.pluginsState) + "'";
                for (_i = 0, pluginsList_1 = plugins_list_1.pluginsList; _i < pluginsList_1.length; _i++) {
                    plugin = pluginsList_1[_i];
                    // put columns with plugin names and plugin versions before the Android test result
                    output += this.isAndroid ? plugin.name + this.delimiter + this.pluginsState[plugin.name].latestVersion + this.delimiter : '';
                    for (_a = 0, _b = this.projectsFolders; _a < _b.length; _a++) {
                        workingDirectory = _b[_a];
                        output += this.pluginsState[plugin.name][workingDirectory] + this.delimiter;
                    }
                    output = output.replace(/[,\s]+$/, ';');
                }
                output = output.replace(/[;\s]+$/, '');
                core.setOutput('pluginsTestResult', output);
                core.setOutput('pluginsTestResultJson', jsonOutput);
                return [2 /*return*/];
            });
        });
    };
    return CheckForPluginUpdatesAction;
}());
(new CheckForPluginUpdatesAction()).start();
