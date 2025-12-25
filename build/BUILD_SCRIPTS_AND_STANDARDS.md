# 打包脚本和规范

## 一、打包脚本说明

### 1. 检查脚本 (check-build.js)

**用途**: 打包前检查项目配置和资源文件

**使用方法**:
```bash
npm run check
```

**检查项目**:
- package.json配置完整性
- build目录存在性
- Windows资源文件(图标、安装程序图片等)
- macOS资源文件(图标、DMG背景图、权限配置等)
- 源文件完整性
- 依赖安装状态
- Git工作目录状态

**输出示例**:
```
========================================
发票助手 - 打包前检查脚本
========================================

1. 检查package.json配置...
✓ 版本号已设置
✓ 应用ID已设置
✓ 产品名称已设置
✓ 主入口文件已设置

2. 检查build目录...
✓ build目录存在

3. 检查Windows资源文件...
⚠ Windows图标文件存在
⚠ 安装程序图标存在
⚠ 安装程序头部图片存在
⚠ 安装程序侧边栏图片存在

4. 检查macOS资源文件...
⚠ macOS图标文件存在
⚠ DMG背景图存在
✓ macOS权限配置文件存在

5. 检查其他资源文件...
✓ 许可证文件存在
✓ NSIS安装脚本存在

6. 检查源文件...
✓ Electron主进程文件存在
✓ package.json文件存在

7. 检查依赖...
✓ 依赖已安装

8. 检查Git状态...
✓ 工作目录干净

========================================
检查完成,但存在警告。可以继续打包,但建议修复警告。
========================================
```

### 2. Windows打包脚本 (build-windows.js)

**用途**: 专门用于Windows平台的打包

**使用方法**:
```bash
npm run build:win
```

**执行流程**:
1. 显示版本信息和产品名称
2. 清理旧的构建文件
3. 构建前端资源(如果存在)
4. 执行electron-builder打包
5. 显示打包结果和文件大小

**输出示例**:
```
========================================
发票助手 - Windows平台打包脚本
========================================

版本: 1.0.0
产品名称: 发票助手

开始清理旧的构建文件...
✓ 清理完成

开始构建前端资源...
✓ 前端构建完成

开始打包Windows应用程序...
✓ Windows打包完成

========================================
打包成功!
========================================
输出目录: d:\ai\fp-ai_test\invoice-assistant\dist
版本: 1.0.0

生成的文件:
  - 发票助手 Setup 1.0.0.exe (85.23 MB)
  - 发票助手 Setup 1.0.0.exe.blockmap (256 KB)
  - 发票助手 1.0.0.exe (78.45 MB)
```

### 3. macOS打包脚本 (build-mac.js)

**用途**: 专门用于macOS平台的打包

**使用方法**:
```bash
npm run build:mac
```

**执行流程**:
1. 显示版本信息和产品名称
2. 检查当前操作系统
3. 清理旧的构建文件
4. 构建前端资源(如果存在)
5. 执行electron-builder打包
6. 显示打包结果和文件大小

**输出示例**:
```
========================================
发票助手 - macOS平台打包脚本
========================================

版本: 1.0.0
产品名称: 发票助手

检查当前操作系统...
✓ 操作系统检查完成

开始清理旧的构建文件...
✓ 清理完成

开始构建前端资源...
✓ 前端构建完成

开始打包macOS应用程序...
✓ macOS打包完成

========================================
打包成功!
========================================
输出目录: /Users/username/invoice-assistant/dist
版本: 1.0.0

生成的文件:
  - 发票助手-1.0.0-universal.dmg (92.34 MB)
  - 发票助手-1.0.0-universal.zip (87.12 MB)
```

### 4. 跨平台打包脚本 (build-all.js)

**用途**: 同时打包所有平台(Windows、macOS、Linux)

**使用方法**:
```bash
npm run build:all
```

**注意事项**:
- 跨平台打包需要在相应平台上分别执行
- Windows上只能打包Windows版本
- macOS上可以打包macOS和Windows版本(需要安装Wine)
- Linux上可以打包Linux和Windows版本

### 5. 版本号管理脚本 (version.js)

**用途**: 管理版本号,支持语义化版本控制

**使用方法**:
```bash
# 显示当前版本号
npm run version:show

# 递增修订号 (1.0.0 -> 1.0.1)
npm run version:patch

# 递增次版本号 (1.0.0 -> 1.1.0)
npm run version:minor

# 递增主版本号 (1.0.0 -> 2.0.0)
npm run version:major

# 创建alpha预发布版本
npm run version:alpha

# 创建beta预发布版本
npm run version:beta

# 创建rc预发布版本
npm run version:rc
```

