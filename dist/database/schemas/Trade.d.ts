import mongoose, { Document } from 'mongoose';
export interface ITrade extends Document {
    tradeId: string;
    roomId: mongoose.Types.ObjectId;
    symbol: string;
    buyOrderId: string;
    sellOrderId: string;
    buyerId: mongoose.Types.ObjectId;
    buyerUsername: string;
    sellerId: mongoose.Types.ObjectId;
    sellerUsername: string;
    price: number;
    quantity: number;
    amount: number;
    buyerFee: number;
    sellerFee: number;
    tradeTime: Date;
    createdAt: Date;
    updatedAt: Date;
    source: 'matching' | 'manual';
    isPartialFill: boolean;
}
export declare const Trade: mongoose.Model<ITrade, {}, {}, {}, mongoose.Document<unknown, {}, ITrade, {}> & ITrade & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Trade.d.ts.map