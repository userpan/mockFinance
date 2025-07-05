import mongoose, { Document, Schema } from 'mongoose';

/** 交易记录文档接口 */
export interface ITrade extends Document {
  /** 交易ID（自动生成的UUID） */
  tradeId: string;
  /** 房间ID */
  roomId: mongoose.Types.ObjectId;
  /** 股票代码 */
  symbol: string;
  /** 买方订单ID */
  buyOrderId: string;
  /** 卖方订单ID */
  sellOrderId: string;
  /** 买方用户ID */
  buyerId: mongoose.Types.ObjectId;
  /** 买方用户名 */
  buyerUsername: string;
  /** 卖方用户ID */
  sellerId: mongoose.Types.ObjectId;
  /** 卖方用户名 */
  sellerUsername: string;
  /** 成交价格 */
  price: number;
  /** 成交数量 */
  quantity: number;
  /** 成交总额 */
  amount: number;
  /** 买方手续费 */
  buyerFee: number;
  /** 卖方手续费 */
  sellerFee: number;
  /** 交易时间 */
  tradeTime: Date;
  /** 创建时间 */
  createdAt: Date;
  /** 更新时间 */
  updatedAt: Date;
  /** 交易来源：matching(撮合), manual(手动) */
  source: 'matching' | 'manual';
  /** 是否为部分成交 */
  isPartialFill: boolean;
}

/** 交易记录Schema定义 */
const TradeSchema = new Schema<ITrade>({
  tradeId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  roomId: {
    type: Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
    index: true,
  },
  symbol: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
    match: /^[A-Z]{2,6}$/,
  },
  buyOrderId: {
    type: String,
    required: true,
    index: true,
  },
  sellOrderId: {
    type: String,
    required: true,
    index: true,
  },
  buyerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  buyerUsername: {
    type: String,
    required: true,
  },
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  sellerUsername: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0.01,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  amount: {
    type: Number,
    required: true,
    min: 0.01,
  },
  buyerFee: {
    type: Number,
    required: true,
    min: 0,
  },
  sellerFee: {
    type: Number,
    required: true,
    min: 0,
  },
  tradeTime: {
    type: Date,
    required: true,
    default: Date.now,
  },
  source: {
    type: String,
    enum: ['matching', 'manual'],
    default: 'matching',
  },
  isPartialFill: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
  collection: 'trades',
});

/** 创建复合索引（避免与字段定义中的index重复） */
TradeSchema.index({ roomId: 1, tradeTime: -1 }); // 房间和交易时间复合索引
TradeSchema.index({ symbol: 1, tradeTime: -1 }); // 股票和交易时间复合索引
TradeSchema.index({ buyerId: 1, tradeTime: -1 }); // 买方和交易时间复合索引
TradeSchema.index({ sellerId: 1, tradeTime: -1 }); // 卖方和交易时间复合索引
TradeSchema.index({ tradeTime: -1 }); // 交易时间倒序索引
TradeSchema.index({ source: 1 }); // 交易来源索引

/** 交易记录模型 */
export const Trade = mongoose.model<ITrade>('Trade', TradeSchema); 