/**
 * 数据库连接和基础操作测试
 * 
 * 用于验证数据库连接是否正常，Schema设计是否正确，
 * 以及基础CRUD操作是否可用
 */
import { connectDatabase, disconnectDatabase, User, Room } from './index';

/**
 * 测试数据库连接
 */
export const testDatabaseConnection = async (): Promise<boolean> => {
  try {
    console.log('🧪 开始测试数据库连接...');
    
    // 连接数据库
    await connectDatabase();
    console.log('✅ 数据库连接成功');
    
    return true;
  } catch (error) {
    console.error('❌ 数据库连接测试失败:', error);
    return false;
  }
};

/**
 * 测试用户模型CRUD操作
 */
export const testUserCRUD = async (): Promise<boolean> => {
  try {
    console.log('🧪 开始测试用户模型CRUD操作...');
    
    // 清理可能存在的测试数据
    await User.deleteMany({ email: 'test@example.com' });
    
    // 创建测试用户
    const testUser = new User({
      username: 'testuser_' + Date.now(),
      email: 'test@example.com',
      passwordHash: '$2b$12$test.hash.for.testing.purposes.only.not.real',
      nickname: '测试用户',
      emailVerified: true,
    });
    
    // 保存用户
    const savedUser = await testUser.save();
    console.log('✅ 用户创建成功:', savedUser.username);
    
    // 查询用户
    const foundUser = await User.findById(savedUser._id);
    if (!foundUser) {
      throw new Error('用户查询失败');
    }
    console.log('✅ 用户查询成功:', foundUser.username);
    
    // 更新用户
    foundUser.nickname = '更新的昵称';
    await foundUser.save();
    console.log('✅ 用户更新成功');
    
    // 删除测试用户
    await User.findByIdAndDelete(savedUser._id);
    console.log('✅ 用户删除成功');
    
    return true;
  } catch (error) {
    console.error('❌ 用户模型CRUD测试失败:', error);
    return false;
  }
};

/**
 * 测试房间模型创建
 */
export const testRoomCreation = async (): Promise<boolean> => {
  try {
    console.log('🧪 开始测试房间模型创建...');
    
    // 清理可能存在的测试数据
    await User.deleteMany({ email: 'creator@example.com' });
    await Room.deleteMany({ name: '测试交易房间' });
    
    // 创建一个临时用户作为房间创建者
    const tempUser = new User({
      username: 'roomcreator_' + Date.now(),
      email: 'creator@example.com',
      passwordHash: '$2b$12$test.hash.for.testing.purposes.only.not.real',
    });
    const savedUser = await tempUser.save();
    
    // 创建测试房间
    const testRoom = new Room({
      name: '测试交易房间',
      description: '这是一个测试房间',
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
      inviteCode: 'TEST01',
    });
    
    // 保存房间
    const savedRoom = await testRoom.save();
    console.log('✅ 房间创建成功:', savedRoom.name);
    
    // 清理测试数据
    await Room.findByIdAndDelete(savedRoom._id);
    await User.findByIdAndDelete(savedUser._id);
    console.log('✅ 测试数据清理成功');
    
    return true;
  } catch (error) {
    console.error('❌ 房间模型测试失败:', error);
    return false;
  }
};

/**
 * 简单的数据库连接验证
 */
export const quickConnectionTest = async (): Promise<void> => {
  try {
    console.log('🔍 快速数据库连接验证...');
    await connectDatabase();
    console.log('✅ 数据库连接验证成功！');
    
    // 检查数据库状态
    const mongoose = require('mongoose');
    console.log('📊 数据库状态:', mongoose.connection.readyState === 1 ? '已连接' : '未连接');
    console.log('🗄️  数据库名称:', mongoose.connection.db?.databaseName || 'N/A');
    
    await disconnectDatabase();
    console.log('🔌 数据库连接已断开');
  } catch (error) {
    console.error('❌ 数据库连接验证失败:', error);
  }
};

/**
 * 运行所有数据库测试
 */
export const runDatabaseTests = async (): Promise<void> => {
  console.log('🚀 开始运行数据库测试套件...\n');
  
  const tests = [
    { name: '数据库连接测试', test: testDatabaseConnection },
    { name: '用户模型CRUD测试', test: testUserCRUD },
    { name: '房间模型创建测试', test: testRoomCreation },
  ];
  
  let passedCount = 0;
  const totalCount = tests.length;
  
  for (const { name, test } of tests) {
    console.log(`\n📋 运行 ${name}...`);
    const result = await test();
    if (result) {
      passedCount++;
      console.log(`✅ ${name} 通过`);
    } else {
      console.log(`❌ ${name} 失败`);
    }
  }
  
  console.log(`\n📊 测试结果: ${passedCount}/${totalCount} 通过`);
  
  if (passedCount === totalCount) {
    console.log('🎉 所有数据库测试通过！数据库配置正确。');
  } else {
    console.log('⚠️  部分测试失败，请检查数据库配置。');
  }
  
  // 断开数据库连接
  await disconnectDatabase();
};

// 如果直接运行此文件，则执行快速连接测试
if (require.main === module) {
  quickConnectionTest().catch(console.error);
} 