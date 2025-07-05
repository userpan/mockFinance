"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const RoomPlayerSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
const RoomConfigSchema = new mongoose_1.Schema({
    gameDuration: {
        type: Number,
        required: true,
        min: 60000,
        max: 3600000,
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
        max: 0.1,
    },
    dataPushInterval: {
        type: Number,
        required: true,
        min: 100,
        max: 5000,
    },
}, { _id: false });
const RoomSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
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
RoomSchema.index({ status: 1 });
RoomSchema.index({ createdBy: 1 });
RoomSchema.index({ inviteCode: 1 });
RoomSchema.index({ createdAt: -1 });
RoomSchema.index({ 'players.userId': 1 });
RoomSchema.index({ gameStartAt: 1 });
exports.Room = mongoose_1.default.model('Room', RoomSchema);
//# sourceMappingURL=Room.js.map