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
 * 启动HTTP服务器
 * 监听指定端口并输出启动信息
 */
const server = app.listen(config.port, () => {
  console.log(`🚀 Server is running on port ${config.port}`);
  console.log(`📊 Environment: ${config.nodeEnv}`);
  console.log(`🔗 API Base URL: http://localhost:${config.port}${config.apiPrefix}`);
  console.log(`❤️  Health Check: http://localhost:${config.port}/health`);
});

/**
 * 优雅关闭处理
 * 监听SIGTERM信号，确保服务器能够优雅地关闭
 */
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('💀 Process terminated');
    process.exit(0);
  });
});

/**
 * 优雅关闭处理
 * 监听SIGINT信号（Ctrl+C），确保服务器能够优雅地关闭
 */
process.on('SIGINT', () => {
  console.log('👋 SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('💀 Process terminated');
    process.exit(0);
  });
});

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