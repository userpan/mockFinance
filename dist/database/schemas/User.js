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
exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 20,
        match: /^[a-zA-Z0-9_]+$/,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    passwordHash: {
        type: String,
        required: true,
        minlength: 60,
    },
    nickname: {
        type: String,
        trim: true,
        maxlength: 30,
    },
    avatar: {
        type: String,
        trim: true,
    },
    lastLoginAt: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['active', 'suspended', 'deleted'],
        default: 'active',
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    emailVerified: {
        type: Boolean,
        default: false,
    },
    stats: {
        totalGames: { type: Number, default: 0 },
        wins: { type: Number, default: 0 },
        avgProfitRate: { type: Number, default: 0 },
        bestProfitRate: { type: Number, default: 0 },
    },
}, {
    timestamps: true,
    collection: 'users',
});
UserSchema.index({ email: 1 });
UserSchema.index({ username: 1 });
UserSchema.index({ status: 1 });
UserSchema.index({ createdAt: -1 });
UserSchema.index({ 'stats.avgProfitRate': -1 });
exports.User = mongoose_1.default.model('User', UserSchema);
//# sourceMappingURL=User.js.map