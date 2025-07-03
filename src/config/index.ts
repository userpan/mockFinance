/** 配置模块入口文件 */
export { default as config, validateConfig } from './environment';
export type { EnvironmentConfig } from '../common/types/env';

// 数据库配置（将在任务2中实现）
// export { default as database } from './database';

// 其他配置模块将在后续任务中添加 