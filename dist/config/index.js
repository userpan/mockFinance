"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateConfig = exports.config = void 0;
var environment_1 = require("./environment");
Object.defineProperty(exports, "config", { enumerable: true, get: function () { return __importDefault(environment_1).default; } });
Object.defineProperty(exports, "validateConfig", { enumerable: true, get: function () { return environment_1.validateConfig; } });
//# sourceMappingURL=index.js.map