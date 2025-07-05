import mongoose, { Document, Schema } from 'mongoose';

/** 订单文档接口 */
export interface IOrder extends Document {
  /** 订单ID（自动生成的UUID） */
  orderId: string;
  /** 房间ID */
  roomId: mongoose.Types.ObjectId;
  /** 用户ID */
  userId: mongoose.Types.ObjectId;
  /** 用户名 */
  username: string;
  /** 订单类型：limit(限价单), market(市价单) */
  type: 'limit' | 'market';
  /** 买卖方向：buy(买入), sell(卖出) */
  side: 'buy' | 'sell';
  /** 股票代码 */
  symbol: string;
  /** 订单数量 */
  quantity: number;
  /** 已成交数量 */
  filledQuantity: number;
  /** 订单价格（限价单有效） */
  price?: number;
  /** 订单状态：pending(待成交), partially_filled(部分成交), filled(完全成交), cancelled(已撤销), rejected(已拒绝) */
  status: 'pending' | 'partially_filled' | 'filled' | 'cancelled' | 'rejected';
  /** 订单创建时间 */
  createdAt: Date;
  /** 订单更新时间 */
  updatedAt: Date;
  /** 订单过期时间 */
  expiresAt?: Date;
  /** 订单来源：manual(手动), auto(自动) */
  source: 'manual' | 'auto';
  /** 订单备注 */
  notes?: string;
  /** 订单总价值（预估） */
  totalValue: number;
  /** 冻结资金 */
  frozenAmount: number;
}

/** 订单Schema定义 */
const OrderSchema = new Schema<IOrder>({
  orderId: {
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
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  username: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['limit', 'market'],
    required: true,
  },
  side: {
    type: String,
    enum: ['buy', 'sell'],
    required: true,
  },
  symbol: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
    match: /^[A-Z]{2,6}$/, // 2-6位大写字母股票代码
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  filledQuantity: {
    type: Number,
    default: 0,
    min: 0,
  },
  price: {
    type: Number,
    min: 0.01,
    validate: {
      validator: function(this: IOrder, value: number) {
        // 限价单必须有价格，市价单不需要
        return this.type === 'market' || (this.type === 'limit' && value > 0);
      },
      message: '限价单必须指定价格',
    },
  },
  status: {
    type: String,
    enum: ['pending', 'partially_filled', 'filled', 'cancelled', 'rejected'],
    default: 'pending',
  },
  expiresAt: {
    type: Date,
  },
  source: {
    type: String,
    enum: ['manual', 'auto'],
    default: 'manual',
  },
  notes: {
    type: String,
    trim: true,
    maxlength: 200,
  },
  totalValue: {
    type: Number,
    required: true,
    min: 0,
  },
  frozenAmount: {
    type: Number,
    required: true,
    min: 0,
  },
}, {
  timestamps: true,
  collection: 'orders',
});

/** 创建复合索引 */
OrderSchema.index({ roomId: 1, status: 1 }); // 房间和状态复合索引
OrderSchema.index({ userId: 1, status: 1 }); // 用户和状态复合索引
OrderSchema.index({ symbol: 1, side: 1, status: 1 }); // 股票、方向、状态复合索引
OrderSchema.index({ createdAt: -1 }); // 创建时间倒序索引
OrderSchema.index({ type: 1, side: 1, price: 1 }); // 撮合引擎查询索引
OrderSchema.index({ status: 1, expiresAt: 1 }); // 过期订单清理索引

/** 订单模型 */
export const Order = mongoose.model<IOrder>('Order', OrderSchema); 