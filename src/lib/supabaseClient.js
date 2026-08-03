import { createClient } from '@supabase/supabase-js';

// Baca dari environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('your-supabase-id'));

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

// Helper Function untuk Upload Foto Ke Supabase Storage atau Base64 Fallback
export async function uploadImage(file, bucketName = 'kkn-media') {
  if (!file) return null;

  if (isSupabaseConfigured && supabase) {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `documentation/${fileName}`;

      const { data, error } = await supabase.storage.from(bucketName).upload(filePath, file);
      if (error) throw error;

      const { data: publicUrlData } = supabase.storage.from(bucketName).getPublicUrl(filePath);
      return publicUrlData.publicUrl;
    } catch (err) {
      console.warn("Upload ke Supabase storage gagal, menggunakan local FileReader URL:", err.message);
    }
  }

  // Fallback ke Data URL untuk preview lokal
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}
