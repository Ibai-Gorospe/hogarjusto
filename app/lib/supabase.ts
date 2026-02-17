import { createClient } from "@supabase/supabase-js";

// Variables de entorno públicas (disponibles en el navegador)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Cliente de Supabase — se usa en toda la app
// El "!" le dice a TypeScript que las variables siempre existirán
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
