/**
 * 路由注册模块
 * 
 * 负责注册所有HTTP路由：
 * - 系统级路由（健康检查等）
 * - 业务API路由的基础框架
 * - 404处理的临时实现
 * 
 * 未来会在这里注册各个业务模块的具体路由
 */
import express from 'express';
import { config } from '../config';

/**
 * 注册所有业务路由
 * 
 * 配置Express应用的路由系统：
 * - 健康检查路由
 * - API基础路由框架
 * - 未实现路由的占位符
 * 
 * @param app Express应用实例
 */
export const registerRoutes = (app: express.Express): void => {
  // 健康检查路由 - 用于服务器状态监控
  app.get('/health', (_req, res) => {
    res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: config.nodeEnv,
      version: process.env.npm_package_version || '1.0.0',
    });
  });

  // API前缀路由 - 业务API的基础框架
  // TODO: 后续在这里注册具体的业务路由模块
  app.use(config.apiPrefix, (_req, res) => {
    res.status(404).json({
      error: 'API endpoint not found',
      message: 'This endpoint has not been implemented yet',
    });
  });
};
