# 金融模拟交易游戏 - AI协助开发档案

> **文档目的**：为AI助手提供完整的项目背景和协作指导，确保能够高效协助项目开发

---

## 📋 项目核心信息

### 项目定位
**"鲸鱼交易者模拟器"** - 让每个用户都能体验成为市场大玩家的快感

### 核心洞察
- **痛点**：绝大部分用户在真实市场中无法体验大资金操作影响市场走势的感觉
- **解决方案**：通过游戏化的虚拟市场，让每个玩家都拥有足够资金影响市场价格
- **差异化**：真实的交易机制 + 游戏化体验 + AI生态系统

### 目标用户
- **主要**：对金融交易感兴趣的游戏玩家
- **次要**：想要练习交易技能的投资者  
- **潜在**：AI交易策略开发者

---

## 👨‍💻 开发者背景

### 技术能力
- **身份**：JavaScript架构师，独立开发者
- **强项**：前端开发（React），系统架构设计
- **弱项**：后端开发，数据库设计（需要AI重点协助）
- **偏好**：使用XState状态机而非传统Class架构

### 技术栈选择
- **前端**：React + WebSocket
- **后端**：Node.js + Express + Socket.io
- **状态管理**：XState状态机
- **数据库**：MongoDB + Redis + InfluxDB(可选)

### 协作需求
- **AI主要协助**：后端逻辑设计、数据库架构、API设计
- **AI次要协助**：性能优化、错误处理、监控系统
- **开发者主导**：前端开发、整体架构决策、产品设计

---

## 🏗️ 技术架构核心决策

### 为什么选择XState？
1. **复杂状态管理**：游戏有多个复杂的状态流转（房间状态、交易状态、玩家状态）
2. **可视化调试**：状态机可视化，便于理解和调试
3. **错误处理**：天然的错误状态和恢复机制
4. **扩展性**：新功能通过新增状态和事件轻松扩展
5. **开发者偏好**：相比Class更熟悉状态机模式

### 为什么拥抱AI生态？
1. **未来愿景**：AI最终将替代人类进行交易操作
2. **市场需求**：让每个用户都能拥有自己的AI交易助手
3. **技术趋势**：AI交易是金融科技的发展方向
4. **商业价值**：AI策略市场是重要的变现模式

### 数据库架构选择
```
MongoDB：主数据库
├── 用户数据、游戏记录、AI策略
├── 灵活的Schema，适合快速迭代
└── 良好的水平扩展能力

Redis：缓存和实时数据
├── 订单簿、房间状态、会话管理
├── 高性能读写
└── 消息队列功能

InfluxDB：时序数据（可选）
├── 行情数据、交易记录
└── 高性能时间序列查询
```

---

## 🎯 核心功能模块

### 1. 游戏房间系统
```javascript
// 房间状态机流程
等待玩家 → 准备开始 → 游戏进行 → 结算中 → 已结束

// 关键功能
- 6-12人房间管理
- 实时匹配系统
- 游戏时长：5/15/30分钟
- 动态AI玩家补充
```

### 2. 撮合引擎系统
```javascript
// 撮合状态机流程
空闲 → 接收订单 → 撮合处理 → 推送结果 → 空闲

// 关键功能
- 价格优先、时间优先撮合
- 支持限价单、市价单、IOC、FOK
- 真实滑点和流动性模拟
- 实时订单簿维护
```

### 3. AI生态系统
```javascript
// AI接入层级
入门级AI：系统提供的技术指标策略
进阶AI：用户自定义JavaScript策略
专业AI：独立程序通过API接入
AI市场：策略分享和交易平台

// 关键原则
- 与人类玩家使用相同API
- 无频率限制，鼓励高频交易
- 完全开放的生态系统
```

---

## 📊 数据库设计详情

