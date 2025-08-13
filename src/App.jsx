import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [gameState, setGameState] = useState('menu') // menu, playing, battle, caught
  const [playerStats, setPlayerStats] = useState({
    level: 1,
    experience: 0,
    pokemonCaught: 0,
    pokeballs: 10,
    health: 100,
    maxHealth: 100
  })
  const [currentLocation, setCurrentLocation] = useState('pallet-town')
  const [wildPokemon, setWildPokemon] = useState(null)
  const [battleState, setBattleState] = useState(null)
  const [caughtPokemon, setCaughtPokemon] = useState([])
  const [gameMessage, setGameMessage] = useState('')

  const locations = {
    'pallet-town': {
      name: 'Pallet Town',
      description: 'A peaceful town where your adventure begins',
      pokemon: ['pikachu', 'rattata', 'pidgey'],
      image: '🌳'
    },
    'viridian-forest': {
      name: 'Viridian Forest',
      description: 'A dense forest filled with Bug and Grass Pokemon',
      pokemon: ['caterpie', 'weedle', 'pidgey', 'bulbasaur'],
      image: '🌲'
    },
    'pewter-city': {
      name: 'Pewter City',
      description: 'A city known for its Pokemon Gym and museum',
      pokemon: ['geodude', 'onix', 'sandshrew'],
      image: '🏛️'
    },
    'cerulean-city': {
      name: 'Cerulean City',
      description: 'A beautiful city by the sea',
      pokemon: ['squirtle', 'psyduck', 'goldeen', 'staryu'],
      image: '🌊'
    }
  }

  const pokemonDatabase = {
    pikachu: { id: 25, name: 'Pikachu', type: 'Electric', hp: 35, attack: 55, defense: 40, speed: 90, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png' },
    charizard: { id: 6, name: 'Charizard', type: 'Fire/Flying', hp: 78, attack: 84, defense: 78, speed: 100, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png' },
    blastoise: { id: 9, name: 'Blastoise', type: 'Water', hp: 79, attack: 83, defense: 100, speed: 78, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png' },
    mewtwo: { id: 150, name: 'Mewtwo', type: 'Psychic', hp: 106, attack: 110, defense: 90, speed: 130, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png' },
    dragonite: { id: 149, name: 'Dragonite', type: 'Dragon/Flying', hp: 91, attack: 134, defense: 95, speed: 80, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png' },
    gengar: { id: 94, name: 'Gengar', type: 'Ghost/Poison', hp: 60, attack: 65, defense: 60, speed: 110, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png' },
    rattata: { id: 19, name: 'Rattata', type: 'Normal', hp: 30, attack: 56, defense: 35, speed: 72, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/19.png' },
    pidgey: { id: 16, name: 'Pidgey', type: 'Normal/Flying', hp: 40, attack: 45, defense: 40, speed: 56, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/16.png' },
    caterpie: { id: 10, name: 'Caterpie', type: 'Bug', hp: 45, attack: 30, defense: 35, speed: 45, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10.png' },
    weedle: { id: 13, name: 'Weedle', type: 'Bug/Poison', hp: 40, attack: 35, defense: 30, speed: 50, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/13.png' },
    bulbasaur: { id: 1, name: 'Bulbasaur', type: 'Grass/Poison', hp: 45, attack: 49, defense: 49, speed: 45, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png' },
    geodude: { id: 74, name: 'Geodude', type: 'Rock/Ground', hp: 40, attack: 80, defense: 100, speed: 20, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/74.png' },
    onix: { id: 95, name: 'Onix', type: 'Rock/Ground', hp: 35, attack: 45, defense: 160, speed: 70, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/95.png' },
    sandshrew: { id: 27, name: 'Sandshrew', type: 'Ground', hp: 50, attack: 75, defense: 85, speed: 40, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/27.png' },
    squirtle: { id: 7, name: 'Squirtle', type: 'Water', hp: 44, attack: 48, defense: 65, speed: 43, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png' },
    psyduck: { id: 54, name: 'Psyduck', type: 'Water', hp: 50, attack: 52, defense: 48, speed: 55, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/54.png' },
    goldeen: { id: 118, name: 'Goldeen', type: 'Water', hp: 45, attack: 67, defense: 60, speed: 63, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/118.png' },
    staryu: { id: 120, name: 'Staryu', type: 'Water', hp: 30, attack: 45, defense: 55, speed: 85, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/120.png' }
  }

  const startGame = () => {
    setGameState('playing')
    setGameMessage('Welcome to your Pokemon adventure! Explore different locations to find and catch Pokemon.')
  }

  const exploreLocation = () => {
    const location = locations[currentLocation]
    const randomPokemon = location.pokemon[Math.floor(Math.random() * location.pokemon.length)]
    const pokemon = pokemonDatabase[randomPokemon]
    
    setWildPokemon(pokemon)
    setGameState('battle')
    setGameMessage(`A wild ${pokemon.name} appeared!`)
  }

  const catchPokemon = async () => {
    if (playerStats.pokeballs <= 0) {
      setGameMessage("You're out of Pokeballs!")
      return
    }

    const catchRate = Math.random()
    const successRate = 0.6 // 60% chance to catch

    if (catchRate < successRate) {
      setCaughtPokemon([...caughtPokemon, wildPokemon])
      setPlayerStats({
        ...playerStats,
        pokeballs: playerStats.pokeballs - 1,
        pokemonCaught: playerStats.pokemonCaught + 1,
        experience: playerStats.experience + 50
      })
      setGameMessage(`Gotcha! ${wildPokemon.name} was caught!`)
      setGameState('caught')
      await fetch('/api/catch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerName: "Darwin",
          pokemonName: wildPokemon.name
        })
      });

    } else {
      setPlayerStats({
        ...playerStats,
        pokeballs: playerStats.pokeballs - 1
      })
      setGameMessage(`${wildPokemon.name} broke free!`)
      setGameState('playing')
    }
    setWildPokemon(null)
  }

  const runFromBattle = () => {
    setWildPokemon(null)
    setGameState('playing')
    setGameMessage('Got away safely!')
  }

  const changeLocation = (newLocation) => {
    setCurrentLocation(newLocation)
    setGameMessage(`You traveled to ${locations[newLocation].name}`)
  }

  const buyPokeballs = () => {
    if (playerStats.experience >= 20) {
      setPlayerStats({
        ...playerStats,
        pokeballs: playerStats.pokeballs + 5,
        experience: playerStats.experience - 20
      })
      setGameMessage('Bought 5 Pokeballs for 20 experience points!')
    } else {
      setGameMessage('Not enough experience points!')
    }
  }

  const healPlayer = () => {
    if (playerStats.experience >= 30) {
      setPlayerStats({
        ...playerStats,
        health: playerStats.maxHealth,
        experience: playerStats.experience - 30
      })
      setGameMessage('You feel refreshed! Health restored.')
    } else {
      setGameMessage('Not enough experience points!')
    }
  }

  // Level up system
  useEffect(() => {
    const newLevel = Math.floor(playerStats.experience / 100) + 1
    if (newLevel > playerStats.level) {
      setPlayerStats(prev => ({
        ...prev,
        level: newLevel,
        maxHealth: prev.maxHealth + 20,
        health: prev.maxHealth + 20
      }))
      setGameMessage(`Level up! You are now level ${newLevel}!`)
    }
  }, [playerStats.experience])

  if (gameState === 'menu') {
    return (
      <div className="pokemon-app">
        <div className="game-menu">
          <div className="menu-content">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" alt="Pokeball" className="menu-pokeball" />
            <h1>Pokemon Adventure</h1>
            <p>Embark on an epic journey to become a Pokemon Master!</p>
            <button className="btn-primary" onClick={startGame}>Start Adventure</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pokemon-app">
      {/* Game Header */}
      <header className="game-header">
        <div className="player-stats">
          <div className="stat">
            <span>Level: {playerStats.level}</span>
          </div>
          <div className="stat">
            <span>EXP: {playerStats.experience}</span>
          </div>
          <div className="stat">
            <span>HP: {playerStats.health}/{playerStats.maxHealth}</span>
          </div>
          <div className="stat">
            <span>Pokeballs: {playerStats.pokeballs}</span>
          </div>
          <div className="stat">
            <span>Caught: {playerStats.pokemonCaught}</span>
          </div>
        </div>
      </header>

      {/* Game Message */}
      {gameMessage && (
        <div className="game-message">
          <p>{gameMessage}</p>
        </div>
      )}

      {/* Main Game Area */}
      <main className="game-main">
        {gameState === 'playing' && (
          <div className="location-view">
            <div className="location-info">
              <h2>{locations[currentLocation].name}</h2>
              <div className="location-icon">{locations[currentLocation].image}</div>
              <p>{locations[currentLocation].description}</p>
            </div>
            
            <div className="game-actions">
              <button className="btn-primary" onClick={exploreLocation}>
                Explore for Pokemon
              </button>
              
              <div className="location-buttons">
                <h3>Travel to:</h3>
                {Object.keys(locations).map(location => (
                  <button 
                    key={location}
                    className="btn-secondary"
                    onClick={() => changeLocation(location)}
                  >
                    {locations[location].name}
                  </button>
                ))}
              </div>

              <div className="shop-actions">
                <h3>Shop:</h3>
                <button className="btn-secondary" onClick={buyPokeballs}>
                  Buy Pokeballs (20 EXP)
                </button>
                <button className="btn-secondary" onClick={healPlayer}>
                  Heal (30 EXP)
                </button>
              </div>
            </div>
          </div>
        )}

        {gameState === 'battle' && wildPokemon && (
          <div className="battle-screen">
            <div className="wild-pokemon">
              <img src={wildPokemon.image} alt={wildPokemon.name} />
              <h2>Wild {wildPokemon.name}</h2>
              <p>Type: {wildPokemon.type}</p>
              <p>HP: {wildPokemon.hp} | Attack: {wildPokemon.attack} | Defense: {wildPokemon.defense}</p>
            </div>
            
            <div className="battle-actions">
              <button className="btn-primary" onClick={catchPokemon}>
                Throw Pokeball
              </button>
              <button className="btn-secondary" onClick={runFromBattle}>
                Run Away
              </button>
            </div>
          </div>
        )}

        {gameState === 'caught' && (
          <div className="caught-screen">
            <h2>Pokemon Caught!</h2>
            <p>You successfully caught a Pokemon!</p>
            <button className="btn-primary" onClick={() => setGameState('playing')}>
              Continue Exploring
            </button>
          </div>
        )}
      </main>

      {/* Pokedex */}
      {caughtPokemon.length > 0 && (
        <section className="pokedex-section">
          <h2>Your Pokedex ({caughtPokemon.length} Pokemon)</h2>
          <div className="pokemon-grid">
            {caughtPokemon.map((pokemon) => (
              <div key={pokemon.id} className="pokemon-card">
                <div className="pokemon-image">
                  <img src={pokemon.image} alt={pokemon.name} />
                </div>
                <div className="pokemon-info">
                  <h3 className="pokemon-name">{pokemon.name}</h3>
                  <span className="pokemon-type">{pokemon.type}</span>
                  <p className="pokemon-number">#{pokemon.id.toString().padStart(3, '0')}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="pokemon-footer">
        <div className="footer-content">
          <p>&copy; 2024 Pokemon Adventure Game. Gotta catch 'em all!</p>
        </div>
      </footer>
    </div>
  )
}

export default App
