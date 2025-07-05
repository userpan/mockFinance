import mongoose, { Document } from 'mongoose';
export interface IOrder extends Document {
    orderId: string;
    roomId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    username: string;
    type: 'limit' | 'market';
    side: 'buy' | 'sell';
    symbol: string;
    quantity: number;
    filledQuantity: number;
    price?: number;
    status: 'pending' | 'partially_filled' | 'filled' | 'cancelled' | 'rejected';
    createdAt: Date;
    updatedAt: Date;
    expiresAt?: Date;
    source: 'manual' | 'auto';
    notes?: string;
    totalValue: number;
    frozenAmount: number;
}
export declare const Order: mongoose.Model<IOrder, {}, {}, {}, mongoose.Document<unknown, {}, IOrder, {}> & IOrder & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Order.d.ts.map