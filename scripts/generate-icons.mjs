import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import png2icons from 'png2icons';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const publicDir = path.join(rootDir, 'public');
const buildDir = path.join(rootDir, 'build');

async function generateIcons() {
  try {
    console.log('开始生成图标...');

    const svgPath = path.join(publicDir, 'vite.svg');
    const pngPath = path.join(buildDir, 'icon.png');
    const icnsPath = path.join(buildDir, 'icon.icns');
    const icoPath = path.join(buildDir, 'icon.ico');

    if (!fs.existsSync(buildDir)) {
      fs.mkdirSync(buildDir, { recursive: true });
    }

    console.log('1. 将 SVG 转换为 PNG (1024x1024)...');
    await sharp(svgPath)
      .resize(1024, 1024)
      .png()
      .toFile(pngPath);
    console.log('   ✓ PNG 生成成功');

    console.log('2. 生成 ICNS 文件 (macOS)...');
    const pngBuffer = fs.readFileSync(pngPath);
    const icnsBuffer = png2icons.createICNS(pngBuffer, png2icons.BICUBIC);
    fs.writeFileSync(icnsPath, icnsBuffer);
    console.log('   ✓ ICNS 生成成功');

    console.log('3. 生成 ICO 文件 (Windows)...');
    const icoBuffer = png2icons.createICO(pngBuffer, png2icons.BICUBIC);
    fs.writeFileSync(icoPath, icoBuffer);
    console.log('   ✓ ICO 生成成功');

    console.log('\n✓ 所有图标生成完成！');
    console.log(`  - ${pngPath}`);
    console.log(`  - ${icnsPath}`);
    console.log(`  - ${icoPath}`);

  } catch (error) {
    console.error('生成图标失败:', error);
    process.exit(1);
  }
}

generateIcons();
