"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateConfig = exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const env_1 = require("../common/utils/env");
const env = process.env.NODE_ENV || 'development';
const envFileName = env === 'production' ? 'env.prod' : 'env.dev';
const envPath = path_1.default.join(process.cwd(), 'env', envFileName);
dotenv_1.default.config({ path: envPath });
exports.config = {
    nodeEnv: (0, env_1.getEnvVar)('NODE_ENV', 'development'),
    port: (0, env_1.getEnvNumber)('PORT', 3000),
    apiPrefix: (0, env_1.getEnvVar)('API_PREFIX', '/api/v1'),
    mongodbUri: (0, env_1.getEnvVar)('MONGODB_URI'),
    mongodbTestUri: process.env.MONGODB_TEST_URI || undefined,
    jwtSecret: (0, env_1.getEnvVar)('JWT_SECRET'),
    jwtExpire: (0, env_1.getEnvVar)('JWT_EXPIRE', '7d'),
    redisHost: (0, env_1.getEnvVar)('REDIS_HOST', 'localhost'),
    redisPort: (0, env_1.getEnvNumber)('REDIS_PORT', 6379),
    redisPassword: process.env.REDIS_PASSWORD,
    websocketPort: (0, env_1.getEnvNumber)('WEBSOCKET_PORT', 3001),
    logLevel: (0, env_1.getEnvVar)('LOG_LEVEL', 'info'),
    logFile: (0, env_1.getEnvVar)('LOG_FILE', 'logs/app.log'),
    defaultGameDuration: (0, env_1.getEnvNumber)('DEFAULT_GAME_DURATION', 600000),
    defaultFeeRate: (0, env_1.getEnvFloat)('DEFAULT_FEE_RATE', 0.001),
    maxPlayersPerRoom: (0, env_1.getEnvNumber)('MAX_PLAYERS_PER_ROOM', 12),
    dataPushInterval: (0, env_1.getEnvNumber)('DATA_PUSH_INTERVAL', 500),
    bcryptRounds: (0, env_1.getEnvNumber)('BCRYPT_ROUNDS', 12),
    rateLimitWindow: (0, env_1.getEnvNumber)('RATE_LIMIT_WINDOW', 900000),
    rateLimitMax: (0, env_1.getEnvNumber)('RATE_LIMIT_MAX', 100),
    corsOrigins: (0, env_1.getEnvArray)('CORS_ORIGINS', 'http://localhost:3000,http://localhost:3001'),
};
const validateConfig = () => {
    const requiredConfigs = [
        'mongodbUri',
        'jwtSecret',
    ];
    for (const configKey of requiredConfigs) {
        if (!exports.config[configKey]) {
            throw new Error(`Required configuration ${configKey} is missing`);
        }
    }
    if (exports.config.nodeEnv === 'production' && exports.config.jwtSecret.length < 32) {
        throw new Error('JWT secret must be at least 32 characters long in production');
    }
};
exports.validateConfig = validateConfig;
exports.default = exports.config;
//# sourceMappingURL=environment.js.map