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
        this.FILE_NAME_FOR_REPORT = '../PLUGINS_COMPATIBILITY.md';
        this.delimiter = ', ';
        this.options = {};
        this.myError = '';
        this.testResult = {};
        this.pluginsVersions = {};
        this.workingDirectories = [];
        this.nativescriptVersions = [];
        this.isAndroid = false;
    }
    CheckForPluginUpdatesAction.prototype.start = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var foundedNewVersion, i, _loop_1, this_1, i_1, state_1, error_1;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        foundedNewVersion = false;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 13, , 14]);
                        this.nativescriptVersions = core.getInput('nativescript-versions').replace(/\s/g, '').split(',');
                        this.workingDirectories = core.getInput('working-directories').replace(/\s/g, '').split(',');
                        this.isAndroid = !!core.getInput('is-android');
                        if (!this.workingDirectories || !this.workingDirectories.length) {
                            core.setFailed('No projects to test!');
                            return [2 /*return*/];
                        }
                        i = 0;
                        _c.label = 2;
                    case 2:
                        if (!(i < this.workingDirectories.length)) return [3 /*break*/, 12];
                        if (!this.workingDirectories[i]) {
                            return [2 /*return*/];
                        }
                        this.options.cwd = './' + this.workingDirectories[i];
                        this.options.listeners = {
                            stderr: function (data) {
                                _this.myError += '=install {N}=' + data.toString();
                            }
                        };
                        return [4 /*yield*/, exec.exec("npm uninstall -g nativescript", [], this.options)];
                    case 3:
                        _c.sent();
                        return [4 /*yield*/, exec.exec("npm install -g nativescript@" + this.nativescriptVersions[i] + " ", [], this.options)];
                    case 4:
                        _c.sent();
                        _loop_1 = function (i_1) {
                            var pluginName, testedVersion, latestVersion;
                            return __generator(this, function (_d) {
                                switch (_d.label) {
                                    case 0:
                                        pluginName = plugins_list_1.pluginsList[i_1].name;
                                        console.log('pluginName ====> ', pluginName);
                                        this_1.pluginsVersions[i_1] = {};
                                        this_1.options.listeners = {
                                            stdout: function (data) {
                                                var myOutput = data.toString().trim();
                                                var match = myOutput.match(/[0-9.]+/g) || [];
                                                _this.pluginsVersions[i_1].tested = match[0];
                                            },
                                            stderr: function (data) {
                                                _this.myError += '=grep tested=' + data.toString();
                                            }
                                        };
                                        // find the last tested version of the plugin in PLUGINS_COMPATIBILITY.md, where the test results are saved
                                        return [4 /*yield*/, exec.exec("grep " + pluginName + " " + this_1.FILE_NAME_FOR_REPORT, [], __assign(__assign({}, this_1.options), { ignoreReturnCode: true }))];
                                    case 1:
                                        // find the last tested version of the plugin in PLUGINS_COMPATIBILITY.md, where the test results are saved
                                        _d.sent();
                                        this_1.options.listeners = {
                                            stdout: function (data) {
                                                var myOutput = data.toString().trim();
                                                var match = myOutput.match(/[0-9.]+$/g) || [];
                                                _this.pluginsVersions[i_1].latest = match[0];
                                            },
                                            stderr: function (data) {
                                                _this.myError += '=npm info=' + data.toString();
                                            }
                                        };
                                        return [4 /*yield*/, exec.exec("npm info " + pluginName + " version", [], this_1.options)];
                                    case 2:
                                        _d.sent();
                                        testedVersion = (_a = this_1.pluginsVersions[i_1]) === null || _a === void 0 ? void 0 : _a.tested;
                                        console.log('testedVersion ====>', testedVersion);
                                        latestVersion = (_b = this_1.pluginsVersions[i_1]) === null || _b === void 0 ? void 0 : _b.latest;
                                        console.log('latestVersion ====>', latestVersion);
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
                        _c.label = 5;
                    case 5:
                        if (!(i_1 < plugins_list_1.pluginsList.length)) return [3 /*break*/, 8];
                        return [5 /*yield**/, _loop_1(i_1)];
                    case 6:
                        state_1 = _c.sent();
                        if (typeof state_1 === "object")
                            return [2 /*return*/, state_1.value];
                        _c.label = 7;
                    case 7:
                        i_1++;
                        return [3 /*break*/, 5];
                    case 8:
                        if (!foundedNewVersion) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.updatePlugins(this.workingDirectories[i])];
                    case 9:
                        _c.sent();
                        return [3 /*break*/, 11];
                    case 10:
                        console.log("No updates for plugins!");
                        return [2 /*return*/];
                    case 11:
                        i++;
                        return [3 /*break*/, 2];
                    case 12:
                        this.setOutput();
                        return [3 /*break*/, 14];
                    case 13:
                        error_1 = _c.sent();
                        core.setFailed(error_1.message);
                        return [3 /*break*/, 14];
                    case 14: return [2 /*return*/];
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
                        testedVersion = this.pluginsVersions[i].tested;
                        latestVersion = this.pluginsVersions[i].latest;
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
                        // save testing info in this.testResult
                        if (!this.testResult[pluginName]) {
                            this.testResult[pluginName] = {};
                        }
                        this.testResult[pluginName].version = latestVersion;
                        this.testResult[pluginName][workingDirectory] = isSuccess ? '+' : '-';
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
                        this.options.listeners = {
                            stdout: function (data) {
                                isSuccess = true;
                            },
                            stderr: function (data) {
                                _this.myError += '=npm install=' + data.toString();
                                isSuccess = false;
                            }
                        };
                        return [4 /*yield*/, exec.exec('npm install ' + plugin.name + '@' + version + ' --save-exact', [], this.options)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.activatePluginModule(plugin)];
                    case 3:
                        _a.sent();
                        this.options.listeners = {
                            stdout: function (data) {
                                isSuccess = true;
                            },
                            stderr: function (data) {
                                _this.myError += '=tns build=' + data.toString();
                                isSuccess = false;
                            }
                        };
                        return [4 /*yield*/, exec.exec("tns build " + (this.isAndroid ? 'android' : 'ios'), [], __assign(__assign({}, this.options), { ignoreReturnCode: true }))];
                    case 4:
                        _a.sent();
                        filePath = "./src/app/app-routing.module.ts";
                        return [4 /*yield*/, exec.exec("cat \"" + filePath + ".bkp\" > " + filePath, [], this.options)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, isSuccess];
                    case 6:
                        error_2 = _a.sent();
                        // core.setFailed(error.message);
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
                        this.options.listeners = {
                            stderr: function (data) {
                                _this.myError += '=change routing=' + data.toString();
                            }
                        };
                        // -i'.bkp' to make a backup
                        return [4 /*yield*/, exec.exec("sed -i'' -e \"s/.default/" + plugin.folderName + "/\" " + filePath, [], this.options)];
                    case 1:
                        // -i'.bkp' to make a backup
                        _a.sent();
                        return [4 /*yield*/, exec.exec("sed -i'' -e \"s/DefaultModule/" + plugin.moduleName + "/\" " + filePath, [], this.options)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, exec.exec("cat " + filePath, [], this.options)];
                    case 3:
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
                        this.options.listeners = {
                            stderr: function (data) {
                                _this.myError += '=npm uninstall=' + data.toString();
                            }
                        };
                        return [4 /*yield*/, exec.exec('npm uninstall ' + pluginName, [], this.options)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CheckForPluginUpdatesAction.prototype.setOutput = function () {
        var output = '';
        for (var _i = 0, pluginsList_1 = plugins_list_1.pluginsList; _i < pluginsList_1.length; _i++) {
            var plugin = pluginsList_1[_i];
            output += this.isAndroid ? plugin.name + this.delimiter + this.testResult[plugin.name].version + this.delimiter : '';
            for (var _a = 0, _b = this.workingDirectories; _a < _b.length; _a++) {
                var workingDirectory = _b[_a];
                output += this.testResult[plugin.name][workingDirectory] + this.delimiter;
            }
            output = output.replace(/[,\s]+$/, ';');
            console.log('output =>', output);
        }
        core.setOutput('pluginsTestResult', output);
    };
    return CheckForPluginUpdatesAction;
}());
(new CheckForPluginUpdatesAction()).start();
