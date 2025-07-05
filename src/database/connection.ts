import mongoose from 'mongoose';
import { config } from '../config';

/** MongoDB连接选项配置 */
const connectionOptions: mongoose.ConnectOptions = {
  maxPoolSize: 10, // 连接池最大连接数
  serverSelectionTimeoutMS: 5000, // 服务器选择超时时间
  socketTimeoutMS: 45000, // Socket超时时间
};

/** 数据库连接状态 */
let isConnected = false;

/**
 * 连接到MongoDB数据库
 */
export const connectDatabase = async (): Promise<void> => {
  try {
    if (isConnected) {
      console.log('📦 数据库已连接');
      return;
    }

    console.log('🔌 正在连接MongoDB数据库...');
    
    await mongoose.connect(config.mongodbUri, connectionOptions);
    
    isConnected = true;
    console.log('✅ MongoDB数据库连接成功');
    
    // 监听连接事件
    mongoose.connection.on('error', (error) => {
      console.error('❌ MongoDB连接错误:', error);
      isConnected = false;
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('📱 MongoDB连接断开');
      isConnected = false;
    });
    
    mongoose.connection.on('reconnected', () => {
      console.log('🔄 MongoDB重新连接成功');
      isConnected = true;
    });
    
  } catch (error) {
    console.error('❌ MongoDB连接失败:', error);
    isConnected = false;
    throw error;
  }
};

/**
 * 断开数据库连接
 */
export const disconnectDatabase = async (): Promise<void> => {
  try {
    if (!isConnected) {
      return;
    }
    
    await mongoose.disconnect();
    isConnected = false;
    console.log('🔌 数据库连接已断开');
  } catch (error) {
    console.error('❌ 断开数据库连接失败:', error);
    throw error;
  }
};

/**
 * 检查数据库连接状态
 */
export const isDatabaseConnected = (): boolean => {
  return isConnected && mongoose.connection.readyState === 1;
};

/**
 * 获取数据库连接实例
 */
export const getConnection = () => {
  return mongoose.connection;
}; 