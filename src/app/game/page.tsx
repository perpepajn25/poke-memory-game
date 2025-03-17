'use client'

import { useEffect, useState } from "react";

interface PokemonCard {
  id: string;
  name: string;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const Game = () => {
  const [cards, setCards] = useState<PokemonCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [attempts, setAttempts] = useState<number>(0);

  const pairs = 6

  // fetch random Pokémon and create shuffled card pairs
  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      // fetch all available Pokémon
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1302');
      const data: { results: { name: string; url: string }[] } = await response.json();
    
      // shuffle and pick x Pokémon
      const randomPokemon = data.results.sort(() => Math.random() - 0.5).slice(0, pairs);

      // fetch selected Pokémon
      const responses = await Promise.all(
        randomPokemon.map((pokemon: { name: string; url: string }) =>
          fetch(pokemon.url)
        )
      );
      const pokemonData = await Promise.all(responses.map(res => res.json()));

      // create card pairs
      const pokemonCards = pokemonData.flatMap((pokemon, index) => {
        return [
          {
            id: pokemon.id + 'a',
            name: pokemon.name,
            image: pokemon.sprites.front_default,
            isFlipped: false,
            isMatched: false,
          },
          {
            id: pokemon.id + 'b',
            name: pokemon.name,
            image: pokemon.sprites.front_default,
            isFlipped: false,
            isMatched: false,
          },
        ];
      });

      // shuffle cards
      setCards(pokemonCards.sort(() => Math.random() - 0.5));
      setLoading(false);
    };

    fetchPokemon();
  }, []);

  // handle reset game
  const handleResetGame = () => {
    const resetCards = cards.map(card => ({
      ...card,
      isFlipped: false,
      isMatched: false
    }))

    setCards(resetCards.sort(() => Math.random() - 0.5));
    setFlippedCards([]);
    setAttempts(0)
  };
  
  // handle card flip
  const handleFlip = (id: string) => {
    if (flippedCards.length === 2) return;

    const updatedCards = cards.map((card) =>
      card.id === id ? { ...card, isFlipped: true } : card
    );
    setCards(updatedCards);

    const currentFlippedCards = [...flippedCards, id];
    setFlippedCards(currentFlippedCards);

    if (currentFlippedCards.length === 2) {
      checkMatch(currentFlippedCards);
    }
  };


  // check for match
  const checkMatch = (flippedCards: string[]) => {
    const [firstId, secondId] = flippedCards;
    
    setAttempts(prev => prev + 1);
  
    setTimeout(() => {
      if (firstId.slice(0, -1) === secondId.slice(0, -1)) {
        // set isMatched field for cards and increment matchedPairs count

        setMatchedPairs(prev => prev + 1);
        setCards(prevCards => prevCards.map(card => 
          [firstId, secondId].includes(card.id) ? { ...card, isMatched: true } : card
        ));
      } else {
          // reset isFlipped field for cards
          setCards(prevCards => prevCards.map(card => 
            [firstId, secondId].includes(card.id) ? { ...card, isFlipped: false } : card
          ));
      }

      setFlippedCards([]);
    }, 2000);
  };
  
  return (
    <div className="flex flex-col items-center pt-8">
      <div className="bg-red-600 p-8 rounded-lg">
      <h1 className="text-3xl text-center font-bold mb-4 text-yellow-300">Pokémon Memory Match</h1>
      <button className="px-3 py-1 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-800 block mx-auto m-4 "
       onClick={handleResetGame}>
            Reset Game
          </button>
      <p  className="text-center font-bold mb-4 text-white bg-red-800 rounded-lg">Attempts: {attempts}</p>
      {cards.length > 0 && matchedPairs === pairs && (
        <h2 className="mt-4 font-bold text-xl text-center mb-4 bg-yellow-300 text-indigo-600 rounded-lg"> You win! </h2>
      )}
      <div className="grid grid-cols-4 gap-4">
      {loading ? Array(pairs * 2).fill(null).map((_, index) => (
          <div key={index} className="w-34 h-48 border rounded-lg flex justify-center items-center bg-white">
             <div className="w-20 h-20">
              <img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png' alt='pokeball' className="w-20 h-20" />
             </div>
          </div>
        ))
      : cards.map(card => (
          <div
            key={card.id}
            className={`w-34 h-48 border rounded-lg flex justify-center items-center bg-white ${
              card.isMatched ? "opacity-50" : "cursor-pointer"
            }`}
            onClick={() => !card.isFlipped && !card.isMatched && handleFlip(card.id)}
          >
            {card.isFlipped || card.isMatched ? (
              <div className="flex flex-col items-center gap-y-1 text-center">
                <p className="font-bold text-sm">{card.name}</p>
                <img src={card.image} alt={card.name} className="w-20 h-20" />
              </div>
            ) : (
              <img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png' alt='pokeball' className="w-20 h-20" />
            )}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Game;