# MockFinance GitHub操作指南

> 针对公司GitLab代理环境下的GitHub操作指南

---

## 📋 1. 环境概述

### 1.1 当前环境
- **项目**: MockFinance Exchange (金融交易模拟系统)
- **公司GitLab**: 192.168.175.208
- **用户邮箱**: panziwei@chinasie.com
- **代理配置**: `http.noproxy=192.168.175.208`

### 1.2 问题背景
公司GitLab代理配置会干扰GitHub访问，需要临时调整配置以正常推送到GitHub。

---

## ⚡ 2. 快速操作指南

### 2.1 标准推送流程

```powershell
# 1. 检查当前状态
git status
git config --get http.noproxy

# 2. 备份当前配置
echo "当前配置: $(git config --get http.noproxy)"

# 3. 临时移除代理配置
git config --global --unset http.noproxy

# 4. 推送到GitHub
git push origin main

# 5. 恢复公司配置
git config --global http.noproxy 192.168.175.208

# 6. 验证恢复
git config --get http.noproxy
```

### 2.2 一键式操作

```powershell
# 完整操作（复制粘贴即可）
git config --global --unset http.noproxy; git push origin main; git config --global http.noproxy 192.168.175.208
```

---

## 🔍 3. 配置检查命令

### 3.1 快速检查

```powershell
# 检查Git配置
Write-Host "Git版本: $(git --version)" -ForegroundColor Green
Write-Host "用户名: $(git config --get user.name)" -ForegroundColor Cyan
Write-Host "邮箱: $(git config --get user.email)" -ForegroundColor Cyan
Write-Host "代理配置: $(git config --get http.noproxy)" -ForegroundColor Yellow

# 检查仓库状态
Write-Host "`n仓库状态:" -ForegroundColor Yellow
git status --short
Write-Host "当前分支: $(git branch --show-current)" -ForegroundColor Cyan

# 检查远程仓库
Write-Host "`n远程仓库:" -ForegroundColor Yellow
git remote -v
```

### 3.2 网络连接测试

```powershell
# 测试GitHub连接
ping github.com -n 4
Test-NetConnection github.com -Port 443

# 测试Git连接
git ls-remote origin
```

---

## 📊 4. 操作流程图

```
开始
  ↓
检查当前Git配置
  ↓
备份 http.noproxy 配置
  ↓
临时移除 http.noproxy
  ↓
执行 git push origin main
  ↓
恢复 http.noproxy 配置
  ↓
验证配置恢复
  ↓
完成
```

---

## ⚠️ 5. 重要注意事项

### 5.1 安全原则
1. **始终备份**: 修改配置前记录原始值
2. **及时恢复**: 完成GitHub操作后立即恢复公司配置
3. **验证恢复**: 确认配置恢复正确

### 5.2 操作检查清单

**操作前**:
- [ ] 本地代码已提交 (`git status`)
- [ ] 备份当前配置 (`git config --get http.noproxy`)
- [ ] 确认远程仓库地址 (`git remote -v`)

**操作后**:
- [ ] 验证推送成功 (`git log --oneline -5`)
- [ ] 确认配置恢复 (`git config --get http.noproxy`)
- [ ] 测试GitHub连接 (`git ls-remote origin`)

### 5.3 故障排除

**问题1: 推送失败 - 认证错误**
```powershell
# 检查认证方式
git config --get credential.helper

# 使用SSH方式（如果已配置）
git remote set-url origin git@github.com:username/mockFinance.git
```

**问题2: 配置恢复失败**
```powershell
# 强制恢复公司配置
git config --global --unset-all http.noproxy
git config --global http.noproxy 192.168.175.208
```

**问题3: 网络连接间歇性失败**
```powershell
# 重试推送
for ($i = 1; $i -le 3; $i++) {
    Write-Host "尝试推送 (第 $i 次)..."
    git push origin main
    if ($LASTEXITCODE -eq 0) { break }
    Start-Sleep 5
}
```

---

## 🔄 6. 紧急恢复程序

如果出现任何问题，立即执行以下命令恢复公司标准配置：

```powershell
# 完全恢复公司配置
git config --global http.noproxy 192.168.175.208
git config --global user.email panziwei@chinasie.com
git config --global user.name "潘子炜"

# 验证配置
git config --list | Select-String "user|http"

# 测试公司GitLab连接（在公司网络环境下）
# ping 192.168.175.208
```

---

## 📝 7. 操作记录模板

```
=== GitHub操作记录 ===
操作时间: 2024-12-XX XX:XX:XX
操作人员: 潘子炜
项目名称: MockFinance Exchange

配置修改:
- 修改前 http.noproxy: 192.168.175.208
- 修改后 http.noproxy: (已移除)

推送内容:
- 分支: main
- 提交数量: [数量]
- 最新提交: [commit hash]

恢复操作:
- 恢复 http.noproxy: 192.168.175.208
- 验证状态: 正常

操作结果: 成功
备注: [任何特殊情况]
```

---

## 🛠️ 8. 常用命令速查

### 8.1 配置管理

```powershell
# 查看当前配置
git config --get http.noproxy                    # 查看代理配置
git config --get user.name                       # 查看用户名
git config --get user.email                      # 查看邮箱

# 配置修改
git config --global http.noproxy 192.168.175.208 # 恢复公司配置
git config --global --unset http.noproxy         # 移除代理配置
git config --global user.name "潘子炜"           # 设置用户名
git config --global user.email panziwei@chinasie.com # 设置邮箱
```

### 8.2 状态检查

```powershell
git status                                        # 检查工作区状态
git status --short                                # 简洁状态显示
git remote -v                                     # 查看远程仓库
git branch                                        # 查看本地分支
git branch -r                                     # 查看远程分支
git log --oneline -5                              # 查看最近5次提交
```

### 8.3 GitHub操作

```powershell
git push origin main                              # 推送到main分支
git push origin develop                           # 推送到develop分支
git push --all origin                             # 推送所有分支
git push --tags origin                            # 推送标签
git pull origin main                              # 拉取最新代码
```

### 8.4 网络测试

```powershell
ping github.com                                   # 测试GitHub连接
Test-NetConnection github.com -Port 443           # PowerShell网络测试
git ls-remote origin                              # 测试Git远程连接
curl -I https://github.com                        # 测试HTTPS连接
```

---

## 📌 9. 常见操作场景

### 9.1 首次推送新项目

```powershell
# 添加远程仓库
git remote add origin https://github.com/username/mockFinance.git

# 推送所有内容
git config --global --unset http.noproxy
git push -u origin main
git config --global http.noproxy 192.168.175.208
```

### 9.2 日常代码推送

```powershell
# 提交更改
git add .
git commit -m "feat: 添加新功能"

# 推送到GitHub
git config --global --unset http.noproxy
git push origin main
git config --global http.noproxy 192.168.175.208
```

### 9.3 分支操作

```powershell
# 创建并推送新分支
git checkout -b feature/new-feature
git add .
git commit -m "feat: 新分支功能"

# 推送新分支
git config --global --unset http.noproxy
git push -u origin feature/new-feature
git config --global http.noproxy 192.168.175.208
```

---

**文档版本**: v2.0 (简化版)  
**最后更新**: 2024年12月  
**下次检查**: 2025年1月  

---

> 💡 **重要提醒**:
> 1. 每次操作前都要备份当前配置
> 2. 完成GitHub操作后立即恢复公司配置
> 3. 如有疑问，优先恢复到公司标准配置
> 4. 使用Git原生命令，简单可靠
> 5. 保持操作记录，便于问题追踪 