**输出示例**:
```
========================================
发票助手 - 版本号管理脚本
========================================

当前版本: 1.0.0

执行: npm version minor
v1.1.0

✓ 版本号已更新: 1.0.0 -> 1.1.0

后续步骤:
1. 更新CHANGELOG.md
2. 提交代码: git add . && git commit -m "chore(release): 1.1.0"
3. 创建标签: git tag -a v1.1.0 -m "Release version 1.1.0"
4. 推送到远程: git push origin main && git push origin v1.1.0
5. 打包发布: npm run dist
```

## 二、打包规范

### 1. 打包前准备

#### 必需文件清单

**Windows平台**:
- [ ] `build/icon.ico` - 应用程序图标(多尺寸)
- [ ] `build/installer-icon.ico` - 安装程序图标
- [ ] `build/installer-header.bmp` - 安装程序头部图片(150x579)
- [ ] `build/installer-sidebar.bmp` - 安装程序侧边栏图片(164x314)
- [ ] `build/license.txt` - 许可证文件
- [ ] `build/installer.nsh` - NSIS安装脚本

**macOS平台**:
- [ ] `build/icon.icns` - 应用程序图标(多尺寸)
- [ ] `build/dmg-background.png` - DMG背景图(540x380)
- [ ] `build/entitlements.mac.plist` - 权限配置文件
- [ ] `build/license.txt` - 许可证文件

**通用**:
- [ ] `electron.cjs` - Electron主进程文件
- [ ] `package.json` - 项目配置文件
- [ ] `vite.config.js` - Vite配置文件(如果使用Vite)

#### 代码质量检查

```bash
# 运行代码检查
npm run lint

# 运行测试(如果有)
npm test

# 检查打包配置
npm run check
```

### 2. 版本号管理规范

#### 版本号格式

```
主版本号.次版本号.修订号 (MAJOR.MINOR.PATCH)
```

#### 版本号递增规则

- **MAJOR**: 不兼容的API修改
- **MINOR**: 向下兼容的功能新增
- **PATCH**: 向下兼容的问题修复

#### 版本号发布流程

```bash
# 1. 更新版本号
npm run version:patch  # 或 minor/major

# 2. 更新CHANGELOG.md
# 手动编辑或使用自动化工具

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

### 3. 打包流程规范

#### Windows平台打包流程

```bash
# 1. 检查项目配置
npm run check

# 2. 清理旧的构建文件
rm -rf dist

# 3. 构建前端资源(如果有)
npm run build

# 4. 打包Windows应用
npm run build:win

# 5. 验证安装包
# 手动测试安装和运行
```

#### macOS平台打包流程

```bash
# 1. 检查项目配置
npm run check

# 2. 清理旧的构建文件
rm -rf dist

# 3. 构建前端资源(如果有)
npm run build

# 4. 打包macOS应用
npm run build:mac

# 5. 验证安装包
# 手动测试DMG安装和运行
```

### 4. 打包后验证

#### Windows平台验证清单

- [ ] 安装程序可以正常启动
- [ ] 可以选择安装目录
- [ ] 可以创建桌面快捷方式
- [ ] 可以创建开始菜单快捷方式
- [ ] 安装完成后可以正常启动应用
- [ ] 应用功能正常
- [ ] 卸载程序可以正常工作
- [ ] 卸载后没有残留文件

#### macOS平台验证清单

- [ ] DMG文件可以正常打开
- [ ] 可以将应用拖拽到Applications文件夹
- [ ] 应用可以从Launchpad启动
- [ ] 应用功能正常
- [ ] 应用可以正常退出
- [ ] 应用可以正常卸载(移到废纸篓)

### 5. 代码签名规范

#### Windows代码签名

```bash
# 使用signtool签名
signtool sign /f certificate.pfx /p password /t http://timestamp.digicert.com "发票助手 Setup 1.0.0.exe"
```

#### macOS代码签名

```bash
# 使用codesign签名
codesign --deep --force --verify --verbose --sign "Developer ID Application: Your Name" "发票助手.app"

# 验证签名
codesign --verify --verbose "发票助手.app"
```

### 6. 发布规范

#### 发布前检查清单

- [ ] 版本号正确
- [ ] CHANGELOG已更新
- [ ] 所有测试通过
- [ ] 安装包已验证
- [ ] 代码已签名(如果需要)
- [ ] 发布说明已准备

#### 发布文件命名规范

```
Windows: 发票助手-1.0.0-x64.exe
macOS: 发票助手-1.0.0-universal.dmg
```

#### 发布说明模板

```markdown
# 发票助手 v1.0.0 发布说明

