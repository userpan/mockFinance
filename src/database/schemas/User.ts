import mongoose, { Document, Schema } from 'mongoose';

/** 用户文档接口 */
export interface IUser extends Document {
  /** 用户名（唯一） */
  username: string;
  /** 电子邮箱（唯一） */
  email: string;
  /** 加密后的密码 */
  passwordHash: string;
  /** 用户昵称 */
  nickname?: string;
  /** 头像URL */
  avatar?: string;
  /** 创建时间 */
  createdAt: Date;
  /** 最后更新时间 */
  updatedAt: Date;
  /** 最后登录时间 */
  lastLoginAt?: Date;
  /** 账户状态：active(活跃), suspended(暂停), deleted(已删除) */
  status: 'active' | 'suspended' | 'deleted';
  /** 用户角色：user(普通用户), admin(管理员) */
  role: 'user' | 'admin';
  /** 是否已验证邮箱 */
  emailVerified: boolean;
  /** 用户统计信息 */
  stats: {
    /** 参与的游戏总数 */
    totalGames: number;
    /** 获胜次数 */
    wins: number;
    /** 平均盈利率 */
    avgProfitRate: number;
    /** 最佳盈利率 */
    bestProfitRate: number;
  };
}

/** 用户Schema定义 */
const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 20,
    match: /^[a-zA-Z0-9_]+$/, // 只允许字母、数字、下划线
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // 基本邮箱格式验证
  },
  passwordHash: {
    type: String,
    required: true,
    minlength: 60, // bcrypt哈希长度
  },
  nickname: {
    type: String,
    trim: true,
    maxlength: 30,
  },
  avatar: {
    type: String,
    trim: true,
  },
  lastLoginAt: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['active', 'suspended', 'deleted'],
    default: 'active',
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  stats: {
    totalGames: { type: Number, default: 0 },
    wins: { type: Number, default: 0 },
    avgProfitRate: { type: Number, default: 0 },
    bestProfitRate: { type: Number, default: 0 },
  },
}, {
  timestamps: true, // 自动添加createdAt和updatedAt
  collection: 'users', // 明确指定集合名称
});

/** 创建索引（避免与字段定义中的unique重复） */
UserSchema.index({ status: 1 }); // 状态索引
UserSchema.index({ createdAt: -1 }); // 创建时间倒序索引
UserSchema.index({ 'stats.avgProfitRate': -1 }); // 平均盈利率倒序索引
UserSchema.index({ lastLoginAt: -1 }); // 最后登录时间倒序索引

/** 用户模型 */
export const User = mongoose.model<IUser>('User', UserSchema); 