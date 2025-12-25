# 发票助手 - 简化打包方案

## 概述

本文档提供了简化的跨平台打包方案,用于将发票助手应用打包为:
- **Windows免安装版本** (portable)
- **macOS DMG版本** (dmg)

## 快速开始

### 1. 准备图标和资源文件

#### Windows平台

将以下文件放置到`build/`目录:
- `icon.ico` - 应用程序图标(多尺寸,包含16x16到256x256)

#### macOS平台

将以下文件放置到`build/`目录:
- `icon.icns` - 应用程序图标(多尺寸,包含16x16到1024x1024)
- `dmg-background.png` - DMG背景图(540x380)
- `entitlements.mac.plist` - 权限配置文件

### 2. 打包应用

#### Windows免安装版本

```bash
# 打包Windows免安装版本
npm run build:win

# 或直接使用electron-builder
npm run dist:win
```

**输出文件**: `发票助手-1.0.0-x64.exe`

**使用方法**:
1. 双击`发票助手-1.0.0-x64.exe`直接启动应用
2. 无需安装,可以直接运行
3. 可以将exe文件复制到任何位置使用

#### macOS DMG版本

```bash
# 打包macOS DMG版本
npm run build:mac

# 或直接使用electron-builder
npm run dist:mac
```

**输出文件**: `发票助手-1.0.0-universal.dmg`

**使用方法**:
1. 双击`发票助手-1.0.0-universal.dmg`文件
2. 将应用拖拽到Applications文件夹
3. 从Launchpad启动应用

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
      "icon": "build/icon.ico",
      "artifactName": "${productName}-${version}-${arch}.${ext}"
    },
    "mac": {
      "target": ["dmg"],
      "icon": "build/icon.icns",
      "category": "public.app-category.productivity",
      "artifactName": "${productName}-${version}-${arch}.${ext}",
      "hardenedRuntime": true,
      "gatekeeperAssess": false,
      "entitlements": "build/entitlements.mac.plist",
      "entitlementsInherit": "build/entitlements.mac.plist"
    },
    "dmg": {
      "title": "${productName} ${version}",
      "background": "build/dmg-background.png",
      "icon": "build/icon.icns",
      "iconSize": 100,
      "contents": [
        {
          "x": 130,
          "y": 220
        },
        {
          "x": 410,
          "y": 220,
          "type": "link",
          "path": "/Applications"
        }
      ],
      "window": {
        "width": 540,
        "height": 380
      },
      "format": "UDZO"
    }
  }
}
```

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
npm run version:patch   # 递增修订号 (1.0.0 -> 1.0.1)
npm run version:minor   # 递增次版本号 (1.0.0 -> 1.1.0)
npm run version:major   # 递增主版本号 (1.0.0 -> 2.0.0)
npm run version:alpha   # 创建alpha预发布版本 (1.0.0 -> 1.0.1-alpha.0)
npm run version:beta    # 创建beta预发布版本 (1.0.0 -> 1.0.1-beta.0)
npm run version:rc      # 创建rc预发布版本 (1.0.0 -> 1.0.1-rc.0)
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
│   └── BUILD_GUIDE.md              # 打包指南
├── scripts/                        # 打包脚本
│   ├── check-build.js             # 打包前检查
│   ├── build-windows.js           # Windows打包脚本
│   ├── build-mac.js               # macOS打包脚本
│   └── version.js                 # 版本号管理脚本
├── dist/                           # 打包输出目录
│   ├── 发票助手-1.0.0-x64.exe     # Windows免安装版本
│   └── 发票助手-1.0.0-universal.dmg # macOS DMG版本
├── electron.cjs                    # Electron主进程文件
└── package.json                    # 项目配置文件
```

## 图标准备

### Windows图标 (icon.ico)

使用以下工具生成ICO文件:

#### 方法1: 使用electron-icon-builder

