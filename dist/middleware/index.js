"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerMiddlewares = void 0;
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const config_1 = require("../config");
const registerMiddlewares = (app) => {
    (0, config_1.validateConfig)();
    app.use((0, helmet_1.default)());
    app.use((0, cors_1.default)({
        origin: (origin, callback) => {
            if (!origin)
                return callback(null, true);
            if (config_1.config.corsOrigins.includes(origin))
                return callback(null, true);
            const isAllowed = config_1.config.corsOrigins.some(allowedOrigin => {
                if (allowedOrigin === '*')
                    return true;
                if (allowedOrigin.endsWith('*')) {
                    const prefix = allowedOrigin.slice(0, -1);
                    return origin.startsWith(prefix);
                }
                return false;
            });
            callback(isAllowed ? null : new Error('Not allowed by CORS'), isAllowed);
        },
        credentials: true,
    }));
    app.use((0, morgan_1.default)(config_1.config.nodeEnv === 'production' ? 'combined' : 'dev'));
    app.use(express_1.default.json({ limit: '10mb' }));
    app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
};
exports.registerMiddlewares = registerMiddlewares;
//# sourceMappingURL=index.js.map