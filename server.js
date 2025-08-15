import 'dotenv/config'; // automatically calls config()
import express from 'express';
import { createClient } from '@supabase/supabase-js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.post('/api/catch', async (req, res) => {
  const { playerName, pokemonName } = req.body;
  if (!playerName || !pokemonName)
    return res.status(400).json({ error: 'Missing data' });

  try {
    const { data, error } = await supabase
      .from('catches')
      .insert([{ player_name: playerName, pokemon_name: pokemonName }]);
    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (err) {
    console.error('Supabase insert error:', err);
    res.status(500).json({ error: 'Failed to insert catch', details: err.message });
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));


app.get('/env-test', (req, res) => {
  res.json({
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_KEY: process.env.SUPABASE_KEY ? 'Exists' : 'Missing'
  });
});
