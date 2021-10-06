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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
exports.__esModule = true;
var core = require("@actions/core");
var exec = require("@actions/exec");
var plugins_list_1 = require("../../workflows/plugins-list");
var CheckForPluginUpdatesAction = /** @class */ (function () {
    function CheckForPluginUpdatesAction() {
        this.FILE_NAME_FOR_REPORT = 'PLUGINS_COMPATIBILITY.md';
        this.delimiter = ', ';
        this.options = {};
        this.myError = '';
        this.testResult = {};
        this.pluginsVersions = {};
        this.workingDirectories = [];
        this.needAddPluginsNames = false;
    }
    CheckForPluginUpdatesAction.prototype.start = function () {
        var e_1, _a;
        var _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var foundedNewVersion, _d, _e, workingDirectory, _loop_1, this_1, i, state_1, e_1_1, error_1;
            var _this = this;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        foundedNewVersion = false;
                        _f.label = 1;
                    case 1:
                        _f.trys.push([1, 20, , 21]);
                        this.needAddPluginsNames = !!core.getInput('add-plugins-names');
                        this.workingDirectories = core.getInput('working-directories').replace(/\s/g, '').split(',');
                        console.log('workingDirectories ====>', this.workingDirectories);
                        if (!this.workingDirectories || !this.workingDirectories.length) {
                            core.setFailed('No projects to test!');
                            return [2 /*return*/];
                        }
                        _f.label = 2;
                    case 2:
                        _f.trys.push([2, 13, 14, 19]);
                        _d = __asyncValues(this.workingDirectories);
                        _f.label = 3;
                    case 3: return [4 /*yield*/, _d.next()];
                    case 4:
                        if (!(_e = _f.sent(), !_e.done)) return [3 /*break*/, 12];
                        workingDirectory = _e.value;
                        if (!workingDirectory) {
                            return [2 /*return*/];
                        }
                        console.log("Current working directory is " + workingDirectory + "!");
                        this.options.cwd = './' + workingDirectory;
                        _loop_1 = function (i) {
                            var pluginName, testedVersion, latestVersion;
                            return __generator(this, function (_g) {
                                switch (_g.label) {
                                    case 0:
                                        pluginName = plugins_list_1.pluginsList[i];
                                        console.log('pluginName ! ====>', pluginName);
                                        this_1.pluginsVersions[i] = {};
                                        this_1.options.listeners = {
                                            stdout: function (data) {
                                                var myOutput = data.toString().trim();
                                                // const match = myOutput.match(/[0-9.]+$/g) || [];
                                                var match = myOutput.match(/[0-9.]+/g) || [];
                                                _this.pluginsVersions[i].tested = match[0];
                                            },
                                            stderr: function (data) {
                                                _this.myError += '=grep tested=' + data.toString();
                                            }
                                        };
                                        // await exec.exec('npm list ' + pluginName + ' --depth=0', [], options);
                                        // todo: move ignoreReturnCode to options
                                        return [4 /*yield*/, exec.exec("grep " + pluginName + " " + this_1.FILE_NAME_FOR_REPORT, [], __assign(__assign({}, this_1.options), { ignoreReturnCode: true }))];
                                    case 1:
                                        // await exec.exec('npm list ' + pluginName + ' --depth=0', [], options);
                                        // todo: move ignoreReturnCode to options
                                        _g.sent();
                                        this_1.options.listeners = {
                                            stdout: function (data) {
                                                var myOutput = data.toString().trim();
                                                var match = myOutput.match(/[0-9.]+$/g) || [];
                                                _this.pluginsVersions[i].latest = match[0];
                                            },
                                            stderr: function (data) {
                                                _this.myError += '=npm info=' + data.toString();
                                            }
                                        };
                                        return [4 /*yield*/, exec.exec("npm info " + pluginName + " version", [], this_1.options)];
                                    case 2:
                                        _g.sent();
                                        testedVersion = (_b = this_1.pluginsVersions[i]) === null || _b === void 0 ? void 0 : _b.tested;
                                        console.log('testedVersion ====>', testedVersion);
                                        latestVersion = (_c = this_1.pluginsVersions[i]) === null || _c === void 0 ? void 0 : _c.latest;
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
                        i = 0;
                        _f.label = 5;
                    case 5:
                        if (!(i < plugins_list_1.pluginsList.length)) return [3 /*break*/, 8];
                        return [5 /*yield**/, _loop_1(i)];
                    case 6:
                        state_1 = _f.sent();
                        if (typeof state_1 === "object")
                            return [2 /*return*/, state_1.value];
                        _f.label = 7;
                    case 7:
                        i++;
                        return [3 /*break*/, 5];
                    case 8:
                        if (!foundedNewVersion) return [3 /*break*/, 10];
                        // this.pluginsTestResult += workingDirectories + ';';
                        return [4 /*yield*/, this.updatePlugins(workingDirectory)];
                    case 9:
                        // this.pluginsTestResult += workingDirectories + ';';
                        _f.sent();
                        return [3 /*break*/, 11];
                    case 10:
                        console.log("No updates for plugins!");
                        _f.label = 11;
                    case 11: return [3 /*break*/, 3];
                    case 12: return [3 /*break*/, 19];
                    case 13:
                        e_1_1 = _f.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 19];
                    case 14:
                        _f.trys.push([14, , 17, 18]);
                        if (!(_e && !_e.done && (_a = _d["return"]))) return [3 /*break*/, 16];
                        return [4 /*yield*/, _a.call(_d)];
                    case 15:
                        _f.sent();
                        _f.label = 16;
                    case 16: return [3 /*break*/, 18];
                    case 17:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 18: return [7 /*endfinally*/];
                    case 19:
                        this.setOutput();
                        return [3 /*break*/, 21];
                    case 20:
                        error_1 = _f.sent();
                        core.setFailed(error_1.message);
                        return [3 /*break*/, 21];
                    case 21: return [2 /*return*/];
                }
            });
        });
    };
    CheckForPluginUpdatesAction.prototype.updatePlugins = function (workingDirectory) {
        return __awaiter(this, void 0, void 0, function () {
            var i, testedVersion, latestVersion, isSuccess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < plugins_list_1.pluginsList.length)) return [3 /*break*/, 5];
                        testedVersion = this.pluginsVersions[i].tested;
                        latestVersion = this.pluginsVersions[i].latest;
                        isSuccess = true;
                        if (!(latestVersion && testedVersion !== latestVersion)) return [3 /*break*/, 3];
                        console.log('<===    PLUGIN TEST IS HERE     ====>');
                        return [4 /*yield*/, this.testPlugin(plugins_list_1.pluginsList[i], latestVersion)];
                    case 2:
                        isSuccess = _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!this.testResult[plugins_list_1.pluginsList[i]]) {
                            this.testResult[plugins_list_1.pluginsList[i]] = {};
                        }
                        this.testResult[plugins_list_1.pluginsList[i]].version = latestVersion;
                        this.testResult[plugins_list_1.pluginsList[i]][workingDirectory] = isSuccess ? '+' : '-';
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    CheckForPluginUpdatesAction.prototype.testPlugin = function (pluginName, version) {
        return __awaiter(this, void 0, void 0, function () {
            var isSuccess, error_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('test the Plugin pluginName ====> ', pluginName);
                        isSuccess = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.options.listeners = {
                            stdout: function (data) {
                                // const myOutput = data.toString();
                                isSuccess = true;
                            },
                            stderr: function (data) {
                                _this.myError += '=npm install=' + data.toString();
                                isSuccess = false;
                            }
                        };
                        return [4 /*yield*/, exec.exec('npm install ' + pluginName + '@' + version + ' --save-exact', [], this.options)];
                    case 2:
                        _a.sent();
                        this.options.listeners = {
                            stdout: function (data) {
                                // const myOutput = data.toString();
                                isSuccess = true;
                            },
                            stderr: function (data) {
                                _this.myError += '=tns build android=' + data.toString();
                                console.log('this.myError ====>', _this.myError);
                                isSuccess = false;
                            }
                        };
                        // core.setFailed('BUILD FILED  ---- < ----');
                        // await exec.exec('tns FAILED-build android', [], this.options);
                        return [2 /*return*/, isSuccess];
                    case 3:
                        error_2 = _a.sent();
                        core.setFailed(error_2.message);
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
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
                        console.log('uninstallPlugin ====>');
                        this.options.listeners = {
                            stdout: function (data) {
                                // const myOutput = data.toString();
                            },
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
            var pluginName = pluginsList_1[_i];
            output += this.needAddPluginsNames ? pluginName + this.delimiter + this.testResult[pluginName].version : '';
            for (var _a = 0, _b = this.workingDirectories; _a < _b.length; _a++) {
                var workingDirectory = _b[_a];
                output += this.delimiter + this.testResult[pluginName][workingDirectory];
            }
            output += ';';
        }
        core.setOutput('pluginsTestResult', output);
    };
    return CheckForPluginUpdatesAction;
}());
(new CheckForPluginUpdatesAction()).start();
