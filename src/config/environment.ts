import dotenv from 'dotenv';
import path from 'path';
import { getEnvVar, getEnvNumber, getEnvFloat, getEnvArray } from '../common/utils/env';
import type { EnvironmentConfig } from '../common/types/env';

/** 根据NODE_ENV加载对应的环境变量文件 */
const env = process.env.NODE_ENV || 'development';
const envFileName = env === 'production' ? 'env.prod' : 'env.dev';
const envPath = path.join(process.cwd(), 'env', envFileName);

/** 加载环境变量 */
dotenv.config({ path: envPath });

/** 导出环境配置 */
export const config: EnvironmentConfig = {
  // 应用配置
  nodeEnv: getEnvVar('NODE_ENV', 'development'),
  port: getEnvNumber('PORT', 3000),
  apiPrefix: getEnvVar('API_PREFIX', '/api/v1'),

  // 数据库配置
  mongodbUri: getEnvVar('MONGODB_URI'),
  mongodbTestUri: process.env.MONGODB_TEST_URI || undefined,

  // JWT配置
  jwtSecret: getEnvVar('JWT_SECRET'),
  jwtExpire: getEnvVar('JWT_EXPIRE', '7d'),

  // Redis配置
  redisHost: getEnvVar('REDIS_HOST', 'localhost'),
  redisPort: getEnvNumber('REDIS_PORT', 6379),
  redisPassword: process.env.REDIS_PASSWORD,

  // WebSocket配置
  websocketPort: getEnvNumber('WEBSOCKET_PORT', 3001),

  // 日志配置
  logLevel: getEnvVar('LOG_LEVEL', 'info'),
  logFile: getEnvVar('LOG_FILE', 'logs/app.log'),

  // 交易配置
  defaultGameDuration: getEnvNumber('DEFAULT_GAME_DURATION', 600000), // 10分钟
  defaultFeeRate: getEnvFloat('DEFAULT_FEE_RATE', 0.001), // 0.1%
  maxPlayersPerRoom: getEnvNumber('MAX_PLAYERS_PER_ROOM', 12),
  dataPushInterval: getEnvNumber('DATA_PUSH_INTERVAL', 500), // 0.5秒

  // 安全配置
  bcryptRounds: getEnvNumber('BCRYPT_ROUNDS', 12),
  rateLimitWindow: getEnvNumber('RATE_LIMIT_WINDOW', 900000), // 15分钟
  rateLimitMax: getEnvNumber('RATE_LIMIT_MAX', 100),

  // CORS配置
  corsOrigins: getEnvArray('CORS_ORIGINS', 'http://localhost:3000,http://localhost:3001'),
};

/** 验证关键配置 */
export const validateConfig = (): void => {
  const requiredConfigs = [
    'mongodbUri',
    'jwtSecret',
  ];

  for (const configKey of requiredConfigs) {
    if (!config[configKey as keyof EnvironmentConfig]) {
      throw new Error(`Required configuration ${configKey} is missing`);
    }
  }

  // 验证JWT密钥强度（生产环境）
  if (config.nodeEnv === 'production' && config.jwtSecret.length < 32) {
    throw new Error('JWT secret must be at least 32 characters long in production');
  }
};

export default config; 