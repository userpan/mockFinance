# 金融模拟交易所系统 (MockFinance Exchange)

为金融模拟交易游戏提供核心撮合和交易服务的后端系统。

## 项目概述

金融模拟交易所系统是一个高性能的交易撮合引擎，专为金融模拟交易游戏设计。系统支持实时交易撮合、房间管理、用户认证、资产管理和市场数据推送等核心功能。

### 核心特性

- 🏢 **真实交易体验**: 提供接近真实交易所的撮合逻辑和市场机制
- ⚡ **高性能**: 支持实时撮合和数据推送
- 🔄 **高扩展性**: 支持从2人到1000+人的房间规模扩展
- 🛠️ **规则灵活**: 通过过滤器架构支持复杂交易规则的持续扩展
- 🎮 **游戏化**: 专为金融模拟游戏设计的对局机制

## 技术栈

- **后端框架**: Node.js + Express + TypeScript
- **状态管理**: XState 状态机
- **数据库**: MongoDB + Redis
- **实时通信**: Socket.io WebSocket
- **认证**: JWT
- **安全**: Helmet + CORS + bcrypt

## 项目结构

```
mockFinance/
├── package.json                 # 项目依赖和脚本配置
├── tsconfig.json               # TypeScript配置
├── README.md                   # 项目说明文档
├── env/                        # 环境变量配置目录
│   ├── env.dev                 # 开发环境变量
│   ├── env.prod                # 生产环境变量
│   └── env.example             # 环境变量示例文件
├── src/                        # 源代码目录
│   ├── app.ts                  # Express应用入口
│   ├── server.ts               # 服务器启动文件
│   ├── config/                 # 配置管理
│   ├── database/               # 数据库相关
│   ├── middleware/             # 全局中间件
│   ├── common/                 # 公共组件
│   │   ├── types/              # 类型定义
│   │   ├── utils/              # 工具函数
│   │   ├── constants/          # 常量定义
│   │   └── validators/         # 数据验证
│   ├── features/               # 业务功能模块
│   │   ├── auth/               # 用户认证模块
│   │   ├── rooms/              # 房间管理模块
│   │   ├── trading/            # 交易系统模块
│   │   ├── assets/             # 资产管理模块
│   │   └── market/             # 市场数据模块
│   └── routes/                 # 路由配置
├── tests/                      # 测试文件
├── logs/                       # 日志文件
└── dist/                       # 编译输出
```

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- MongoDB >= 5.0
- Redis >= 6.0 (可选)

### 安装依赖

```bash
npm install
```

### 环境配置

1. 复制环境变量示例文件：
```bash
cp env/env.example env/env.dev
```

2. 编辑 `env/env.dev` 文件，配置数据库连接等信息

### 启动开发服务器

```bash
npm run dev
```

### 构建项目

```bash
npm run build
```

### 启动生产服务器

```bash
npm start
```

## API 文档

### 健康检查

```
GET /health
```

返回服务器状态信息。

## 开发指南

### 项目架构

本项目采用模块化架构，按业务功能组织代码：

- **features/**: 各个业务模块，每个模块包含完整的MVC结构和XState状态机
- **common/**: 跨模块共享的工具和类型定义
- **database/**: 数据库连接和模式定义
- **middleware/**: 全局中间件

### 状态管理

使用XState状态机管理复杂的业务流程，每个业务模块都有自己的状态机定义。

### 环境变量

所有环境变量统一放在 `env/` 目录中，支持不同环境的配置文件。

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 联系方式

如有问题或建议，请通过以下方式联系：

- 项目地址: [GitHub Repository](https://github.com/your-username/mockfinance-exchange)
- 问题反馈: [GitHub Issues](https://github.com/your-username/mockfinance-exchange/issues) 