import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { playerName, pokemonName } = req.body;

    if (!playerName || !pokemonName) {
      return res.status(400).json({ error: 'Missing playerName or pokemonName' });
    }

    const { data, error } = await supabase
      .from('catches')
      .insert([{ player_name: playerName, pokemon_name: pokemonName }]);

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (err) {
    console.error(err); // <--- check logs
    res.status(500).json({ error: 'Failed to record catch', details: err.message });
  }
}

