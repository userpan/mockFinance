"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = require("./config");
const database_1 = require("./database");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const logsDir = path_1.default.dirname(config_1.config.logFile);
if (!fs_1.default.existsSync(logsDir)) {
    fs_1.default.mkdirSync(logsDir, { recursive: true });
}
const startServer = async () => {
    try {
        await (0, database_1.connectDatabase)();
        const server = app_1.default.listen(config_1.config.port, () => {
            console.log(`🚀 Server is running on port ${config_1.config.port}`);
            console.log(`📊 Environment: ${config_1.config.nodeEnv}`);
            console.log(`🔗 API Base URL: http://localhost:${config_1.config.port}${config_1.config.apiPrefix}`);
            console.log(`❤️  Health Check: http://localhost:${config_1.config.port}/health`);
        });
        return server;
    }
    catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};
let server;
startServer().then(s => { server = s; });
const gracefulShutdown = async (signal) => {
    console.log(`👋 ${signal} received, shutting down gracefully`);
    if (server) {
        server.close(async () => {
            try {
                await (0, database_1.disconnectDatabase)();
                console.log('💀 Process terminated');
                process.exit(0);
            }
            catch (error) {
                console.error('❌ Error during shutdown:', error);
                process.exit(1);
            }
        });
    }
    else {
        process.exit(0);
    }
};
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('uncaughtException', (err) => {
    console.error('💥 Uncaught Exception:', err);
    process.exit(1);
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});
exports.default = server;
//# sourceMappingURL=server.js.map