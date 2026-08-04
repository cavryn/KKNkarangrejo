// Script: Fix Storage Bucket - Set kkn-media as Public
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Load .env.local
const envPath = path.join(process.cwd(), '.env.local');
const envVars = {};
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) envVars[key.trim()] = value.trim();
  });
}

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function fixBucket() {
  console.log('=== MEMPERBAIKI BUCKET KKN-MEDIA ===\n');

  // 1. Coba update bucket yang sudah ada menjadi public
  console.log('1. Mencoba update bucket "kkn-media" → public...');
  const { data: updateData, error: updateErr } = await supabase.storage.updateBucket('kkn-media', {
    public: true,
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
    fileSizeLimit: 10485760 // 10MB
  });

  if (updateErr) {
    console.log('   ⚠️ Update gagal:', updateErr.message);
    
    // Mungkin bucket belum dibuat, coba buat baru
    console.log('\n2. Mencoba membuat bucket baru "kkn-media" (public)...');
    const { data: createData, error: createErr } = await supabase.storage.createBucket('kkn-media', {
      public: true,
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
      fileSizeLimit: 10485760
    });

    if (createErr) {
      console.error('   ❌ Gagal membuat bucket:', createErr.message);
      console.log('\n⚠️ SOLUSI MANUAL: Buka Supabase Dashboard → Storage → klik bucket "kkn-media" → Settings → centang "Public bucket" → Save');
    } else {
      console.log('   ✅ Bucket berhasil dibuat sebagai public!');
    }
  } else {
    console.log('   ✅ Bucket berhasil di-update ke public!');
  }

  // 3. Verifikasi
  console.log('\n3. Verifikasi...');
  const { data: buckets } = await supabase.storage.listBuckets();
  const kknBucket = buckets?.find(b => b.id === 'kkn-media');
  if (kknBucket) {
    console.log('   Bucket info:', JSON.stringify(kknBucket, null, 2));
    console.log('   Public:', kknBucket.public ? '✅ YA' : '❌ TIDAK');
  } else {
    console.log('   ❌ Bucket masih tidak terdeteksi di listing');
  }

  // 4. Test URL akses
  console.log('\n4. Test upload & akses ulang...');
  const testContent = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]);
  const testFile = `test/verify-${Date.now()}.bin`;
  
  const { error: upErr } = await supabase.storage.from('kkn-media').upload(testFile, testContent);
  if (!upErr) {
    const { data: urlData } = supabase.storage.from('kkn-media').getPublicUrl(testFile);
    try {
      const res = await fetch(urlData.publicUrl);
      console.log(`   Public URL status: ${res.status} ${res.statusText}`);
      if (res.ok) console.log('   ✅ BERHASIL! Gambar sekarang bisa diakses publik.');
      else console.log('   ❌ Masih belum bisa diakses. Perlu set manual di dashboard.');
    } catch (e) {
      console.log('   ❌ Fetch error:', e.message);
    }
    await supabase.storage.from('kkn-media').remove([testFile]);
  }

  console.log('\n=== SELESAI ===');
}

fixBucket().catch(console.error);
