/**
 * 数据库模块统一导出
 * 
 * 包含数据库连接管理、模型定义和相关工具函数的统一导出
 */

// 数据库连接管理
export {
  connectDatabase,
  disconnectDatabase,
  isDatabaseConnected,
  getConnection,
} from './connection';

// 数据库模型和接口
export * from './schemas'; 