import mongoose, { Document } from 'mongoose';
export interface IUser extends Document {
    username: string;
    email: string;
    passwordHash: string;
    nickname?: string;
    avatar?: string;
    createdAt: Date;
    updatedAt: Date;
    lastLoginAt?: Date;
    status: 'active' | 'suspended' | 'deleted';
    role: 'user' | 'admin';
    emailVerified: boolean;
    stats: {
        totalGames: number;
        wins: number;
        avgProfitRate: number;
        bestProfitRate: number;
    };
}
export declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}> & IUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=User.d.ts.map