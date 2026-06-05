import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: '/Users/sridharsilver/Documents/Websites/Signova-v4/Signova-Admin-v4-master/.env' });

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function test() {
  const { data: p1 } = await supabase.from('products').select('id, slug, qr_data').limit(1).single();
  console.log("Before:", p1);

  const { error } = await supabase.from('products').update({ qr_data: "TEST UPDATE" }).eq('id', p1.id);
  console.log("Update error:", error);

  const { data: p2 } = await supabase.from('products').select('id, slug, qr_data').eq('id', p1.id).single();
  console.log("After:", p2);
}
test();
