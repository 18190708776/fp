# 常见问题解决方案

## 一、打包相关问题

### 1. electron-builder打包失败

#### 问题1: Error: Cannot find module 'electron-builder'

**错误信息**:
```
Error: Cannot find module 'electron-builder'
```

**原因**: electron-builder未正确安装

**解决方案**:
```bash
# 重新安装electron-builder
npm install --save-dev electron-builder

# 如果仍然失败,清理缓存后重装
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

#### 问题2: Error: Application entry file not found

**错误信息**:
```
Error: Application entry file "electron.cjs" not found
```

**原因**: package.json中的main字段指向的文件不存在

**解决方案**:
```bash
# 检查package.json中的main字段
cat package.json | grep main

# 确保electron.cjs文件存在
ls -la electron.cjs

# 如果文件名不对,修改package.json
# 或创建正确的入口文件
```

#### 问题3: Error: Cannot find module 'xxx'

**错误信息**:
```
Error: Cannot find module 'xxx'
```

**原因**: 依赖未正确安装

**解决方案**:
```bash
# 重新安装所有依赖
npm install

# 或使用yarn
yarn install

# 如果是特定模块,单独安装
npm install --save xxx
```

### 2. Windows平台问题

#### 问题1: 免安装版本生成失败

**错误信息**:
```
Error: Portable build failed
```

**原因**: 配置错误或资源文件缺失

**解决方案**:
```bash
# 1. 检查portable配置
# 确保package.json中的win配置正确

# 2. 检查资源文件
ls -la build/
# 确保以下文件存在:
# - icon.ico

# 3. 使用调试模式
npm run dist:win -- --debug
```

#### 问题2: 应用无法启动

**错误信息**:
```
应用无法启动或立即崩溃
```

**原因**: 缺少必要的运行时库或配置错误

**解决方案**:
```bash
# 1. 检查应用日志
# 日志位置: %APPDATA%\invoice-assistant\logs

# 2. 检查Visual C++ Redistributable
# 确保安装了必要的运行时库
# 下载地址: https://aka.ms/vs/17/release/vc_redist.x64.exe

# 3. 检查防火墙设置
# 允许应用通过防火墙

# 4. 检查files配置
# 确保package.json中的files配置包含所有必要文件
```

#### 问题3: 代码签名失败

**错误信息**:
```
Error: Code signing failed
```

**原因**: 证书配置错误或证书过期

**解决方案**:
```bash
# 1. 检查证书配置
# 确保package.json中配置了正确的证书信息

# 2. 使用signtool手动签名
signtool sign /f certificate.pfx /p password /t http://timestamp.digicert.com "发票助手-1.0.0-x64.exe"

# 3. 验证签名
signtool verify /pa "发票助手-1.0.0-x64.exe"

# 4. 检查证书有效期
certmgr.msc
```

### 3. macOS平台问题

#### 问题1: DMG生成失败

**错误信息**:
```
Error: DMG build failed
```

**原因**: DMG配置错误或资源文件缺失

**解决方案**:
```bash
# 1. 检查DMG配置
# 确保package.json中的dmg配置正确

# 2. 检查资源文件
ls -la build/
# 确保以下文件存在:
# - icon.icns
# - dmg-background.png

# 3. 检查图片尺寸
# dmg-background.png: 540x380

# 4. 使用调试模式
npm run dist:mac -- --debug
```

#### 问题2: 应用无法打开

**错误信息**:
```
"发票助手"已损坏,无法打开
```

**原因**: Gatekeeper阻止了未签名的应用

**解决方案**:
```bash
# 1. 临时允许未签名应用运行
sudo spctl --master-disable
# 运行应用后重新启用
sudo spctl --master-enable

# 2. 移除隔离属性
xattr -cr /Applications/发票助手.app

# 3. 使用开发者证书签名
codesign --deep --force --verify --verbose --sign "Developer ID Application: Your Name" "发票助手.app"

# 4. 验证签名
codesign --verify --verbose "发票助手.app"
```

#### 问题3: 代码签名失败

**错误信息**:
```
Error: Code signing failed
```

**原因**: 证书配置错误或entitlements配置错误

**解决方案**:
```bash
# 1. 检查开发者证书
security find-identity -v -p codesigning

# 2. 检查entitlements文件
cat build/entitlements.mac.plist

# 3. 使用codesign手动签名
codesign --deep --force --verify --verbose --sign "Developer ID Application: Your Name" --entitlements build/entitlements.mac.plist "发票助手.app"

# 4. 验证签名
codesign --verify --verbose "发票助手.app"

