import { createClient } from '@supabase/supabase-js';

// Baca dari environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('your-supabase-id'));

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

// Helper Function untuk Upload Foto Ke Supabase Storage
export async function uploadImage(file, bucketName = 'kkn-media') {
  if (!file) return null;

  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase belum dikonfigurasi. Tidak bisa mengunggah foto.');
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
  const filePath = `documentation/${fileName}`;

  const { data, error } = await supabase.storage.from(bucketName).upload(filePath, file);
  if (error) throw new Error(`Upload gagal: ${error.message}`);

  const { data: publicUrlData } = supabase.storage.from(bucketName).getPublicUrl(filePath);
  return publicUrlData.publicUrl;
}
