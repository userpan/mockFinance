"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runDatabaseTests = exports.testRoomCreation = exports.testUserCRUD = exports.testDatabaseConnection = void 0;
const index_1 = require("./index");
const testDatabaseConnection = async () => {
    try {
        console.log('🧪 开始测试数据库连接...');
        await (0, index_1.connectDatabase)();
        console.log('✅ 数据库连接成功');
        return true;
    }
    catch (error) {
        console.error('❌ 数据库连接测试失败:', error);
        return false;
    }
};
exports.testDatabaseConnection = testDatabaseConnection;
const testUserCRUD = async () => {
    try {
        console.log('🧪 开始测试用户模型CRUD操作...');
        const testUser = new index_1.User({
            username: 'testuser',
            email: 'test@example.com',
            passwordHash: '$2b$12$test.hash.for.testing.purposes',
            nickname: '测试用户',
            emailVerified: true,
        });
        const savedUser = await testUser.save();
        console.log('✅ 用户创建成功:', savedUser.username);
        const foundUser = await index_1.User.findById(savedUser._id);
        if (!foundUser) {
            throw new Error('用户查询失败');
        }
        console.log('✅ 用户查询成功:', foundUser.username);
        foundUser.nickname = '更新的昵称';
        await foundUser.save();
        console.log('✅ 用户更新成功');
        await index_1.User.findByIdAndDelete(savedUser._id);
        console.log('✅ 用户删除成功');
        return true;
    }
    catch (error) {
        console.error('❌ 用户模型CRUD测试失败:', error);
        return false;
    }
};
exports.testUserCRUD = testUserCRUD;
const testRoomCreation = async () => {
    try {
        console.log('🧪 开始测试房间模型创建...');
        const tempUser = new index_1.User({
            username: 'roomcreator',
            email: 'creator@example.com',
            passwordHash: '$2b$12$test.hash.for.testing.purposes',
        });
        const savedUser = await tempUser.save();
        const testRoom = new index_1.Room({
            name: '测试交易房间',
            description: '这是一个测试房间',
            createdBy: savedUser._id,
            config: {
                gameDuration: 600000,
                maxPlayers: 8,
                initialAssetsRange: {
                    min: 10000,
                    max: 20000,
                },
                feeRate: 0.001,
                dataPushInterval: 500,
            },
            inviteCode: 'TEST01',
        });
        const savedRoom = await testRoom.save();
        console.log('✅ 房间创建成功:', savedRoom.name);
        await index_1.Room.findByIdAndDelete(savedRoom._id);
        await index_1.User.findByIdAndDelete(savedUser._id);
        console.log('✅ 测试数据清理成功');
        return true;
    }
    catch (error) {
        console.error('❌ 房间模型测试失败:', error);
        return false;
    }
};
exports.testRoomCreation = testRoomCreation;
const runDatabaseTests = async () => {
    console.log('🚀 开始运行数据库测试套件...\n');
    const tests = [
        { name: '数据库连接测试', test: exports.testDatabaseConnection },
        { name: '用户模型CRUD测试', test: exports.testUserCRUD },
        { name: '房间模型创建测试', test: exports.testRoomCreation },
    ];
    let passedCount = 0;
    const totalCount = tests.length;
    for (const { name, test } of tests) {
        console.log(`\n📋 运行 ${name}...`);
        const result = await test();
        if (result) {
            passedCount++;
            console.log(`✅ ${name} 通过`);
        }
        else {
            console.log(`❌ ${name} 失败`);
        }
    }
    console.log(`\n📊 测试结果: ${passedCount}/${totalCount} 通过`);
    if (passedCount === totalCount) {
        console.log('🎉 所有数据库测试通过！数据库配置正确。');
    }
    else {
        console.log('⚠️  部分测试失败，请检查数据库配置。');
    }
    await (0, index_1.disconnectDatabase)();
};
exports.runDatabaseTests = runDatabaseTests;
if (require.main === module) {
    (0, exports.runDatabaseTests)().catch(console.error);
}
//# sourceMappingURL=test.js.map