# 5. 检查provisioning profile
# 确保build/embedded.provisionprofile存在且有效
```

#### 问题4: 应用无法访问网络

**错误信息**:
```
网络请求失败
```

**原因**: macOS安全策略阻止了网络访问

**解决方案**:
```bash
# 1. 检查entitlements配置
# 确保entitlements.mac.plist中包含网络权限:
# <key>com.apple.security.network.client</key>
# <true/>
# <key>com.apple.security.network.server</key>
# <true/>

# 2. 检查防火墙设置
# 系统偏好设置 > 安全性与隐私 > 防火墙 > 防火墙选项
# 允许发票助手应用

# 3. 检查网络配置
# 确保应用可以访问目标服务器
```

## 二、图标相关问题

### 1. Windows图标问题

#### 问题1: 图标不显示

**错误信息**:
```
应用图标显示为默认图标
```

**原因**: 图标文件格式或尺寸不正确

**解决方案**:
```bash
# 1. 检查图标文件格式
# 确保是ICO格式,包含多个尺寸:
# - 16x16
# - 32x32
# - 48x48
# - 64x64
# - 128x128
# - 256x256

# 2. 使用electron-icon-builder重新生成
npm install --save-dev electron-icon-builder
npx electron-icon-builder --input=./public/icon.png --output=./build

# 3. 检查图标文件路径
# 确保package.json中的icon路径正确:
# "icon": "build/icon.ico"

# 4. 清理缓存后重新打包
rm -rf dist
npm run build:win
```

#### 问题2: 图标在高DPI屏幕上模糊

**错误信息**:
```
高DPI屏幕上图标模糊
```

**原因**: 图标缺少高分辨率版本

**解决方案**:
```bash
# 1. 确保ICO文件包含256x256或更大尺寸
# 使用专业的ICO编辑器重新生成

# 2. 使用在线工具生成
# https://icoconvert.com/
# 上传PNG图片,选择所有尺寸,下载ICO文件

# 3. 使用ImageMagick生成
convert icon.png -define icon:auto-resize=256,128,96,64,48,32,16 icon.ico
```

### 2. macOS图标问题

#### 问题1: 图标不显示

**错误信息**:
```
应用图标显示为默认图标
```

**原因**: ICNS文件格式或尺寸不正确

**解决方案**:
```bash
# 1. 检查ICNS文件格式
# 确保ICNS文件包含所有必需尺寸:
# - 16x16
# - 32x32
# - 64x64
# - 128x128
# - 256x256
# - 512x512
# - 1024x1024

# 2. 使用iconutil重新生成
mkdir MyIcon.iconset
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
iconutil -c icns MyIcon.iconset

# 3. 检查ICNS文件内容
iconutil -l icon.icns

# 4. 清理缓存后重新打包
rm -rf dist
npm run build:mac
```

#### 问题2: Dock中图标不更新

**错误信息**:
```
Dock中的应用图标没有更新
```

**原因**: macOS缓存了旧图标

**解决方案**:
```bash
# 1. 清理Dock缓存
killall Dock

# 2. 清理图标缓存
sudo rm -rf /Library/Caches/com.apple.iconservices
sudo find /private/var/folders/ -name com.apple.dock.iconcache -exec rm {} \;
killall Dock

# 3. 重新安装应用
# 删除旧应用,重新安装新版本
```

## 三、依赖相关问题

### 1. npm安装问题

#### 问题1: npm install失败

**错误信息**:
```
npm ERR! code EINTEGRITY
npm ERR! integrity checksum failed
```

**原因**: npm缓存损坏

**解决方案**:
```bash
# 1. 清理npm缓存
npm cache clean --force

# 2. 删除node_modules和package-lock.json
rm -rf node_modules package-lock.json

# 3. 重新安装
npm install

# 4. 如果仍然失败,使用npm ci
npm ci
```

#### 问题2: 依赖版本冲突

**错误信息**:
```
npm ERR! peer dep missing
```

**原因**: 依赖版本不兼容

**解决方案**:
```bash
# 1. 检查依赖版本
npm ls

# 2. 使用--legacy-peer-deps
npm install --legacy-peer-deps

# 3. 手动解决冲突
# 修改package.json中的依赖版本

# 4. 使用npm-force-resolutions
# 添加resolutions字段到package.json
```

### 2. Electron相关问题

#### 问题1: Electron下载失败

**错误信息**:
```
Error: Electron failed to install correctly
```

**原因**: Electron下载失败或被网络限制

**解决方案**:
```bash
# 1. 设置Electron镜像
npm config set electron_mirror https://npmmirror.com/mirrors/electron/

