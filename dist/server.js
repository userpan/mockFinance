"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = require("./config");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const logsDir = path_1.default.dirname(config_1.config.logFile);
if (!fs_1.default.existsSync(logsDir)) {
    fs_1.default.mkdirSync(logsDir, { recursive: true });
}
const server = app_1.default.listen(config_1.config.port, () => {
    console.log(`🚀 Server is running on port ${config_1.config.port}`);
    console.log(`📊 Environment: ${config_1.config.nodeEnv}`);
    console.log(`🔗 API Base URL: http://localhost:${config_1.config.port}${config_1.config.apiPrefix}`);
    console.log(`❤️  Health Check: http://localhost:${config_1.config.port}/health`);
});
process.on('SIGTERM', () => {
    console.log('👋 SIGTERM received, shutting down gracefully');
    server.close(() => {
        console.log('💀 Process terminated');
        process.exit(0);
    });
});
process.on('SIGINT', () => {
    console.log('👋 SIGINT received, shutting down gracefully');
    server.close(() => {
        console.log('💀 Process terminated');
        process.exit(0);
    });
});
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