```bash
npm install --save-dev electron-icon-builder
npx electron-icon-builder --input=./public/icon.png --output=./build
```

#### 方法2: 使用在线工具

访问 https://icoconvert.com/:
1. 上传PNG图片(建议1024x1024)
2. 选择所有尺寸(16x16, 32x32, 48x48, 64x64, 128x128, 256x256)
3. 下载ICO文件
4. 重命名为`icon.ico`并放到`build/`目录

### macOS图标 (icon.icns)

使用以下工具生成ICNS文件:

#### 方法1: 使用iconutil

```bash
# 创建iconset目录
mkdir MyIcon.iconset

# 生成不同尺寸的图标
sips -z 16 16     icon.png --out MyIcon.iconset/icon_16x16.png
sips -z 32 32     icon.png --out MyIcon.iconset/icon_16x16@2x.png
sips -z 32 32     icon.png --out MyIcon.iconset/icon_32x32.png
sips -z 64 64     icon.png --out MyIcon.iconset/icon_32x32@2x.png
sips -z 128 128   icon.png --out MyIcon.iconset/icon_128x128.png
sips -z 256 256   icon.png --out MyIcon.iconset/icon_128x128@2x.png
sips -z 256 256   icon.png --out MyIcon.iconset/icon_256x256.png
sips -z 512 512   icon.png --out MyIcon.iconset/icon_256x256@2x.png
sips -z 512 512   icon.png --out MyIcon.iconset/icon_512x512.png
sips -z 1024 1024 icon.png --out MyIcon.iconset/icon_512x512@2x.png

# 转换为ICNS
iconutil -c icns MyIcon.iconset

# 移动到build目录
mv MyIcon.icns build/icon.icns
```

#### 方法2: 使用在线工具

访问 https://cloudconvert.com/png-to-icns:
1. 上传PNG图片(建议1024x1024)
2. 下载ICNS文件
3. 重命名为`icon.icns`并放到`build/`目录

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

# 2. 提交代码
git add .
git commit -m "chore(release): 1.0.1"

# 3. 创建标签
git tag -a v1.0.1 -m "Release version 1.0.1"

# 4. 推送到远程
git push origin main
git push origin v1.0.1

# 5. 打包发布
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

### 4. macOS应用无法打开

```bash
# 移除隔离属性
xattr -cr /Applications/发票助手.app

# 或临时禁用Gatekeeper
sudo spctl --master-disable
# 运行应用后重新启用
sudo spctl --master-enable
```

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
- 验证应用启动和功能
- 测试应用核心功能
- 检查性能和资源占用

## 系统要求

### 开发环境

- Node.js 18.x或更高版本
- npm 9.x或更高版本
- Git

### Windows平台

- Windows 10或更高版本 (x64)
- Visual C++ Redistributable
- (可选) 代码签名证书

### macOS平台

- macOS 10.15 (Catalina)或更高版本
- Xcode Command Line Tools
- (可选) Apple Developer账号和证书

## 支持的平台

### Windows

- Windows 10 (x64)
- Windows 11 (x64)

### macOS

- macOS 10.15 (Catalina) (universal)
- macOS 11 (Big Sur) (universal)
- macOS 12 (Monterey) (universal)
- macOS 13 (Ventura) (universal)
- macOS 14 (Sonoma) (universal)

## 输出文件

### Windows平台

- `发票助手-1.0.0-x64.exe` - 免安装版本

**特点**:
- 无需安装,双击即可运行
- 可以复制到任何位置使用
- 不写入注册表
- 卸载时直接删除文件即可

### macOS平台

- `发票助手-1.0.0-universal.dmg` - DMG安装包

**特点**:
- 通用二进制文件,支持Intel和Apple Silicon
- 拖拽安装,简单快捷
- 自动创建应用快捷方式
- 符合macOS应用规范

## 安全建议

### 1. 代码签名

- Windows: 使用代码签名证书签名exe文件
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
