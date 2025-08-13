// catch.cjs
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { playerName, pokemonName } = req.body;

  if (!playerName || !pokemonName) return res.status(400).json({ error: 'Missing data' });

  try {
    const { data, error } = await supabase
      .from('catches')
      .insert([{ player_name: playerName, pokemon_name: pokemonName }]);
    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Supabase insert failed', details: err.message });
  }
};
