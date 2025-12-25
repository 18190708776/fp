# 图标和资源文件准备指南

## 一、Windows平台图标要求

### 1. 应用程序图标 (icon.ico)
- **文件格式**: ICO格式
- **尺寸要求**: 必须包含以下尺寸
  - 16x16 (用于任务栏小图标)
  - 32x32 (用于桌面图标)
  - 48x48 (用于控制面板)
  - 64x64 (用于高DPI显示)
  - 128x128 (用于大图标)
  - 256x256 (用于超大图标)
- **颜色深度**: 32位真彩色 (支持透明通道)
- **文件位置**: `build/icon.ico`

### 2. 安装程序图标 (installer-icon.ico)
- **文件格式**: ICO格式
- **尺寸要求**: 32x32, 48x48, 64x64, 128x128
- **颜色深度**: 32位真彩色
- **文件位置**: `build/installer-icon.ico`

### 3. 安装程序头部图片 (installer-header.bmp)
- **文件格式**: BMP格式
- **尺寸**: 150x579 像素
- **颜色深度**: 24位或32位
- **文件位置**: `build/installer-header.bmp`

### 4. 安装程序侧边栏图片 (installer-sidebar.bmp)
- **文件格式**: BMP格式
- **尺寸**: 164x314 像素
- **颜色深度**: 24位或32位
- **文件位置**: `build/installer-sidebar.bmp`

## 二、Mac平台图标要求

### 1. 应用程序图标 (icon.icns)
- **文件格式**: ICNS格式
- **尺寸要求**: 必须包含以下尺寸
  - 16x16
  - 32x32
  - 64x64
  - 128x128
  - 256x256
  - 512x512
  - 1024x1024 (macOS 10.15+)
- **颜色深度**: 32位真彩色 (支持透明通道)
- **文件位置**: `build/icon.icns`

### 2. DMG背景图 (dmg-background.png)
- **文件格式**: PNG格式
- **尺寸**: 540x380 像素
- **颜色深度**: 24位或32位
- **文件位置**: `build/dmg-background.png`

## 三、图标制作工具推荐

### Windows平台
1. **GIMP** (免费开源)
   - 支持导出ICO格式
   - 可同时导出多个尺寸

2. **IcoFX** (付费)
   - 专业的ICO编辑器
   - 支持批量处理

3. **Online ICO Converter** (在线工具)
   - https://icoconvert.com/
   - 方便快捷,支持PNG转ICO

### Mac平台
1. **Iconutil** (系统自带)
   ```bash
   # 使用iconutil创建icns文件
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
   ```

2. **Image2Icon** (付费)
   - 拖拽式操作,简单易用
   - 支持批量转换

3. **Online ICNS Converter** (在线工具)
   - https://cloudconvert.com/png-to-icns
   - 支持PNG转ICNS

## 四、图标设计建议

### 设计原则
1. **简洁明了**: 图标应该简洁,易于识别
2. **高对比度**: 确保在不同背景下都清晰可见
3. **一致性**: 与应用品牌形象保持一致
4. **可缩放**: 在各种尺寸下都保持清晰

### 颜色建议
- 主色调: 使用品牌主色
- 辅助色: 使用对比色增强识别度
- 避免使用过多颜色,保持简洁

### 尺寸建议
- 源图标建议使用 1024x1024 的PNG格式
- 确保在最小尺寸(16x16)下仍然可识别
- 在大尺寸下保持细节清晰

## 五、自动化图标生成脚本

### 使用electron-icon-builder自动生成图标

```bash
# 安装electron-icon-builder
npm install --save-dev electron-icon-builder

# 生成所有平台的图标
npx electron-icon-builder --input=./public/icon.png --output=./build --flatten
```

### 使用icon-gen生成图标

```bash
# 安装icon-gen
npm install --save-dev icon-gen

# 生成图标
npx icon-gen -i public/icon.png -o build -t icns,ico
```

## 六、其他资源文件

### 1. 许可证文件 (license.txt)
- **文件位置**: `build/license.txt`
- **格式**: 纯文本文件
- **内容**: 软件许可证信息

### 2. 额外文件 (extra目录)
- **文件位置**: `build/extra/`
- **用途**: 放置需要随应用分发的额外文件
- **示例**: 配置文件、文档、示例数据等

### 3. 权限配置文件 (entitlements.mac.plist)
- **文件位置**: `build/entitlements.mac.plist`
- **用途**: macOS应用的权限配置
- **必需**: 用于代码签名和沙盒配置

## 七、检查清单

在打包前,请确认以下文件都已准备好:

### Windows平台
- [ ] `build/icon.ico` - 应用程序图标
- [ ] `build/installer-icon.ico` - 安装程序图标
- [ ] `build/installer-header.bmp` - 安装程序头部图片
- [ ] `build/installer-sidebar.bmp` - 安装程序侧边栏图片
- [ ] `build/license.txt` - 许可证文件

### Mac平台
- [ ] `build/icon.icns` - 应用程序图标
- [ ] `build/dmg-background.png` - DMG背景图
- [ ] `build/entitlements.mac.plist` - 权限配置文件
- [ ] `build/license.txt` - 许可证文件

### 通用
- [ ] 所有图标文件尺寸符合要求
- [ ] 图标在不同尺寸下都清晰可见
- [ ] 许可证文件内容完整
- [ ] 额外资源文件已放置在正确位置

## 八、常见问题

### Q1: ICO文件不显示某些尺寸?
A: 确保ICO文件包含了所有必需的尺寸,使用专业的ICO编辑器重新生成。

### Q2: ICNS文件在macOS上显示不正常?
A: 确保ICNS文件包含了所有必需的尺寸,使用iconutil工具重新生成。

### Q3: 安装程序图片显示不正确?
A: 检查BMP文件的尺寸和颜色深度是否符合要求。

### Q4: 图标在高DPI屏幕上模糊?
A: 确保图标文件包含了高分辨率版本(如256x256或更大)。

### Q5: 如何批量生成多个尺寸的图标?
A: 使用electron-icon-builder或icon-gen等自动化工具。