## 新增功能
- 功能1
- 功能2

## 问题修复
- 修复问题1
- 修复问题2

## 下载链接
- Windows: [下载链接]
- macOS: [下载链接]

## 系统要求
- Windows 10及以上
- macOS 10.15及以上

## 安装说明
- Windows: 双击安装程序,按照提示完成安装
- macOS: 打开DMG文件,将应用拖拽到Applications文件夹
```

## 三、CI/CD集成

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
      - run: npm run check
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
      - run: npm run check
      - run: npm run build:mac
      - uses: actions/upload-artifact@v3
        with:
          name: mac-build
          path: dist/*.dmg

  release:
    needs: [build-windows, build-mac]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/download-artifact@v3
      - uses: softprops/action-gh-release@v1
        with:
          files: |
            windows-build/*.exe
            mac-build/*.dmg
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## 四、常见问题处理

### 1. 打包失败

**问题**: electron-builder打包失败

**解决方案**:
```bash
# 清理缓存
npm cache clean --force

# 删除node_modules和package-lock.json
rm -rf node_modules package-lock.json

# 重新安装依赖
npm install

# 重新打包
npm run dist
```

### 2. 图标不显示

**问题**: 打包后应用图标不显示

**解决方案**:
- 检查图标文件格式和尺寸
- 确保图标文件路径正确
- 使用electron-icon-builder重新生成图标

```bash
npm install --save-dev electron-icon-builder
npx electron-icon-builder --input=./public/icon.png --output=./build
```

### 3. 应用无法启动

**问题**: 打包后应用无法启动

**解决方案**:
- 检查main入口文件路径
- 检查package.json中的main字段
- 检查files配置是否包含所有必要文件
- 查看应用日志定位问题

### 4. 安装程序问题

**问题**: Windows安装程序出现问题

**解决方案**:
- 检查NSIS配置
- 检查安装程序图片尺寸
- 检查许可证文件格式
- 使用NSIS调试工具

### 5. macOS签名问题

**问题**: macOS应用签名失败

**解决方案**:
- 检查开发者证书
- 检查entitlements文件
- 检查provisioning profile
- 使用Xcode工具验证签名

## 五、最佳实践

### 1. 使用自动化工具

- 使用npm scripts自动化打包流程
- 使用CI/CD自动化发布流程
- 使用版本管理工具自动化版本号

### 2. 保持配置一致

- 使用统一的package.json配置
- 使用统一的文件命名规范
- 使用统一的版本号管理策略

### 3. 充分测试

- 在打包前运行所有测试
- 在打包后验证安装包
- 在多个系统版本上测试

### 4. 文档完善

- 记录打包流程
- 记录常见问题
- 记录解决方案

### 5. 版本控制

- 使用Git标签标记发布版本
- 使用CHANGELOG记录变更
- 使用语义化版本号

## 六、脚本使用示例

### 完整打包流程示例

```bash
# 1. 检查项目配置
npm run check

# 2. 更新版本号(如果是新版本)
npm run version:patch

# 3. 更新CHANGELOG
# 手动编辑CHANGELOG.md

# 4. 提交代码
git add .
git commit -m "chore(release): 1.0.1"

# 5. 创建标签
git tag -a v1.0.1 -m "Release version 1.0.1"

# 6. 推送到远程
git push origin main
git push origin v1.0.1

# 7. 打包Windows版本
npm run build:win

# 8. 打包macOS版本(在Mac上执行)
npm run build:mac

# 9. 验证安装包
# 手动测试安装和运行

# 10. 发布
# 上传到发布平台
```

### 快速打包示例

```bash
# 快速打包Windows版本(跳过检查)
npm run dist:win:nsis

# 快速打包macOS版本(跳过检查)
npm run dist:mac:dmg
```

## 七、总结

本打包脚本和规范提供了完整的跨平台打包解决方案,包括:

1. **自动化脚本**: 提供了多个自动化脚本,简化打包流程
2. **规范流程**: 定义了标准的打包流程和检查清单
3. **版本管理**: 提供了版本号管理工具和策略
4. **CI/CD集成**: 提供了CI/CD集成示例
5. **问题处理**: 提供了常见问题的解决方案
6. **最佳实践**: 提供了打包的最佳实践建议

遵循这些规范,可以确保打包过程的一致性和可靠性,提高发布效率。
