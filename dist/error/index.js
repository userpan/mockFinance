"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerErrorHandlers = void 0;
const config_1 = require("../config");
const registerErrorHandlers = (app) => {
    app.use('*', (req, res) => {
        res.status(404).json({
            error: 'Not Found',
            message: `Route ${req.originalUrl} not found`,
        });
    });
    app.use((err, _req, res, _next) => {
        console.error('Error:', err);
        const statusCode = err.statusCode || err.status || 500;
        const message = config_1.config.nodeEnv === 'production' ? 'Internal Server Error' : err.message;
        res.status(statusCode).json({
            error: 'Server Error',
            message,
            ...(config_1.config.nodeEnv !== 'production' && { stack: err.stack }),
        });
    });
};
exports.registerErrorHandlers = registerErrorHandlers;
//# sourceMappingURL=index.js.map