### MongoDB集合结构
```javascript
// 用户集合
users: {
  _id: ObjectId,
  username: String,
  email: String,
  password_hash: String,
  stats: {
    total_games: Number,
    wins: Number,
    current_rank: String,
    total_score: Number
  },
  ai_settings: {
    enabled_strategies: [String],
    custom_scripts: [String]
  },
  created_at: Date,
  updated_at: Date
}

// 游戏房间集合
rooms: {
  _id: ObjectId,
  room_code: String,
  status: String, // 'waiting', 'starting', 'playing', 'ending'
  players: [ObjectId], // 玩家ID数组
  game_config: {
    duration: Number, // 游戏时长（分钟）
    initial_funds: Number, // 初始资金
    stocks: [String] // 交易品种
  },
  market_state: {
    current_prices: Object, // 当前价格
    total_volume: Number // 总交易量
  },
  created_at: Date,
  started_at: Date,
  ended_at: Date
}

// 交易记录集合
trades: {
  _id: ObjectId,
  room_id: ObjectId,
  player_id: ObjectId,
  stock_symbol: String,
  order_type: String, // 'limit', 'market', 'ioc', 'fok'
  side: String, // 'buy', 'sell'
  quantity: Number,
  price: Number,
  timestamp: Date,
  status: String, // 'pending', 'filled', 'cancelled'
  is_ai_trade: Boolean,
  filled_quantity: Number,
  average_price: Number
}

// AI策略集合
ai_strategies: {
  _id: ObjectId,
  user_id: ObjectId,
  strategy_name: String,
  strategy_code: String, // JavaScript代码
  strategy_type: String, // 'technical', 'fundamental', 'ml'
  performance_stats: {
    total_trades: Number,
    win_rate: Number,
    avg_return: Number,
    max_drawdown: Number
  },
  is_public: Boolean,
  price: Number, // 策略价格（如果付费）
  created_at: Date,
  updated_at: Date
}
```

### Redis数据结构
```javascript
// 实时房间状态
room:{room_id} = {
  status: 'playing',
  current_players: [player_ids],
  market_state: {
    prices: { 'STOCK_A': 100.5, 'STOCK_B': 50.2 },
    last_update: timestamp
  },
  game_start_time: timestamp,
  game_end_time: timestamp
}

// 实时订单簿
orderbook:{room_id}:{symbol} = {
  bids: [
    { price: 100.0, quantity: 1000, timestamp: timestamp, player_id: 'xxx' },
    { price: 99.5, quantity: 500, timestamp: timestamp, player_id: 'yyy' }
  ],
  asks: [
    { price: 100.5, quantity: 800, timestamp: timestamp, player_id: 'zzz' },
    { price: 101.0, quantity: 1200, timestamp: timestamp, player_id: 'aaa' }
  ]
}

// 玩家会话
session:{player_id} = {
  current_room: room_id,
  connection_id: socket_id,
  last_activity: timestamp,
  current_positions: {
    'STOCK_A': { quantity: 100, avg_price: 98.5 },
    'STOCK_B': { quantity: -50, avg_price: 52.0 }
  },
  available_cash: 950000
}

// 实时市场数据
market:{room_id}:{symbol} = {
  current_price: 100.5,
  last_trade_price: 100.3,
  volume_24h: 50000,
  price_change_24h: 2.5,
  timestamp: timestamp
}
```

---

## 🚀 开发阶段规划

### MVP版本（第1-2个月）
**目标**：验证核心概念，获得用户反馈

**核心功能**：
- 基础撮合引擎（限价单、市价单）
- 简单房间系统（6人房间）
- 基础交易界面（React前端）
- 单一交易品种（虚拟股票A）
- 基础积分系统
- 简单AI玩家（随机交易）

**技术实现**：
- Node.js + Express后端
- MongoDB用户和房间数据
- Redis订单簿和会话
- Socket.io实时通信
- XState房间和撮合状态机

### 完整版本（第3-4个月）
**目标**：完整的游戏体验，支持AI生态

**新增功能**：
- 完整撮合引擎（IOC、FOK订单）
- 多交易品种（3-5个虚拟股票）
- AI策略编辑器
- AI策略市场
- 完整游戏化系统（段位、成就）
- 管理后台
- 移动端适配

### 增强版本（第5-6个月）
**目标**：商业化准备，高级功能

**新增功能**：
- 高级交易功能（杠杆、期权）
- 社交功能（好友、聊天）
- 数据分析系统
- 性能优化
- 运营工具
- 付费功能

---

## 🤝 AI协助指导

### 重点协助领域
1. **后端架构设计**
   - XState状态机的具体实现
   - 事件驱动架构的设计
   - 错误处理和恢复机制
   - 性能优化策略

2. **数据库设计**
   - MongoDB集合结构优化
   - Redis数据结构设计
   - 数据一致性保证
   - 查询性能优化

