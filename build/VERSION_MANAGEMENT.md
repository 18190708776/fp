# 版本号管理策略

## 一、版本号格式

采用语义化版本控制 (Semantic Versioning 2.0.0) 规范:

```
主版本号.次版本号.修订号 (MAJOR.MINOR.PATCH)
```

例如: `1.0.0`, `1.2.3`, `2.0.0`

### 版本号含义

- **MAJOR (主版本号)**: 当进行不兼容的API修改时递增
- **MINOR (次版本号)**: 当添加向下兼容的功能时递增
- **PATCH (修订号)**: 当进行向下兼容的问题修复时递增

### 预发布版本

预发布版本可以在版本号后添加预发布标识:

```
1.0.0-alpha.1
1.0.0-beta.1
1.0.0-rc.1
```

预发布标识按优先级排序: `alpha` < `beta` < `rc`

## 二、版本号递增规则

### 1. 主版本号 (MAJOR) 递增场景

- 重大架构变更
- 不兼容的API更改
- 数据库结构重大变更
- 移除重要功能
- Electron主版本升级(可能导致兼容性问题)

示例: `1.0.0` → `2.0.0`

### 2. 次版本号 (MINOR) 递增场景

- 新增功能
- 功能增强
- 新增配置选项
- 添加新的API接口(保持向后兼容)
- Electron小版本升级(通常兼容)

示例: `1.0.0` → `1.1.0`

### 3. 修订号 (PATCH) 递增场景

- Bug修复
- 性能优化
- 文档更新
- 代码重构(不改变功能)
- 安全补丁

示例: `1.0.0` → `1.0.1`

## 三、版本号管理工具

### 1. 使用npm version命令

```bash
# 递增修订号
npm version patch

# 递增次版本号
npm version minor

# 递增主版本号
npm version major

# 添加预发布版本
npm version prerelease --preid=alpha
npm version prerelease --preid=beta
npm version prerelease --preid=rc
```

### 2. 使用standard-version自动化版本管理

```bash
# 安装standard-version
npm install --save-dev standard-version

# 配置package.json
{
  "scripts": {
    "release": "standard-version",
    "release:patch": "standard-version --release-as patch",
    "release:minor": "standard-version --release-as minor",
    "release:major": "standard-version --release-as major"
  }
}

# 使用Conventional Commits规范提交代码
git commit -m "feat: 添加新功能"
git commit -m "fix: 修复bug"
git commit -m "docs: 更新文档"

# 自动生成版本号和CHANGELOG
npm run release
```

### 3. 使用semantic-release完全自动化

```bash
# 安装semantic-release
npm install --save-dev semantic-release @semantic-release/git @semantic-release/changelog

# 配置.releaserc.json
{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/git",
    "@semantic-release/github"
  ]
}
```

## 四、版本号发布流程

### 开发阶段

1. **功能开发**: 在feature分支开发新功能
2. **版本号**: 使用预发布版本号,如 `1.1.0-alpha.1`
3. **测试**: 在测试环境进行充分测试

### 发布阶段

1. **代码审查**: 完成代码审查和测试
2. **版本号确定**: 根据变更内容确定版本号
3. **更新CHANGELOG**: 记录版本变更内容
4. **打标签**: 创建Git标签
5. **发布**: 发布到生产环境

### 示例流程

```bash
# 1. 确定版本号类型
# 假设这是一个次版本更新(新增功能)

# 2. 更新版本号
npm version minor

# 3. 更新CHANGELOG
# 手动编辑CHANGELOG.md或使用自动化工具

# 4. 提交变更
git add .
git commit -m "chore(release): 1.1.0"

# 5. 创建标签
git tag -a v1.1.0 -m "Release version 1.1.0"

# 6. 推送到远程
git push origin main
git push origin v1.1.0

# 7. 打包发布
npm run dist
```

## 五、CHANGELOG管理

### CHANGELOG格式

```markdown
# 更新日志

## [1.1.0] - 2024-01-15

### 新增
- 添加发票批量查验功能
- 支持导出查验结果为Excel
- 添加快捷键支持

### 修复
- 修复在某些情况下应用崩溃的问题
- 修复发票图片显示异常的问题

### 优化
- 优化应用启动速度
- 改进用户界面响应性

## [1.0.1] - 2024-01-10

### 修复
- 修复首次启动时的配置问题
- 修复网络请求超时处理

## [1.0.0] - 2024-01-01

### 新增
- 初始版本发布
- 支持全国增值税发票查验
- 简洁易用的用户界面
```

### 自动化生成CHANGELOG

使用standard-version或semantic-release自动生成CHANGELOG:

```bash
# 使用standard-version
npm run release

# 使用semantic-release(完全自动化)
# 配置CI/CD后自动发布
```

