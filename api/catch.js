import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { playerName, pokemonName } = req.body;

    const { data, error } = await supabase
      .from('catches')
      .insert([{ player_name: playerName, pokemon_name: pokemonName }]);

    if (error) return res.status(500).json({ error: error.message });

    return res.status(200).json({ success: true, data });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
