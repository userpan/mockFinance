export interface EnvironmentConfig {
    nodeEnv: string;
    port: number;
    apiPrefix: string;
    mongodbUri: string;
    mongodbTestUri: string | undefined;
    jwtSecret: string;
    jwtExpire: string;
    redisHost: string;
    redisPort: number;
    redisPassword: string | undefined;
    websocketPort: number;
    logLevel: string;
    logFile: string;
    defaultGameDuration: number;
    defaultFeeRate: number;
    maxPlayersPerRoom: number;
    dataPushInterval: number;
    bcryptRounds: number;
    rateLimitWindow: number;
    rateLimitMax: number;
    corsOrigins: string[];
}
export type NodeEnv = 'development' | 'production' | 'test';
export type LogLevel = 'error' | 'warn' | 'info' | 'debug';
//# sourceMappingURL=index.d.ts.map