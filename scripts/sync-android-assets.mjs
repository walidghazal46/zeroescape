import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

const distDir = path.join(root, 'dist');
const distAssetsDir = path.join(distDir, 'assets');
const appAssetsDir = path.join(root, 'app', 'src', 'main', 'assets');
const appAssetsAssetsDir = path.join(appAssetsDir, 'assets');

const ensureExists = async (targetPath) => {
  try {
    await fs.access(targetPath);
  } catch {
    throw new Error(`Missing path: ${targetPath}. Run npm run build first.`);
  }
};

const copyDir = async (from, to) => {
  await fs.mkdir(to, { recursive: true });
  await fs.cp(from, to, { recursive: true, force: true });
};

const main = async () => {
  await ensureExists(distDir);
  await ensureExists(distAssetsDir);

  await fs.mkdir(appAssetsDir, { recursive: true });

  // Keep Android assets exactly in sync with the latest web build.
  await fs.rm(appAssetsAssetsDir, { recursive: true, force: true });
  await copyDir(distAssetsDir, appAssetsAssetsDir);

  const distIndexPath = path.join(distDir, 'index.html');
  const appIndexPath = path.join(appAssetsDir, 'index.html');

  const indexHtml = await fs.readFile(distIndexPath, 'utf8');
  const normalizedIndexHtml = indexHtml
    .replace(/href="\/icon\.png"/g, 'href="icon.png"')
    .replace(/src="\/icon\.png"/g, 'src="icon.png"');

  await fs.writeFile(appIndexPath, normalizedIndexHtml, 'utf8');

  const distIconPath = path.join(distDir, 'icon.png');
  const publicIconPath = path.join(root, 'public', 'icon.png');
  const appIconPath = path.join(appAssetsDir, 'icon.png');

  try {
    await fs.copyFile(distIconPath, appIconPath);
  } catch {
    await fs.copyFile(publicIconPath, appIconPath);
  }

  console.log('Android assets synced from latest web build.');
};

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
