#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('========================================');
console.log('发票助手 - 打包前检查脚本');
console.log('========================================\n');

let hasErrors = false;
let hasWarnings = false;

function check(condition, message, type = 'error') {
  if (!condition) {
    if (type === 'error') {
      console.error(`✗ ${message}`);
      hasErrors = true;
    } else {
      console.warn(`⚠ ${message}`);
      hasWarnings = true;
    }
  } else {
    console.log(`✓ ${message}`);
  }
}

try {
  const packageJson = require('../package.json');
  const buildConfig = packageJson.build;

  console.log('1. 检查package.json配置...');
  check(packageJson.version, '版本号已设置');
  check(packageJson.build.appId, '应用ID已设置');
  check(packageJson.build.productName, '产品名称已设置');
  check(packageJson.main, '主入口文件已设置');

  console.log('\n2. 检查build目录...');
  const buildDir = path.join(__dirname, '..', 'build');
  check(fs.existsSync(buildDir), 'build目录存在');

  if (fs.existsSync(buildDir)) {
    console.log('\n3. 检查Windows资源文件...');
    check(fs.existsSync(path.join(buildDir, 'icon.ico')), 'Windows图标文件存在', 'warning');
    check(fs.existsSync(path.join(buildDir, 'installer-icon.ico')), '安装程序图标存在', 'warning');
    check(fs.existsSync(path.join(buildDir, 'installer-header.bmp')), '安装程序头部图片存在', 'warning');
    check(fs.existsSync(path.join(buildDir, 'installer-sidebar.bmp')), '安装程序侧边栏图片存在', 'warning');

    console.log('\n4. 检查macOS资源文件...');
    check(fs.existsSync(path.join(buildDir, 'icon.icns')), 'macOS图标文件存在', 'warning');
    check(fs.existsSync(path.join(buildDir, 'dmg-background.png')), 'DMG背景图存在', 'warning');
    check(fs.existsSync(path.join(buildDir, 'entitlements.mac.plist')), 'macOS权限配置文件存在');

    console.log('\n5. 检查其他资源文件...');
    check(fs.existsSync(path.join(buildDir, 'license.txt')), '许可证文件存在');
    check(fs.existsSync(path.join(buildDir, 'installer.nsh')), 'NSIS安装脚本存在');
  }

  console.log('\n6. 检查源文件...');
  check(fs.existsSync(path.join(__dirname, '..', 'electron.cjs')), 'Electron主进程文件存在');
  check(fs.existsSync(path.join(__dirname, '..', 'package.json')), 'package.json文件存在');

  console.log('\n7. 检查依赖...');
  try {
    execSync('npm list --depth=0', { stdio: 'pipe' });
    console.log('✓ 依赖已安装');
  } catch (error) {
    console.warn('⚠ 依赖可能未完整安装,建议运行: npm install');
  }

  console.log('\n8. 检查Git状态...');
  try {
    const status = execSync('git status --porcelain', { encoding: 'utf-8' });
    if (status.trim()) {
      console.warn('⚠ 工作目录有未提交的更改');
    } else {
      console.log('✓ 工作目录干净');
    }
  } catch (error) {
    console.warn('⚠ 无法检查Git状态');
  }

  console.log('\n========================================');
  if (hasErrors) {
    console.log('检查失败!请修复错误后再打包。');
    console.log('========================================\n');
    process.exit(1);
  } else if (hasWarnings) {
    console.log('检查完成,但存在警告。可以继续打包,但建议修复警告。');
    console.log('========================================\n');
  } else {
    console.log('检查完成!所有检查通过,可以开始打包。');
    console.log('========================================\n');
  }

} catch (error) {
  console.error('\n检查过程中发生错误:');
  console.error(error.message);
  process.exit(1);
}
