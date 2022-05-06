import { useEffect, useState } from "react";

import Card from "./components/Card";
import { FaTwitterSquare } from "react-icons/fa";

import starterData from "./data/starter";
import Pokemon from "./components/Pokemon";
import smashAudio from "./audio/smash.mp3";
import passAudio from "./audio/pass.mp3";

function App() {
  const [audio, setAudio] = useState({
    smash: {
      sound: new Audio(smashAudio),
      isPlaying: false,
    },
    pass: {
      sound: new Audio(passAudio),
      isPlaying: false,
    },
  });
  const [counter, setCounter] = useState(1);
  const [pokemon, setPokemon] = useState(starterData);
  const [action, setAction] = useState({
    smash: {
      count: 0,
      pokemon: [],
    },
    pass: {
      count: 0,
      pokemon: [],
    },
  });

  useEffect(() => {
    const api = async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${counter}`);
      const api = await res.json();
      setPokemon(api);
    };

    api();
  }, [counter]);

  const handleCounter = (event) => {
    const { name } = event.target;
    const currentAudio = audio[name];
    setAudio((oldAudio) => ({
      ...oldAudio,
      [name]: { ...oldAudio[name], isPlaying: true },
    }));
    if (currentAudio.isPlaying) {
      currentAudio.sound.pause();
    } else {
      currentAudio.sound.play();
    }

    if (counter >= 898) {
      setCounter(1);
    } else {
      setCounter((oldVal) => oldVal + 1);
    }

    setAction((oldValue) => ({
      ...oldValue,
      [name]: {
        count: oldValue[name].count + 1,
        pokemon: [
          ...oldValue[name].pokemon,
          {
            name: pokemon.forms[0].name,
            img: pokemon.sprites.versions["generation-v"]["black-white"][
              "animated"
            ].front_default,
          },
        ],
      },
    }));
  };

  const switchIsPlaying = (event) => {
    const { name } = event.target;
    setAudio((oldAudio) => ({
      ...oldAudio,
      [name]: { ...oldAudio[name], isPlaying: false },
    }));
  };

  return (
    <div className="container">
      <div className="title">
        <h1>ポケットモンスター</h1>
        <h3>SMASH OR PASS</h3>
      </div>
      <Card pokemon={pokemon} />
      <h2 id="total-pokemon">
        Pokemon <span>{counter}</span> of 898
      </h2>
      <div className="buttons">
        <button name="pass" onClick={handleCounter} onMouseUp={switchIsPlaying}>
          {action.pass.count} PASS
        </button>
        <button
          name="smash"
          onClick={handleCounter}
          onMouseUp={switchIsPlaying}
        >
          {action.smash.count} SMASH
        </button>
      </div>
      <footer>
        <span>putu mahendra</span>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://twitter.com/u2twop"
        >
          <FaTwitterSquare />
        </a>
      </footer>
      <div className="pokemon-container">
        <Pokemon picked={action.pass.pokemon} />
        <Pokemon picked={action.smash.pokemon} />
      </div>
    </div>
  );
}

export default App;
