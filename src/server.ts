/**
 * 服务器启动入口文件
 * 
 * 负责启动HTTP服务器并处理系统级事件：
 * - 创建必要的目录结构
 * - 启动Express服务器
 * - 配置优雅关闭机制
 * - 处理未捕获的异常
 */
import app from './app';
import { config } from './config';
import { connectDatabase, disconnectDatabase } from './database';

/**
 * 初始化系统目录
 * 确保日志目录存在，为应用运行做准备
 */
import fs from 'fs';
import path from 'path';

const logsDir = path.dirname(config.logFile);
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

/**
 * 初始化数据库连接和启动HTTP服务器
 */
const startServer = async () => {
  try {
    // 连接数据库
    await connectDatabase();
    
    // 启动HTTP服务器
    const server = app.listen(config.port, () => {
      console.log(`🚀 Server is running on port ${config.port}`);
      console.log(`📊 Environment: ${config.nodeEnv}`);
      console.log(`🔗 API Base URL: http://localhost:${config.port}${config.apiPrefix}`);
      console.log(`❤️  Health Check: http://localhost:${config.port}/health`);
    });

    return server;
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// 启动服务器
let server: any;
startServer().then(s => { server = s; });

/**
 * 优雅关闭处理函数
 */
const gracefulShutdown = async (signal: string) => {
  console.log(`👋 ${signal} received, shutting down gracefully`);
  
  if (server) {
    server.close(async () => {
      try {
        await disconnectDatabase();
        console.log('💀 Process terminated');
        process.exit(0);
      } catch (error) {
        console.error('❌ Error during shutdown:', error);
        process.exit(1);
      }
    });
  } else {
    process.exit(0);
  }
};

/**
 * 监听优雅关闭信号
 */
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

/**
 * 未捕获异常处理
 * 处理同步代码中的未捕获异常，记录错误并退出进程
 */
process.on('uncaughtException', (err) => {
  console.error('💥 Uncaught Exception:', err);
  process.exit(1);
});

/**
 * 未处理的Promise拒绝处理
 * 处理异步代码中的未处理Promise拒绝，记录错误并退出进程
 */
process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

export default server; 