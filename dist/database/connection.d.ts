import mongoose from 'mongoose';
export declare const connectDatabase: () => Promise<void>;
export declare const disconnectDatabase: () => Promise<void>;
export declare const isDatabaseConnected: () => boolean;
export declare const getConnection: () => mongoose.Connection;
//# sourceMappingURL=connection.d.ts.map