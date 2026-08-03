import fs from 'fs';
import path from 'path';

// Auto-copy logo files from /logo to /public/logo
try {
  const srcDir = path.join(process.cwd(), 'logo');
  const destDir = path.join(process.cwd(), 'public', 'logo');
  if (fs.existsSync(srcDir)) {
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    const files = fs.readdirSync(srcDir);
    files.forEach(file => {
      fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file));
    });
  }
} catch (e) {
  console.warn("Logo copy notice:", e.message);
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },
};

export default nextConfig;
