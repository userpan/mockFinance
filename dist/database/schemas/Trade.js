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
exports.Trade = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const TradeSchema = new mongoose_1.Schema({
    tradeId: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    roomId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    buyerUsername: {
        type: String,
        required: true,
    },
    sellerId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
TradeSchema.index({ roomId: 1, tradeTime: -1 });
TradeSchema.index({ symbol: 1, tradeTime: -1 });
TradeSchema.index({ buyerId: 1, tradeTime: -1 });
TradeSchema.index({ sellerId: 1, tradeTime: -1 });
TradeSchema.index({ buyOrderId: 1 });
TradeSchema.index({ sellOrderId: 1 });
TradeSchema.index({ tradeTime: -1 });
exports.Trade = mongoose_1.default.model('Trade', TradeSchema);
//# sourceMappingURL=Trade.js.map