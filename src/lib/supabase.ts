import { createClient } from '@supabase/supabase-js'

const supabaseURL = import.meta.env.VITE_SUPABASE_URL
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

if (!supabaseURL || !supabasePublishableKey) {
  throw new Error(
    'Configuration Supabase manquante: vérifier votre fichier .env.local',
  )
}

/**
 * Client Supabase partagé pour l’authentification et les accès aux données.
 * Utilise uniquement l’URL du projet et sa clé publique navigateur.
 */
export const supabase = createClient(supabaseURL, supabasePublishableKey)
