#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const packageJson = require('../package.json');

console.log('========================================');
console.log('发票助手 - 版本号管理脚本');
console.log('========================================\n');

const args = process.argv.slice(2);
const command = args[0];

if (!command) {
  console.log('使用方法:');
  console.log('  node scripts/version.cjs patch    - 递增修订号 (1.0.0 -> 1.0.1)');
  console.log('  node scripts/version.cjs minor    - 递增次版本号 (1.0.0 -> 1.1.0)');
  console.log('  node scripts/version.cjs major    - 递增主版本号 (1.0.0 -> 2.0.0)');
  console.log('  node scripts/version.cjs alpha    - 创建alpha预发布版本');
  console.log('  node scripts/version.cjs beta     - 创建beta预发布版本');
  console.log('  node scripts/version.cjs rc       - 创建rc预发布版本');
  console.log('  node scripts/version.cjs show     - 显示当前版本号');
  process.exit(0);
}

try {
  const currentVersion = packageJson.version;
  console.log(`当前版本: ${currentVersion}\n`);

  if (command === 'show') {
    console.log(`版本号: ${currentVersion}`);
    console.log(`构建号: ${packageJson.buildNumber || '未设置'}`);
    process.exit(0);
  }

  let versionType = command;
  let preId = null;

  if (['alpha', 'beta', 'rc'].includes(command)) {
    versionType = 'prerelease';
    preId = command;
  }

  console.log(`执行: npm version ${versionType}${preId ? ` --preid=${preId}` : ''}`);
  execSync(`npm version ${versionType}${preId ? ` --preid=${preId}` : ''}`, { stdio: 'inherit' });

  const newPackageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8'));
  const newVersion = newPackageJson.version;

  console.log(`\n✓ 版本号已更新: ${currentVersion} -> ${newVersion}`);

  console.log('\n后续步骤:');
  console.log('1. 更新CHANGELOG.md');
  console.log('2. 提交代码: git add . && git commit -m "chore(release): ' + newVersion + '"');
  console.log('3. 创建标签: git tag -a v' + newVersion + ' -m "Release version ' + newVersion + '"');
  console.log('4. 推送到远程: git push origin main && git push origin v' + newVersion);
  console.log('5. 打包发布: npm run dist');

} catch (error) {
  console.error('\n版本号更新失败!');
  console.error(error.message);
  process.exit(1);
}
