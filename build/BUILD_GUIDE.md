# 发票助手 - 跨平台打包方案

## 概述

本文档提供了完整的跨平台打包方案,用于将发票助手应用打包为Windows免安装版本和macOS DMG版本。方案涵盖了打包工具选择、配置参数、资源文件准备、版本管理、打包脚本和常见问题解决方案。

## 快速开始

### 1. 准备工作

#### Windows平台

```bash
# 安装Node.js (18.x或更高版本)
# 下载地址: https://nodejs.org/

# 安装依赖
npm install

# 检查项目配置
npm run check
```

#### macOS平台

```bash
# 安装Node.js (18.x或更高版本)
# 下载地址: https://nodejs.org/

# 安装Xcode Command Line Tools
xcode-select --install

# 安装依赖
npm install

# 检查项目配置
npm run check
```

### 2. 准备图标和资源文件

#### Windows平台

将以下文件放置到`build/`目录:

- `icon.ico` - 应用程序图标(多尺寸)

#### macOS平台

将以下文件放置到`build/`目录:

- `icon.icns` - 应用程序图标(多尺寸)
- `dmg-background.png` - DMG背景图(540x380)
- `entitlements.mac.plist` - 权限配置文件
- `license.txt` - 许可证文件

### 3. 打包应用

#### Windows平台

```bash
# 打包Windows免安装版本
npm run build:win

# 或直接使用electron-builder
npm run dist:win
```

#### macOS平台

```bash
# 打包macOS DMG版本
npm run build:mac

# 或直接使用electron-builder
npm run dist:mac
```

### 4. 验证安装包

#### Windows平台

1. 双击`发票助手-1.0.0-x64.exe`免安装程序
2. 应用直接启动,无需安装
3. 验证功能正常

#### macOS平台

1. 双击`发票助手-1.0.0-universal.dmg`文件
2. 将应用拖拽到Applications文件夹
3. 从Launchpad启动应用,验证功能

## 详细文档

### 1. 打包工具选择

详见: [BUILD_TOOL_SELECTION.md](./build/BUILD_TOOL_SELECTION.md)

### 2. 配置参数说明

详见: package.json中的build配置

### 3. 图标和资源文件准备

详见: [ICON_PREPARATION_GUIDE.md](./build/ICON_PREPARATION_GUIDE.md)

### 4. 版本号管理策略

详见: [VERSION_MANAGEMENT.md](./build/VERSION_MANAGEMENT.md)

### 5. 打包脚本和规范

详见: [BUILD_SCRIPTS_AND_STANDARDS.md](./build/BUILD_SCRIPTS_AND_STANDARDS.md)

### 6. 常见问题解决方案

详见: [TROUBLESHOOTING.md](./build/TROUBLESHOOTING.md)

## 可用脚本

### 开发脚本

```bash
npm run dev          # 启动开发模式
npm run lint         # 运行代码检查
npm run build        # 构建前端资源
```

### 打包脚本

```bash
npm run check        # 检查项目配置
npm run build:win    # 打包Windows免安装版本
npm run build:mac    # 打包macOS DMG版本
```

### 版本管理脚本

```bash
npm run version:show    # 显示当前版本号
npm run version:patch   # 递增修订号
npm run version:minor   # 递增次版本号
npm run version:major   # 递增主版本号
npm run version:alpha   # 创建alpha预发布版本
npm run version:beta    # 创建beta预发布版本
npm run version:rc      # 创建rc预发布版本
```

### 直接打包命令

```bash
npm run dist           # 打包当前平台
npm run dist:win       # 打包Windows免安装版本
npm run dist:mac       # 打包macOS DMG版本
```

## 项目结构

```
invoice-assistant/
├── build/                          # 打包资源文件
│   ├── icon.ico                    # Windows图标
│   ├── icon.icns                   # macOS图标
│   ├── dmg-background.png          # DMG背景图
│   ├── entitlements.mac.plist      # macOS权限配置
│   ├── license.txt                 # 许可证文件
│   ├── ICON_PREPARATION_GUIDE.md   # 图标准备指南
│   ├── VERSION_MANAGEMENT.md       # 版本管理策略
│   ├── BUILD_SCRIPTS_AND_STANDARDS.md # 打包脚本和规范
│   ├── TROUBLESHOOTING.md          # 常见问题解决方案
│   └── BUILD_GUIDE.md              # 打包指南
├── scripts/                        # 打包脚本
│   ├── check-build.js             # 打包前检查
│   ├── build-windows.js           # Windows打包脚本
│   ├── build-mac.js               # macOS打包脚本
│   └── version.js                 # 版本号管理脚本
├── dist/                           # 打包输出目录
├── electron.cjs                    # Electron主进程文件
├── package.json                    # 项目配置文件
└── README.md                       # 项目说明文档
```

## 配置说明

### package.json关键配置

