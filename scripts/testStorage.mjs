// Script diagnostik: Cek koneksi Supabase Storage
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

async function testStorage() {
  console.log('=== DIAGNOSTIK SUPABASE STORAGE ===\n');

  // 1. Cek apakah bucket 'kkn-media' ada
  console.log('1. Mengecek bucket "kkn-media"...');
  const { data: buckets, error: bucketsErr } = await supabase.storage.listBuckets();
  if (bucketsErr) {
    console.error('   ❌ Gagal mengambil daftar bucket:', bucketsErr.message);
  } else {
    const kknBucket = buckets.find(b => b.id === 'kkn-media');
    if (kknBucket) {
      console.log('   ✅ Bucket ditemukan:', JSON.stringify(kknBucket, null, 2));
      console.log('   📌 Public:', kknBucket.public);
    } else {
      console.log('   ❌ Bucket "kkn-media" TIDAK ditemukan!');
      console.log('   Bucket yang tersedia:', buckets.map(b => b.id));
    }
  }

  // 2. Coba upload file test kecil
  console.log('\n2. Mencoba upload file test...');
  const testContent = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]); // PNG header bytes
  const testFileName = `test/test-${Date.now()}.txt`;
  
  const { data: uploadData, error: uploadErr } = await supabase.storage
    .from('kkn-media')
    .upload(testFileName, testContent, { contentType: 'text/plain' });

  if (uploadErr) {
    console.error('   ❌ Upload GAGAL:', uploadErr.message);
    console.error('   Detail error:', JSON.stringify(uploadErr, null, 2));
  } else {
    console.log('   ✅ Upload berhasil! Path:', uploadData.path);

    // 3. Dapatkan public URL
    const { data: urlData } = supabase.storage
      .from('kkn-media')
      .getPublicUrl(testFileName);
    console.log('   🔗 Public URL:', urlData.publicUrl);

    // 4. Test akses URL
    console.log('\n3. Mencoba akses public URL...');
    try {
      const response = await fetch(urlData.publicUrl);
      console.log('   Status:', response.status, response.statusText);
      if (response.ok) {
        console.log('   ✅ URL bisa diakses publik!');
      } else {
        console.log('   ❌ URL TIDAK bisa diakses:', response.status);
      }
    } catch (fetchErr) {
      console.error('   ❌ Fetch error:', fetchErr.message);
    }

    // 5. Cleanup: hapus file test
    await supabase.storage.from('kkn-media').remove([testFileName]);
    console.log('   🧹 File test dihapus.');
  }

  // 4. Cek data image dari tabel proker
  console.log('\n4. Mengecek data image di tabel proker...');
  const { data: prokerData, error: prokerErr } = await supabase.from('proker').select('id, title, image');
  if (prokerErr) {
    console.error('   ❌ Gagal baca tabel proker:', prokerErr.message);
  } else {
    prokerData.forEach(p => {
      const imgPreview = p.image 
        ? (p.image.startsWith('data:') 
            ? `[BASE64 - ${p.image.length} chars]` 
            : p.image.substring(0, 100) + '...')
        : '[NULL/EMPTY]';
      console.log(`   ${p.id}: ${imgPreview}`);
    });
  }

  console.log('\n=== SELESAI ===');
}

testStorage().catch(console.error);
