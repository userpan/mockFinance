/**
 * 工具函数统一导出
 */

/**
 * 环境变量工具函数
 * 
 * 提供类型安全的环境变量获取和转换功能：
 * - getEnvVar: 获取字符串类型环境变量
 * - getEnvNumber: 获取数字类型环境变量  
 * - getEnvFloat: 获取浮点数类型环境变量
 * - getEnvBoolean: 获取布尔类型环境变量
 * - getEnvArray: 获取数组类型环境变量（逗号分隔）
 */
export * from './env';

// 未来可以添加其他领域的工具函数，如：
// export * from './date';     // 日期时间工具
// export * from './crypto';   // 加密工具  
// export * from './format';   // 格式化工具
// export * from './validate'; // 验证工具 