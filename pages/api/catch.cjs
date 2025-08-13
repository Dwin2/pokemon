// catch.cjs
module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { playerName, pokemonName } = req.body;

  if (!playerName || !pokemonName) return res.status(400).json({ error: 'Missing data' });

  try {
    // Simple logging of the catch - in a real app you'd store this in a database
    console.log(`🎉 ${playerName} caught ${pokemonName}!`);
    
    // Return success response
    res.status(200).json({ 
      success: true, 
      message: `${playerName} successfully caught ${pokemonName}!`,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error('Catch logging error:', err);
    res.status(500).json({ error: 'Failed to log catch', details: err.message });
  }
};
