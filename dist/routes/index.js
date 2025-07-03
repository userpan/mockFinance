"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = void 0;
const config_1 = require("../config");
const registerRoutes = (app) => {
    app.get('/health', (_req, res) => {
        res.status(200).json({
            status: 'ok',
            timestamp: new Date().toISOString(),
            environment: config_1.config.nodeEnv,
            version: process.env.npm_package_version || '1.0.0',
        });
    });
    app.use(config_1.config.apiPrefix, (_req, res) => {
        res.status(404).json({
            error: 'API endpoint not found',
            message: 'This endpoint has not been implemented yet',
        });
    });
};
exports.registerRoutes = registerRoutes;
//# sourceMappingURL=index.js.map