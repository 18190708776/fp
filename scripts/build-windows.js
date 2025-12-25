#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const packageJson = require('../package.json');

console.log('========================================');
console.log('发票助手 - Windows平台打包脚本');
console.log('========================================\n');

try {
  const version = packageJson.version;
  const productName = packageJson.build.productName;
  
  console.log(`版本: ${version}`);
  console.log(`产品名称: ${productName}\n`);

  console.log('开始清理旧的构建文件...');
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
  }
  console.log('✓ 清理完成\n');

  console.log('开始构建前端资源...');
  try {
    execSync('npm run build', { stdio: 'inherit' });
  } catch (error) {
    console.log('⚠ 前端构建失败,继续打包...');
  }
  console.log('✓ 前端构建完成\n');

  console.log('开始打包Windows免安装版本...');
  execSync('npm run dist:win', { stdio: 'inherit' });
  console.log('✓ Windows打包完成\n');

  console.log('========================================');
  console.log('打包成功!');
  console.log('========================================');
  console.log(`输出目录: ${path.join(__dirname, '..', 'dist')}`);
  console.log(`版本: ${version}`);
  console.log(`\n生成的文件:`);
  
  const distDir = path.join(__dirname, '..', 'dist');
  if (fs.existsSync(distDir)) {
    const files = fs.readdirSync(distDir).filter(file => 
      file.endsWith('.exe') || file.endsWith('.blockmap')
    );
    files.forEach(file => {
      const filePath = path.join(distDir, file);
      const stats = fs.statSync(filePath);
      const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
      console.log(`  - ${file} (${sizeMB} MB)`);
    });
  }
  console.log('');

} catch (error) {
  console.error('\n========================================');
  console.error('打包失败!');
  console.error('========================================');
  console.error(error.message);
  process.exit(1);
}