## 六、版本号与构建号

### 构建号 (Build Number)

构建号用于标识每次构建的唯一性,通常使用时间戳或递增数字:

```json
{
  "version": "1.0.0",
  "buildNumber": "20240115143025"
}
```

### 在electron-builder中使用构建号

```json
{
  "build": {
    "extraMetadata": {
      "version": "1.0.0",
      "buildNumber": "20240115143025"
    }
  }
}
```

### 自动生成构建号

```javascript
// scripts/generate-build-number.js
const fs = require('fs');
const packageJson = require('../package.json');

const now = new Date();
const buildNumber = now.getFullYear() +
  String(now.getMonth() + 1).padStart(2, '0') +
  String(now.getDate()).padStart(2, '0') +
  String(now.getHours()).padStart(2, '0') +
  String(now.getMinutes()).padStart(2, '0') +
  String(now.getSeconds()).padStart(2, '0');

packageJson.buildNumber = buildNumber;

fs.writeFileSync(
  './package.json',
  JSON.stringify(packageJson, null, 2)
);

console.log(`Build number: ${buildNumber}`);
```

## 七、版本号回退策略

### 回退场景

1. **严重Bug**: 发布后发现严重Bug需要立即修复
2. **兼容性问题**: 与某些系统或环境不兼容
3. **功能问题**: 核心功能无法正常使用

### 回退步骤

```bash
# 1. 回退到上一个稳定版本
git checkout v1.0.0

# 2. 创建修复分支
git checkout -b hotfix/1.0.1

# 3. 修复问题并测试

# 4. 发布修复版本
npm version patch
npm run dist

# 5. 合并回主分支
git checkout main
git merge hotfix/1.0.1

# 6. 发布新版本
```

## 八、版本号与自动更新

### 配置electron-updater

```javascript
// electron.cjs
const { autoUpdater } = require('electron-updater');

app.on('ready', () => {
  if (process.env.NODE_ENV !== 'development') {
    autoUpdater.checkForUpdatesAndNotify();
  }
});

autoUpdater.on('update-downloaded', (info) => {
  autoUpdater.quitAndInstall();
});
```

### 版本号比较

electron-updater会自动比较版本号,确保只升级到更高版本:

```json
{
  "version": "1.0.0",
  "build": {
    "publish": {
      "provider": "generic",
      "url": "https://your-domain.com/updates"
    }
  }
}
```

## 九、版本号管理最佳实践

### 1. 使用Git标签

```bash
# 为每个发布版本创建标签
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

### 2. 保持CHANGELOG更新

每次发布后立即更新CHANGELOG,记录所有变更。

### 3. 遵循Conventional Commits规范

```bash
feat: 新功能
fix: Bug修复
docs: 文档更新
style: 代码格式调整
refactor: 代码重构
perf: 性能优化
test: 测试相关
chore: 构建/工具相关
```

### 4. 使用预发布版本

在正式发布前使用预发布版本进行测试:

```bash
npm version prerelease --preid=alpha
npm version prerelease --preid=beta
npm version prerelease --preid=rc
```

### 5. 版本号冻结

在发布前冻结版本号,避免意外变更:

```bash
# 锁定版本号
npm shrinkwrap

# 或使用package-lock.json
```

## 十、版本号检查清单

发布前检查:

- [ ] 版本号符合语义化版本规范
- [ ] CHANGELOG已更新
- [ ] Git标签已创建
- [ ] 所有测试通过
- [ ] 文档已更新
- [ ] 发布说明已准备
- [ ] 回退计划已制定

## 十一、版本号示例

### 项目版本历史

```
1.0.0 (2024-01-01) - 初始版本
1.0.1 (2024-01-10) - Bug修复
1.1.0 (2024-01-15) - 新增功能
1.1.1 (2024-01-20) - Bug修复
1.2.0 (2024-02-01) - 新增功能
2.0.0 (2024-03-01) - 重大更新
```

### 预发布版本示例

```
1.1.0-alpha.1 (2024-01-05) - 第一个alpha版本
1.1.0-alpha.2 (2024-01-08) - 第二个alpha版本
1.1.0-beta.1 (2024-01-10) - 第一个beta版本
1.1.0-beta.2 (2024-01-12) - 第二个beta版本
1.1.0-rc.1 (2024-01-14) - 第一个rc版本
1.1.0 (2024-01-15) - 正式版本
```

## 十二、版本号管理工具推荐

1. **npm version** - 简单直接,适合小型项目
2. **standard-version** - 自动化程度高,适合中型项目
3. **semantic-release** - 完全自动化,适合大型项目
4. **lerna** - 适合monorepo项目管理

选择适合您项目规模的工具进行版本号管理。