# 2. 手动下载Electron
# 从镜像站下载对应版本的Electron
# 放到缓存目录:
# Windows: %USERPROFILE%\AppData\Local\electron\Cache
# macOS: ~/Library/Caches/electron/
# Linux: ~/.cache/electron/

# 3. 使用ELECTRON_MIRROR环境变量
export ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/
npm install
```

#### 问题2: Electron版本不兼容

**错误信息**:
```
Error: The module was compiled against a different Node.js version
```

**原因**: Electron版本与依赖不兼容

**解决方案**:
```bash
# 1. 检查Electron版本
npm list electron

# 2. 重新构建native模块
npm rebuild

# 3. 使用electron-rebuild
npm install --save-dev electron-rebuild
npx electron-rebuild

# 4. 升级或降级Electron版本
npm install electron@latest
```

## 四、构建相关问题

### 1. Vite构建问题

#### 问题1: Vite构建失败

**错误信息**:
```
Error: Build failed with errors
```

**原因**: 代码错误或配置错误

**解决方案**:
```bash
# 1. 检查构建日志
npm run build

# 2. 检查代码语法
npm run lint

# 3. 检查Vite配置
cat vite.config.js

# 4. 清理缓存后重新构建
rm -rf dist node_modules/.vite
npm run build
```

#### 问题2: 构建后资源路径错误

**错误信息**:
```
404 Not Found - /assets/xxx.js
```

**原因**: 资源路径配置错误

**解决方案**:
```bash
# 1. 检查base配置
# 在vite.config.js中设置base:
export default {
  base: './'
}

# 2. 检查publicPath配置
# 确保资源路径正确

# 3. 使用相对路径
# 在代码中使用相对路径引用资源
```

### 2. 跨平台构建问题

#### 问题1: 在Windows上构建macOS版本失败

**错误信息**:
```
Error: Cannot build for macOS on Windows
```

**原因**: 跨平台构建需要特定环境

**解决方案**:
```bash
# 1. 使用CI/CD服务
# 在macOS runner上构建macOS版本

# 2. 使用虚拟机
# 在macOS虚拟机中构建

# 3. 使用云服务
# 使用MacStadium、AWS EC2 Mac等云服务

# 4. 使用Docker
# 使用macOS Docker容器(实验性)
```

#### 问题2: 构建时间过长

**错误信息**:
```
构建过程非常慢
```

**原因**: 资源过多或配置不当

**解决方案**:
```bash
# 1. 优化files配置
# 只包含必要的文件:
"files": [
  "electron.cjs",
  "package.json",
  "dist/**/*"
]

# 2. 排除不必要的文件
"asarUnpack": [
  "node_modules/some-native-module"
]

# 3. 使用缓存
# 启用electron-builder缓存

# 4. 并行构建
# 使用多线程构建
```

## 五、运行时问题

### 1. 应用启动问题

#### 问题1: 应用启动后立即关闭

**错误信息**:
```
应用启动后立即退出
```

**原因**: 主进程代码错误

**解决方案**:
```bash
# 1. 检查主进程日志
# 在开发环境中打开DevTools查看错误

# 2. 检查electron.cjs代码
# 确保没有语法错误或逻辑错误

# 3. 添加错误处理
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

# 4. 使用调试模式
npm run dev
```

#### 问题2: 应用窗口无法创建

**错误信息**:
```
BrowserWindow failed to create
```

**原因**: 窗口配置错误

**解决方案**:
```bash
# 1. 检查BrowserWindow配置
# 确保width和height设置合理:
new BrowserWindow({
  width: 1400,
  height: 900
});

# 2. 检查loadURL配置
// 确保URL正确:
mainWindow.loadURL('https://inv-veri.chinatax.gov.cn/');

// 或加载本地文件:
mainWindow.loadFile('index.html');

# 3. 检查webPreferences配置
// 确保配置正确:
webPreferences: {
  nodeIntegration: false,
  contextIsolation: true
}
```

### 2. 网络请求问题

#### 问题1: 网络请求失败

**错误信息**:
```
ERR_CONNECTION_REFUSED
```

**原因**: 网络配置或CORS问题

**解决方案**:
```bash
# 1. 检查网络连接
# 确保可以访问目标服务器

# 2. 检查CORS配置
// 在electron.cjs中禁用webSecurity:
webPreferences: {
  webSecurity: false
}

// 或使用CORS代理

# 3. 检查证书错误
// 在electron.cjs中忽略证书错误:
app.commandLine.appendSwitch('ignore-certificate-errors');