```json
{
  "name": "invoice-assistant",
  "version": "1.0.0",
  "main": "electron.cjs",
  "build": {
    "appId": "com.invoiceassistant.app",
    "productName": "发票助手",
    "directories": {
      "output": "dist",
      "buildResources": "build"
    },
    "win": {
      "target": ["portable"],
      "icon": "build/icon.ico"
    },
    "mac": {
      "target": ["dmg"],
      "icon": "build/icon.icns",
      "category": "public.app-category.productivity"
    }
  }
}
```

## 版本号管理

### 语义化版本控制

采用语义化版本控制 (Semantic Versioning 2.0.0) 规范:

```
主版本号.次版本号.修订号 (MAJOR.MINOR.PATCH)
```

- **MAJOR**: 不兼容的API修改
- **MINOR**: 向下兼容的功能新增
- **PATCH**: 向下兼容的问题修复

### 版本号更新流程

```bash
# 1. 更新版本号
npm run version:patch  # 或 minor/major

# 2. 更新CHANGELOG.md
# 手动编辑CHANGELOG.md

# 3. 提交代码
git add .
git commit -m "chore(release): 1.0.1"

# 4. 创建标签
git tag -a v1.0.1 -m "Release version 1.0.1"

# 5. 推送到远程
git push origin main
git push origin v1.0.1

# 6. 打包发布
npm run build:win  # Windows
npm run build:mac  # macOS
```

## 常见问题

### 1. 打包失败

```bash
# 清理缓存后重试
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
npm run build:win
```

### 2. 图标不显示

```bash
# 使用electron-icon-builder重新生成图标
npm install --save-dev electron-icon-builder
npx electron-icon-builder --input=./public/icon.png --output=./build
```

### 3. 应用无法启动

```bash
# 检查日志文件
# Windows: %APPDATA%\invoice-assistant\logs
# macOS: ~/Library/Logs/invoice-assistant
```

更多问题解决方案,请参考: [TROUBLESHOOTING.md](./build/TROUBLESHOOTING.md)

## 最佳实践

### 1. 打包前检查

```bash
# 运行检查脚本
npm run check

# 运行代码检查
npm run lint

# 运行测试(如果有)
npm test
```

### 2. 版本管理

- 使用语义化版本控制
- 每次发布前更新CHANGELOG
- 使用Git标签标记发布版本
- 保持版本号与发布说明一致

### 3. 资源管理

- 使用高分辨率图标
- 确保所有平台图标尺寸正确
- 定期更新许可证文件
- 保持资源文件组织清晰

### 4. 测试验证

- 在多个系统版本上测试
- 验证安装和卸载流程
- 测试应用核心功能
- 检查性能和资源占用

## CI/CD集成

### GitHub Actions示例

```yaml
name: Build and Release

on:
  push:
    tags:
      - 'v*'

jobs:
  build-windows:
    runs-on: windows-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build:win
      - uses: actions/upload-artifact@v3
        with:
          name: windows-build
          path: dist/*.exe

  build-mac:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build:mac
      - uses: actions/upload-artifact@v3
        with:
          name: mac-build
          path: dist/*.dmg
```

## 系统要求

### 开发环境

- Node.js 18.x或更高版本
- npm 9.x或更高版本
- Git

### Windows平台

- Windows 10或更高版本
- Visual C++ Redistributable
- (可选) 代码签名证书

### macOS平台

- macOS 10.15 (Catalina)或更高版本
- Xcode Command Line Tools
- (可选) Apple Developer账号和证书

## 支持的平台

### Windows

- Windows 10 (x64, ia32)
- Windows 11 (x64, ia32)

### macOS

- macOS 10.15 (Catalina) (x64, arm64, universal)
- macOS 11 (Big Sur) (x64, arm64, universal)
- macOS 12 (Monterey) (x64, arm64, universal)
- macOS 13 (Ventura) (x64, arm64, universal)
- macOS 14 (Sonoma) (x64, arm64, universal)

## 输出文件

### Windows平台

- `发票助手-1.0.0-x64.exe` - 免安装版本

### macOS平台

- `发票助手-1.0.0-universal.dmg` - DMG安装包

## 安全建议

### 1. 代码签名

- Windows: 使用代码签名证书签名安装程序
- macOS: 使用Apple Developer证书签名应用

### 2. 安全扫描

- 使用病毒扫描工具检查安装包
- 使用安全审计工具检查依赖
- 定期更新依赖版本

### 3. 隐私保护

- 不收集用户敏感信息
- 使用HTTPS进行网络通信
- 遵守相关隐私法规

## 许可证

本项目采用MIT许可证。详见: [LICENSE](./LICENSE)

## 联系方式

如有问题或建议,请联系项目维护者。

## 更新日志

详见: [CHANGELOG.md](./CHANGELOG.md)

## 致谢

感谢所有为本项目做出贡献的开发者。
