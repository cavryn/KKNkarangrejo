import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Load .env.local
const envPath = path.join(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) {
    envVars[key.trim()] = value.trim();
  }
});

const supabaseUrl = envVars['NEXT_PUBLIC_SUPABASE_URL'];
const supabaseAnonKey = envVars['NEXT_PUBLIC_SUPABASE_ANON_KEY'];

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function setupBucket() {
  console.log('Creating Storage Bucket "kkn-media"...');
  
  // Try to create bucket
  const { data, error } = await supabase.storage.createBucket('kkn-media', {
    public: true,
    fileSizeLimit: 10485760, // 10MB
    allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif']
  });

  if (error) {
    if (error.message.includes('already exists') || error.message.includes('duplicate')) {
      console.log('✓ Storage Bucket "kkn-media" already exists and is ready!');
    } else {
      console.log('Notice:', error.message);
      console.log('If API key lacks admin permissions to create bucket via script, bucket can be created manually in Supabase UI under Storage -> New Bucket -> "kkn-media" (Public).');
    }
  } else {
    console.log('✓ Storage Bucket "kkn-media" created successfully as Public!');
  }
}

setupBucket();
