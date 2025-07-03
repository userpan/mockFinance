/**
 * Express应用主入口文件
 * 
 * 负责创建和配置Express应用实例：
 * - 注册全局中间件
 * - 注册业务路由
 * - 注册错误处理
 * 
 * 这是应用的核心组装模块，按照分层架构原则组织各个功能模块
 */
import express from 'express';
import { registerMiddlewares } from './middleware';
import { registerRoutes } from './routes';
import { registerErrorHandlers } from './error';

// 创建Express应用实例
const app = express();

// 按顺序注册各个功能模块
registerMiddlewares(app);    // 全局中间件
registerRoutes(app);         // 业务路由
registerErrorHandlers(app);  // 错误处理

export default app; 