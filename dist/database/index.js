"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnection = exports.isDatabaseConnected = exports.disconnectDatabase = exports.connectDatabase = void 0;
var connection_1 = require("./connection");
Object.defineProperty(exports, "connectDatabase", { enumerable: true, get: function () { return connection_1.connectDatabase; } });
Object.defineProperty(exports, "disconnectDatabase", { enumerable: true, get: function () { return connection_1.disconnectDatabase; } });
Object.defineProperty(exports, "isDatabaseConnected", { enumerable: true, get: function () { return connection_1.isDatabaseConnected; } });
Object.defineProperty(exports, "getConnection", { enumerable: true, get: function () { return connection_1.getConnection; } });
__exportStar(require("./schemas"), exports);
//# sourceMappingURL=index.js.map