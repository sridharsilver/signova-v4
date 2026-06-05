import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data: products, error: pError } = await supabase.from('products').select('*');
  const { data: cats, error: cError } = await supabase.from('product_categories').select('*');
  
  console.log("Products:", products?.length, pError);
  console.log("Categories:", cats?.length, cError);
}
test();
