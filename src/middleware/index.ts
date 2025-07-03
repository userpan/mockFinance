import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import { config, validateConfig } from '../config';

/**
 * 注册全局中间件
 * 
 * 配置并注册Express应用的全局中间件：
 * - 安全头部（helmet）
 * - 跨域支持（CORS）
 * - 请求日志（morgan）
 * - 请求体解析（json/urlencoded）
 * 
 * @param app Express应用实例
 */
export const registerMiddlewares = (app: express.Express): void => {
  // 验证配置有效性
  validateConfig();
  
  // 安全头部中间件
  app.use(helmet());
  
  // CORS跨域中间件
  app.use(cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (config.corsOrigins.includes(origin)) return callback(null, true);
      const isAllowed = config.corsOrigins.some(allowedOrigin => {
        if (allowedOrigin === '*') return true;
        if (allowedOrigin.endsWith('*')) {
          const prefix = allowedOrigin.slice(0, -1);
          return origin.startsWith(prefix);
        }
        return false;
      });
      callback(isAllowed ? null : new Error('Not allowed by CORS'), isAllowed);
    },
    credentials: true,
  }));
  
  // 请求日志中间件
  app.use(morgan(config.nodeEnv === 'production' ? 'combined' : 'dev'));
  
  // 请求体解析中间件
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
};
