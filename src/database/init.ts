/**
 * 数据库初始化脚本
 * 
 * 用于创建数据库、集合和索引
 * 确保数据库结构按照设计正确创建
 */

import { connectDatabase, disconnectDatabase } from './connection';
import { User, Room, Order, Trade } from './schemas';

/**
 * 初始化数据库
 * 创建所有必要的集合和索引
 */
export const initializeDatabase = async (): Promise<void> => {
  try {
    console.log('🚀 开始初始化数据库...');
    
    // 连接数据库
    await connectDatabase();
    
    // 创建集合（如果不存在）
    console.log('📊 创建数据库集合...');
    
    // 创建用户集合
    await User.createCollection();
    console.log('✅ 用户集合创建成功');
    
    // 创建房间集合
    await Room.createCollection();
    console.log('✅ 房间集合创建成功');
    
    // 创建订单集合
    await Order.createCollection();
    console.log('✅ 订单集合创建成功');
    
    // 创建交易记录集合
    await Trade.createCollection();
    console.log('✅ 交易记录集合创建成功');
    
    // 确保索引被创建
    console.log('🔍 创建数据库索引...');
    
    await User.ensureIndexes();
    console.log('✅ 用户集合索引创建完成');
    
    await Room.ensureIndexes();
    console.log('✅ 房间集合索引创建完成');
    
    await Order.ensureIndexes();
    console.log('✅ 订单集合索引创建完成');
    
    await Trade.ensureIndexes();
    console.log('✅ 交易记录集合索引创建完成');
    
    console.log('🎉 数据库初始化完成！');
    
    // 显示数据库信息
    const mongoose = require('mongoose');
    console.log('📋 数据库信息:');
    console.log(`   数据库名称: ${mongoose.connection.db.databaseName}`);
    console.log(`   连接状态: ${mongoose.connection.readyState === 1 ? '已连接' : '未连接'}`);
    console.log(`   服务器地址: ${mongoose.connection.host}:${mongoose.connection.port}`);
    
    // 列出所有集合
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📁 已创建的集合:');
    collections.forEach((collection: any) => {
      console.log(`   - ${collection.name}`);
    });
    
  } catch (error) {
    console.error('❌ 数据库初始化失败:', error);
    throw error;
  }
};

/**
 * 创建示例数据（用于测试）
 */
export const createSampleData = async (): Promise<void> => {
  try {
    console.log('📝 创建示例数据...');
    
    // 创建示例用户
    const sampleUser = new User({
      username: 'demo_user',
      email: 'demo@mockfinance.com',
      passwordHash: '$2b$12$abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456',
      nickname: '演示用户',
      emailVerified: true,
      role: 'user',
      status: 'active',
    });
    
    const savedUser = await sampleUser.save();
    console.log('✅ 示例用户创建成功:', savedUser.username);
    
    // 创建示例房间
    const sampleRoom = new Room({
      name: '演示交易房间',
      description: '这是一个用于展示的演示房间',
      createdBy: savedUser._id,
      config: {
        gameDuration: 600000, // 10分钟
        maxPlayers: 8,
        initialAssetsRange: {
          min: 10000,
          max: 20000,
        },
        feeRate: 0.001, // 0.1%
        dataPushInterval: 500,
      },
      inviteCode: 'DEMO01',
      status: 'waiting',
    });
    
    const savedRoom = await sampleRoom.save();
    console.log('✅ 示例房间创建成功:', savedRoom.name);
    
    console.log('🎉 示例数据创建完成！');
    
  } catch (error) {
    console.error('❌ 示例数据创建失败:', error);
    throw error;
  }
};

/**
 * 完整的数据库设置
 * 包括初始化和示例数据创建
 */
export const setupDatabase = async (): Promise<void> => {
  try {
    await initializeDatabase();
    await createSampleData();
    
    console.log('✨ 数据库设置完全完成！');
    console.log('💡 你现在可以在MongoDB Compass中看到数据库和集合了');
    
  } catch (error) {
    console.error('❌ 数据库设置失败:', error);
  } finally {
    await disconnectDatabase();
  }
};

// 如果直接运行此文件，则执行完整的数据库设置
if (require.main === module) {
  setupDatabase().catch(console.error);
} 