mainWindow.webContents.on('certificate-error', (event, url, error, certificate, callback) => {
  event.preventDefault();
  callback(true);
});

# 4. 检查防火墙设置
// 确保应用可以通过防火墙
```

#### 问题2: HTTPS证书错误

**错误信息**:
```
ERR_CERT_AUTHORITY_INVALID
```

**原因**: 自签名证书或证书过期

**解决方案**:
```bash
# 1. 忽略证书错误(仅开发环境)
app.commandLine.appendSwitch('ignore-certificate-errors');

mainWindow.webContents.on('certificate-error', (event, url, error, certificate, callback) => {
  event.preventDefault();
  callback(true);
});

# 2. 添加证书到信任列表
// 在生产环境中,使用有效的证书

# 3. 使用HTTP(仅开发环境)
// 在开发环境中使用HTTP代替HTTPS
```

## 六、性能问题

### 1. 应用启动慢

**问题**: 应用启动时间过长

**原因**: 资源加载过多或代码未优化

**解决方案**:
```bash
# 1. 优化资源加载
// 延迟加载非必要资源
// 使用代码分割

# 2. 优化依赖
// 移除不必要的依赖
// 使用轻量级替代品

# 3. 启用asar压缩
// 在package.json中启用asar:
"build": {
  "asar": true
}

# 4. 优化启动代码
// 减少启动时的同步操作
// 使用异步加载
```

### 2. 应用运行慢

**问题**: 应用运行时卡顿

**原因**: 内存泄漏或CPU占用过高

**解决方案**:
```bash
# 1. 检查内存使用
// 使用Chrome DevTools Memory面板
// 检查内存泄漏

# 2. 优化渲染性能
// 使用虚拟滚动
// 优化DOM操作
// 使用requestAnimationFrame

# 3. 优化网络请求
// 使用缓存
// 减少请求次数
// 使用CDN

# 4. 使用性能分析工具
// Chrome DevTools Performance面板
// Electron Performance Monitor
```

## 七、调试技巧

### 1. 开发环境调试

```bash
# 1. 启动开发模式
npm run dev

# 2. 打开DevTools
// 在electron.cjs中:
if (isDev) {
  mainWindow.webContents.openDevTools();
}

# 3. 使用调试器
// 在VS Code中配置launch.json:
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Main Process",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceFolder}",
      "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron",
      "windows": {
        "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron.cmd"
      },
      "args": ["."]
    }
  ]
}
```

### 2. 生产环境调试

```bash
# 1. 查看日志文件
# Windows: %APPDATA%\invoice-assistant\logs
# macOS: ~/Library/Logs/invoice-assistant
# Linux: ~/.config/invoice-assistant/logs

# 2. 启用远程调试
// 在electron.cjs中:
mainWindow.webContents.openDevTools();

// 或使用命令行参数:
electron . --remote-debugging-port=9222

# 3. 使用日志库
// 安装electron-log:
npm install electron-log

// 在代码中使用:
const log = require('electron-log');
log.info('Application started');
```

## 八、故障排除清单

### 打包前检查

- [ ] 依赖已正确安装
- [ ] package.json配置正确
- [ ] 所有资源文件已准备
- [ ] 代码已通过lint检查
- [ ] 测试已全部通过
- [ ] 版本号已更新
- [ ] CHANGELOG已更新

### 打包后验证

- [ ] 安装包可以正常下载
- [ ] 安装包大小合理
- [ ] 安装过程正常
- [ ] 应用可以正常启动
- [ ] 应用功能正常
- [ ] 没有明显的性能问题
- [ ] 日志中没有错误信息

### 发布前检查

- [ ] 版本号正确
- [ ] 发布说明已准备
- [ ] 下载链接已配置
- [ ] 更新服务器已配置
- [ ] 代码签名已完成
- [ ] 安全扫描已完成
- [ ] 文档已更新

## 九、获取帮助

### 官方资源

- Electron官方文档: https://www.electronjs.org/docs
- electron-builder文档: https://www.electron.build/
- Vite文档: https://vitejs.dev/

### 社区资源

- Electron GitHub Issues: https://github.com/electron/electron/issues
- electron-builder GitHub Issues: https://github.com/electron-userland/electron-builder/issues
- Stack Overflow: https://stackoverflow.com/questions/tagged/electron

### 调试工具

- Chrome DevTools
- Electron DevTools
- VS Code Debugger
- Electron Performance Monitor

遵循这些解决方案,可以快速定位和解决打包过程中的常见问题。