3. **API设计**
   - RESTful API设计
   - WebSocket事件设计
   - AI接入API标准
   - 数据验证和安全

4. **撮合引擎实现**
   - 订单撮合算法
   - 订单簿数据结构
   - 实时推送机制
   - 滑点和流动性模拟

### 协作方式
- **提供具体代码示例**：而非抽象概念
- **考虑XState模式**：优先使用状态机而非Class
- **注重可扩展性**：设计要支持功能持续增长
- **数据库操作封装**：提供标准的数据库操作模式
- **错误处理完善**：每个功能都要有错误处理机制

### 避免的协助方式
- 不要提供传统的MVC架构建议
- 不要建议限制AI功能
- 不要忽略实时性要求
- 不要提供过于复杂的解决方案

---

## 🎮 游戏机制核心

### 资金配置原则
```javascript
// 每个玩家初始配置
const INITIAL_CONFIG = {
  cash: 10_000_000, // 1000万虚拟币
  positions: {
    'STOCK_A': { quantity: 1000, value: 2_000_000 },
    'STOCK_B': { quantity: 800, value: 1_600_000 },
    'STOCK_C': { quantity: 1200, value: 1_400_000 }
  },
  total_value: 15_000_000 // 总资产1500万
};

// 市场规模控制
const MARKET_CONFIG = {
  total_market_cap: players.length * 15_000_000,
  single_player_influence: 0.1, // 单个玩家最大影响10%
  liquidity_factor: 0.8 // 流动性系数
};
```

### 价格影响机制
```javascript
// 大单价格冲击模拟
const calculatePriceImpact = (orderSize, marketDepth) => {
  const impactRatio = orderSize / marketDepth;
  const priceImpact = Math.sqrt(impactRatio) * 0.01; // 1%基础影响
  return Math.min(priceImpact, 0.05); // 最大5%影响
};
```

---

## 📈 商业模式

### 变现策略
1. **AI策略市场**：策略交易佣金（5-10%）
2. **高级AI工具**：付费AI策略、回测工具
3. **数据服务**：向AI开发者提供历史数据
4. **企业服务**：金融机构AI策略测试平台
5. **教育培训**：AI交易策略开发课程

### 用户增长
- **初期**：免费游戏，积累用户基础
- **中期**：AI生态建设，吸引开发者
- **后期**：商业化功能，企业服务

---

## ⚠️ 关键注意事项

### 技术风险
- **状态机复杂度**：随着功能增长，状态机可能变得复杂
- **实时性要求**：撮合和推送的延迟要求很高
- **数据一致性**：多个数据源的一致性保证

### 产品风险
- **用户留存**：需要持续的内容更新和功能迭代
- **AI生态平衡**：确保AI不会完全主导市场
- **技术债务**：快速迭代可能积累技术债务

### 解决方案
- **模块化设计**：每个功能独立可测试
- **监控系统**：实时监控性能和错误
- **持续重构**：定期重构和优化代码

---

## 🔧 开发工具推荐

### 必需工具
- **XState Visualizer**：状态机可视化调试
- **MongoDB Compass**：数据库管理
- **Redis Commander**：Redis数据查看
- **Socket.io Client Tool**：WebSocket测试

### 推荐库
```javascript
// 后端核心库
{
  "xstate": "^4.x", // 状态机
  "socket.io": "^4.x", // WebSocket
  "mongoose": "^7.x", // MongoDB ODM
  "redis": "^4.x", // Redis客户端
  "joi": "^17.x", // 数据验证
  "winston": "^3.x" // 日志系统
}

// 前端核心库
{
  "react": "^18.x",
  "@xstate/react": "^3.x", // React状态机集成
  "socket.io-client": "^4.x",
  "recharts": "^2.x", // 图表库
  "antd": "^5.x" // UI组件库
}
```

---

**最后更新**：2024年12月  
**文档版本**：v1.0  
**维护者**：项目开发团队

---

> 💡 **给AI助手的提示**：
> 1. 优先协助后端和数据库相关问题
> 2. 提供具体的代码示例而非抽象建议
> 3. 考虑XState状态机的使用模式
> 4. 注重可扩展性和错误处理
> 5. 拥抱AI生态，不要限制AI功能
