# GitHub Actions 自动构建 Mac DMG

## 概述

本项目使用 GitHub Actions 自动化构建 macOS DMG 安装包。由于 macOS 应用只能在 macOS 系统上构建，我们使用 GitHub 提供的 macOS 运行环境来完成构建。

## 工作流配置

工作流文件位置：`.github/workflows/build-mac.yml`

### 触发条件

工作流会在以下情况下自动触发：

1. **代码推送到主分支**
   - 推送到 `main` 或 `master` 分支时自动触发

2. **创建版本标签**
   - 推送以 `v` 开头的标签时触发（如 `v1.0.0`）
   - 标签推送时会自动创建 GitHub Release 并上传 DMG 文件

3. **Pull Request**
   - 向 `main` 或 `master` 分支提交 PR 时触发

4. **手动触发**
   - 可以在 GitHub Actions 页面手动触发构建

### 构建步骤

1. 检出代码
2. 设置 Node.js 环境（版本 20）
3. 安装项目依赖
4. 构建应用（`npm run build`）
5. 构建 Mac DMG（`npm run dist:mac`）
6. 上传构建产物到 GitHub Actions Artifacts
7. 如果是标签推送，自动创建 Release

## 使用方法

### 方法一：自动触发（推荐）

1. 将代码推送到 GitHub 仓库
2. 工作流会自动触发构建
3. 构建完成后，在 Actions 页面下载 DMG 文件

```bash
# 推送代码触发构建
git add .
git commit -m "update code"
git push origin main
```

### 方法二：标签推送（发布版本）

```bash
# 创建并推送标签
git tag v1.0.0
git push origin v1.0.0
```

标签推送会：
- 触发构建
- 自动创建 GitHub Release
- 将 DMG 文件上传到 Release

### 方法三：手动触发

1. 进入 GitHub 仓库
2. 点击 "Actions" 标签
3. 选择 "Build Mac DMG" 工作流
4. 点击 "Run workflow" 按钮

## 代码签名（可选）

如果要发布到 Mac App Store 或进行分发，需要配置代码签名。

### 配置步骤

1. 在 Apple Developer 获取开发者证书
2. 导出证书为 `.p12` 文件
3. 将证书转换为 Base64 编码：
   ```bash
   base64 -i certificate.p12 | pbcopy
   ```

4. 在 GitHub 仓库设置中添加 Secrets：
   - `CSC_LINK`: 证书的 Base64 编码内容
   - `CSC_KEY_PASSWORD`: 证书密码

### 添加 Secrets

1. 进入 GitHub 仓库设置
2. 点击 "Secrets and variables" -> "Actions"
3. 点击 "New repository secret"
4. 添加以下 secrets：
   - Name: `CSC_LINK`, Value: 证书的 Base64 编码
   - Name: `CSC_KEY_PASSWORD`, Value: 证书密码

## 下载构建产物

### 从 Actions Artifacts 下载

1. 进入 GitHub 仓库
2. 点击 "Actions" 标签
3. 选择对应的工作流运行记录
4. 在 "Artifacts" 部分下载 `mac-dmg` 文件

### 从 Release 下载（仅标签推送）

1. 进入 GitHub 仓库
2. 点击 "Releases" 标签
3. 选择对应的版本
4. 下载 DMG 文件

## 构建产物

构建成功后，会生成以下文件：

- `发票助手-{version}-universal.dmg` - Mac DMG 安装包

## 常见问题

### 1. 构建失败：依赖安装错误

确保 `package.json` 中的依赖版本正确，并且 `package-lock.json` 已提交到仓库。

### 2. 构建失败：构建脚本错误

检查 `scripts/build-mac.cjs` 文件是否存在且可执行。

### 3. DMG 文件无法安装

确保配置了正确的代码签名证书，或者修改 `package.json` 中的 macOS 配置以禁用签名要求。

### 4. 如何查看构建日志

1. 进入 GitHub 仓库
2. 点击 "Actions" 标签
3. 点击对应的工作流运行记录
4. 点击具体的 job 查看详细日志

## 本地测试

在本地测试构建脚本（需要在 macOS 上）：

```bash
# 安装依赖
npm install

# 构建
npm run build

# 构建 DMG
npm run dist:mac
```

## Windows 本地构建

Windows 版本可以直接在本地构建：

```bash
# 构建 Windows 免安装版本
npm run dist:win
```

构建产物位于 `dist/` 目录。

## 相关文档

- [Electron Builder 文档](https://www.electron.build/)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [macOS 代码签名指南](https://developer.apple.com/support/code-signing/)
