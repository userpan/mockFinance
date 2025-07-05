import mongoose, { Document } from 'mongoose';
export interface IRoomPlayer {
    userId: mongoose.Types.ObjectId;
    username: string;
    nickname?: string;
    joinedAt: Date;
    isReady: boolean;
    initialAssets: number;
    currentAssets: number;
    profitLoss: number;
    profitRate: number;
    rank?: number;
}
export interface IRoomConfig {
    gameDuration: number;
    maxPlayers: number;
    initialAssetsRange: {
        min: number;
        max: number;
    };
    feeRate: number;
    dataPushInterval: number;
}
export interface IRoom extends Document {
    name: string;
    description?: string;
    createdBy: mongoose.Types.ObjectId;
    status: 'waiting' | 'ready' | 'playing' | 'finished';
    config: IRoomConfig;
    players: IRoomPlayer[];
    gameStartAt?: Date;
    gameEndAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    isPrivate: boolean;
    password?: string;
    inviteCode: string;
}
export declare const Room: mongoose.Model<IRoom, {}, {}, {}, mongoose.Document<unknown, {}, IRoom, {}> & IRoom & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Room.d.ts.map