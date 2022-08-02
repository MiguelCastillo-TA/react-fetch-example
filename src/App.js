import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [allPokemon, setAllPokemons] = useState([])
  const [currentPokemon, setCurrentPokemon] = useState({})

  useEffect(() => {
    console.log('useffect')
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0")
      .then(response => {
        return response.json();
      }).then(response => {
          console.log(response.results);
          setAllPokemons(response.results);
      }).catch(err=>{
          console.log(err);
      });
  }, [])

  const callPokemonDetails = (url) => {
    console.log(url)
    fetch(url)
    .then(response => {
      return response.json();
    }).then(response => {
        console.log(response);
        setCurrentPokemon(response)
    }).catch(err=>{
        console.log(err);
    });
  }

  return (
    <div className="App">
      <h1>HERE ARE ALL 151 POKEMON</h1>

      {Object.keys(currentPokemon).length > 0 ? 
        <div>
          <p>{currentPokemon.name}</p>
          <p>{currentPokemon.height}</p>
          <p>{currentPokemon.weight}</p>
        </div>
      : <p>no current pokemone</p>}
      {
        allPokemon.length > 0 ? allPokemon.map((pokemon) => {
          return(
            <div key={`${pokemon.name}`}>
              <p>{pokemon.name}</p>
              <button onClick={() => callPokemonDetails(pokemon.url)}>view more details</button>
            </div>
          )
        }) : <p>loading</p>
      }
    </div>
  );
}

export default App;
