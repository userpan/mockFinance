"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnection = exports.isDatabaseConnected = exports.disconnectDatabase = exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config");
const connectionOptions = {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
};
let isConnected = false;
const connectDatabase = async () => {
    try {
        if (isConnected) {
            console.log('📦 数据库已连接');
            return;
        }
        console.log('🔌 正在连接MongoDB数据库...');
        await mongoose_1.default.connect(config_1.config.mongodbUri, connectionOptions);
        isConnected = true;
        console.log('✅ MongoDB数据库连接成功');
        mongoose_1.default.connection.on('error', (error) => {
            console.error('❌ MongoDB连接错误:', error);
            isConnected = false;
        });
        mongoose_1.default.connection.on('disconnected', () => {
            console.log('📱 MongoDB连接断开');
            isConnected = false;
        });
        mongoose_1.default.connection.on('reconnected', () => {
            console.log('🔄 MongoDB重新连接成功');
            isConnected = true;
        });
    }
    catch (error) {
        console.error('❌ MongoDB连接失败:', error);
        isConnected = false;
        throw error;
    }
};
exports.connectDatabase = connectDatabase;
const disconnectDatabase = async () => {
    try {
        if (!isConnected) {
            return;
        }
        await mongoose_1.default.disconnect();
        isConnected = false;
        console.log('🔌 数据库连接已断开');
    }
    catch (error) {
        console.error('❌ 断开数据库连接失败:', error);
        throw error;
    }
};
exports.disconnectDatabase = disconnectDatabase;
const isDatabaseConnected = () => {
    return isConnected && mongoose_1.default.connection.readyState === 1;
};
exports.isDatabaseConnected = isDatabaseConnected;
const getConnection = () => {
    return mongoose_1.default.connection;
};
exports.getConnection = getConnection;
//# sourceMappingURL=connection.js.map