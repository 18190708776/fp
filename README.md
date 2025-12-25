# 发票助手 (Invoice Assistant)

基于 Electron 构建的跨平台桌面应用，直接访问全国增值税发票查验平台。

## 功能特性

- 🖥️ 跨平台支持（Windows、Mac）
- 📱 直接访问全国增值税发票查验平台
- 🚀 快速启动和响应
- 🔒 安全的桌面应用环境

## 技术栈

- **桌面框架**: Electron
- **打包工具**: Electron Builder

## 开发环境要求

- Node.js 18+
- npm 或 yarn

## 安装依赖

```bash
npm install
```

## 开发模式运行

```bash
npm run dev
```

这将启动 Electron 应用窗口。

## 打包应用

### Windows
```bash
npm run build
```

将生成 `.exe` 安装包和便携版到 `dist` 目录。

### Mac
```bash
npm run build
```

将生成 `.dmg` 和 `.zip` 安装包到 `dist` 目录。

## 项目结构

```
invoice-assistant/
├── electron.js          # Electron 主进程
├── package.json         # 项目配置
├── .npmrc              # npm 镜像配置
├── public/              # 静态资源
└── dist/                # 打包输出目录
```

## 配置说明

### Electron 主进程配置

主进程配置位于 `electron.js`，包括：
- 窗口大小设置（1280x800）
- 直接加载发票查验平台 URL
- 安全性配置
- 开发模式 DevTools

### 打包配置

打包配置位于 `package.json` 的 `build` 字段，包括：
- Windows NSIS 安装包配置
- Mac DMG 安装包配置
- 应用图标和元数据

## 注意事项

1. **图标文件**: 如需自定义应用图标，请在 `build` 目录下准备以下图标文件：
   - `icon.ico` (Windows)
   - `icon.icns` (Mac)

2. **网络访问**: 应用需要访问 `https://inv-veri.chinatax.gov.cn/`，请确保网络连接正常。

3. **开发模式**: 开发时会自动打开 DevTools，方便调试。

4. **为什么直接加载 URL**: 发票查验平台有反爬虫机制，不允许通过 iframe 嵌入，因此直接在 Electron 窗口中加载。

## 许可证

MIT License
