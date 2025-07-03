/**
 * 环境变量相关类型定义
 */

/**
 * 环境变量配置接口
 * 
 * 定义了应用程序所有环境变量的类型结构，包括：
 * - 应用基础配置（端口、环境等）
 * - 数据库连接配置
 * - 安全相关配置（JWT、加密、限流）
 * - 外部服务配置（Redis、WebSocket）
 * - 业务逻辑配置（交易、游戏等）
 */
export interface EnvironmentConfig {
  /** 应用运行环境 */
  nodeEnv: string;
  /** 服务器端口 */
  port: number;
  /** API路由前缀 */
  apiPrefix: string;

  /** MongoDB连接字符串 */
  mongodbUri: string;
  /** MongoDB测试数据库连接字符串 */
  mongodbTestUri: string | undefined;

  /** JWT签名密钥 */
  jwtSecret: string;
  /** JWT过期时间 */
  jwtExpire: string;

  /** Redis服务器地址 */
  redisHost: string;
  /** Redis端口 */
  redisPort: number;
  /** Redis密码 */
  redisPassword: string | undefined;

  /** WebSocket端口 */
  websocketPort: number;

  /** 日志级别 */
  logLevel: string;
  /** 日志文件路径 */
  logFile: string;

  /** 默认游戏时长（毫秒） */
  defaultGameDuration: number;
  /** 默认手续费率 */
  defaultFeeRate: number;
  /** 每房间最大玩家数 */
  maxPlayersPerRoom: number;
  /** 数据推送间隔（毫秒） */
  dataPushInterval: number;

  /** bcrypt哈希轮数 */
  bcryptRounds: number;
  /** 限流时间窗口（毫秒） */
  rateLimitWindow: number;
  /** 限流最大请求次数 */
  rateLimitMax: number;

  /** CORS允许的源地址 */
  corsOrigins: string[];
}

/** Node.js运行环境类型 */
export type NodeEnv = 'development' | 'production' | 'test';

/** 日志级别类型 */
export type LogLevel = 'error' | 'warn' | 'info' | 'debug'; 