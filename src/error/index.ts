import express from 'express';
import { config } from '../config';

/**
 * 注册全局404和错误处理中间件
 * 
 * 配置Express应用的错误处理：
 * - 404路由处理
 * - 全局错误捕获和格式化
 * - 生产环境错误信息过滤
 * 
 * @param app Express应用实例
 */
export const registerErrorHandlers = (app: express.Express): void => {
  // 404处理中间件
  app.use('*', (req, res) => {
    res.status(404).json({
      error: 'Not Found',
      message: `Route ${req.originalUrl} not found`,
    });
  });

  // 全局错误处理中间件
  app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error('Error:', err);
    const statusCode = err.statusCode || err.status || 500;
    const message = config.nodeEnv === 'production' ? 'Internal Server Error' : err.message;
    res.status(statusCode).json({
      error: 'Server Error',
      message,
      ...(config.nodeEnv !== 'production' && { stack: err.stack }),
    });
  });
};
