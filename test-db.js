/**
 * 简单的数据库连接测试脚本
 * 用于快速验证MongoDB连接是否正常
 */

const mongoose = require('mongoose');
require('dotenv').config({ path: './env/env.dev' });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mockfinance_dev';

async function testConnection() {
  try {
    console.log('🔌 正在连接MongoDB...');
    console.log('📍 连接URI:', MONGODB_URI);
    
    await mongoose.connect(MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log('✅ MongoDB连接成功！');
    console.log('📊 连接状态:', mongoose.connection.readyState === 1 ? '已连接' : '未连接');
    console.log('🗄️  数据库名称:', mongoose.connection.db.databaseName);
    console.log('🖥️  服务器主机:', mongoose.connection.host);
    console.log('🔌 端口号:', mongoose.connection.port);
    
    // 测试创建一个简单的集合
    const TestSchema = new mongoose.Schema({
      name: String,
      createdAt: { type: Date, default: Date.now }
    });
    
    const TestModel = mongoose.model('Test', TestSchema);
    
    // 创建测试文档
    const testDoc = new TestModel({ name: 'connection_test' });
    const saved = await testDoc.save();
    console.log('✅ 测试文档创建成功，ID:', saved._id);
    
    // 查询测试文档
    const found = await TestModel.findById(saved._id);
    console.log('✅ 测试文档查询成功:', found.name);
    
    // 删除测试文档
    await TestModel.findByIdAndDelete(saved._id);
    console.log('✅ 测试文档删除成功');
    
    // 清理测试集合
    await mongoose.connection.db.dropCollection('tests');
    console.log('✅ 测试集合清理完成');
    
  } catch (error) {
    console.error('❌ 数据库连接失败:', error.message);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('💡 建议：');
      console.log('   1. 确保MongoDB服务正在运行');
      console.log('   2. 检查MongoDB是否在localhost:27017端口运行');
      console.log('   3. 在MongoDB Compass中创建连接');
    }
  } finally {
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
      console.log('🔌 数据库连接已断开');
    }
  }
}

// 运行测试
testConnection(); 