/**
 * 数据库重置脚本
 * 
 * 清理现有数据库，删除所有集合和索引，然后重新初始化
 * 注意：此操作会删除所有数据，请谨慎使用
 */

import { connectDatabase, disconnectDatabase } from './connection';
import { initializeDatabase, createSampleData } from './init';

/**
 * 重置数据库
 * 删除所有集合和数据，然后重新初始化
 */
export const resetDatabase = async (): Promise<void> => {
  try {
    console.log('🔄 开始重置数据库...');
    console.log('⚠️  警告：此操作将删除所有现有数据！');
    
    // 连接数据库
    await connectDatabase();
    
    const mongoose = require('mongoose');
    const db = mongoose.connection.db;
    
    // 获取所有集合
    const collections = await db.listCollections().toArray();
    console.log(`📁 发现 ${collections.length} 个集合`);
    
    // 删除所有非系统集合
    for (const collection of collections) {
      const collectionName = collection.name;
      
      // 跳过系统集合
      if (collectionName.startsWith('system.')) {
        console.log(`⏭️  跳过系统集合: ${collectionName}`);
        continue;
      }
      
      try {
        await db.dropCollection(collectionName);
        console.log(`🗑️  删除集合: ${collectionName}`);
      } catch (error: any) {
        if (error.code === 26) {
          // 集合不存在
          console.log(`ℹ️  集合不存在: ${collectionName}`);
        } else {
          console.error(`❌ 删除集合失败 ${collectionName}:`, error.message);
        }
      }
    }
    
    console.log('✅ 数据库清理完成');
    
    // 断开连接，重新连接以清理连接状态
    await disconnectDatabase();
    
    console.log('🔄 重新初始化数据库...');
    
    // 重新初始化
    await initializeDatabase();
    await createSampleData();
    
    console.log('🎉 数据库重置完成！');
    
  } catch (error) {
    console.error('❌ 数据库重置失败:', error);
    throw error;
  } finally {
    await disconnectDatabase();
  }
};

// 如果直接运行此文件，则执行数据库重置
if (require.main === module) {
  resetDatabase().catch(console.error);
} 