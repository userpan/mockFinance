"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("./middleware");
const routes_1 = require("./routes");
const error_1 = require("./error");
const app = (0, express_1.default)();
(0, middleware_1.registerMiddlewares)(app);
(0, routes_1.registerRoutes)(app);
(0, error_1.registerErrorHandlers)(app);
exports.default = app;
//# sourceMappingURL=app.js.map