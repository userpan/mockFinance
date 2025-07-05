import mongoose, { Document, Schema } from 'mongoose';

/** 房间玩家信息接口 */
export interface IRoomPlayer {
  /** 玩家用户ID */
  userId: mongoose.Types.ObjectId;
  /** 玩家用户名 */
  username: string;
  /** 玩家昵称 */
  nickname?: string;
  /** 加入时间 */
  joinedAt: Date;
  /** 是否准备 */
  isReady: boolean;
  /** 初始资产 */
  initialAssets: number;
  /** 当前资产 */
  currentAssets: number;
  /** 盈亏金额 */
  profitLoss: number;
  /** 盈亏率 */
  profitRate: number;
  /** 排名 */
  rank?: number;
}

/** 房间配置接口 */
export interface IRoomConfig {
  /** 游戏时长（毫秒） */
  gameDuration: number;
  /** 最大玩家数 */
  maxPlayers: number;
  /** 初始资产范围 */
  initialAssetsRange: {
    min: number;
    max: number;
  };
  /** 手续费率 */
  feeRate: number;
  /** 数据推送间隔（毫秒） */
  dataPushInterval: number;
}

/** 房间文档接口 */
export interface IRoom extends Document {
  /** 房间名称 */
  name: string;
  /** 房间描述 */
  description?: string;
  /** 房间创建者ID */
  createdBy: mongoose.Types.ObjectId;
  /** 房间状态：waiting(等待中), ready(准备中), playing(进行中), finished(已结束) */
  status: 'waiting' | 'ready' | 'playing' | 'finished';
  /** 房间配置 */
  config: IRoomConfig;
  /** 玩家列表 */
  players: IRoomPlayer[];
  /** 游戏开始时间 */
  gameStartAt?: Date;
  /** 游戏结束时间 */
  gameEndAt?: Date;
  /** 创建时间 */
  createdAt: Date;
  /** 最后更新时间 */
  updatedAt: Date;
  /** 是否私人房间 */
  isPrivate: boolean;
  /** 房间密码（私人房间） */
  password?: string;
  /** 房间邀请码 */
  inviteCode: string;
}

/** 房间玩家Schema定义 */
const RoomPlayerSchema = new Schema<IRoomPlayer>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
  isReady: {
    type: Boolean,
    default: false,
  },
  initialAssets: {
    type: Number,
    required: true,
    min: 0,
  },
  currentAssets: {
    type: Number,
    required: true,
    min: 0,
  },
  profitLoss: {
    type: Number,
    default: 0,
  },
  profitRate: {
    type: Number,
    default: 0,
  },
  rank: {
    type: Number,
    min: 1,
  },
}, { _id: false });

/** 房间配置Schema定义 */
const RoomConfigSchema = new Schema<IRoomConfig>({
  gameDuration: {
    type: Number,
    required: true,
    min: 60000, // 最少1分钟
    max: 3600000, // 最多1小时
  },
  maxPlayers: {
    type: Number,
    required: true,
    min: 2,
    max: 50,
  },
  initialAssetsRange: {
    min: {
      type: Number,
      required: true,
      min: 1000,
    },
    max: {
      type: Number,
      required: true,
      min: 1000,
    },
  },
  feeRate: {
    type: Number,
    required: true,
    min: 0,
    max: 0.1, // 最高10%手续费
  },
  dataPushInterval: {
    type: Number,
    required: true,
    min: 100, // 最少100ms
    max: 5000, // 最多5秒
  },
}, { _id: false });

/** 房间Schema定义 */
const RoomSchema = new Schema<IRoom>({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  description: {
    type: String,
    trim: true,
    maxlength: 200,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['waiting', 'ready', 'playing', 'finished'],
    default: 'waiting',
  },
  config: {
    type: RoomConfigSchema,
    required: true,
  },
  players: [RoomPlayerSchema],
  gameStartAt: {
    type: Date,
  },
  gameEndAt: {
    type: Date,
  },
  isPrivate: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    trim: true,
  },
  inviteCode: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    length: 6,
  },
}, {
  timestamps: true,
  collection: 'rooms',
});

/** 创建索引（避免与字段定义中的unique重复） */
RoomSchema.index({ status: 1 }); // 房间状态索引
RoomSchema.index({ createdBy: 1 }); // 创建者索引
RoomSchema.index({ createdAt: -1 }); // 创建时间倒序索引
RoomSchema.index({ 'players.userId': 1 }); // 玩家用户ID索引
RoomSchema.index({ gameStartAt: 1 }); // 游戏开始时间索引
RoomSchema.index({ isPrivate: 1, status: 1 }); // 私人房间和状态复合索引

/** 房间模型 */
export const Room = mongoose.model<IRoom>('Room', RoomSchema); 