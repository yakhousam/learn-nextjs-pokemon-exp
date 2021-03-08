import Link from "next/link";
import Image from "next/image";
import styles from "./index.module.css";
// these are the endpoints we will use
// -https://pokeapi.co/api/v2/pokemon
// -https://pokeres.bastionbot.org/images/pokemon/1.png

//display a list of pokemon cards in one page (index page). not every pokemon on its page. useEffect to fetch the data.
//card has name number type image
import React, { useState, useEffect } from "react";

function Home() {
  const [pokemonData, setPokemonData] = useState([]);
  useEffect(async () => {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon");
    const pokemons = await res.json();
    const { results } = pokemons;
    console.log(results, "res");
    let data = await Promise.all(
      results.map(async (pokemon) => {
        let pokemonRecord = await fetch(pokemon.url).then((response) =>
          response.json()
        );
        return pokemonRecord;
      })
    );
    setPokemonData(data);
  }, []);

  return (
    <div className="container">
      <main class="main">
        <h1 className="title">Pokiemons</h1>
        <p className="description">click on a pokemon to view his page</p>
        <div className="">
          <ul className="no-bullets grid">
            {console.log(pokemonData, "da")}
            {pokemonData.map((pokiemon, idx) => (
              <li key={idx} className="card">
                <img
                  src={`https://pokeres.bastionbot.org/images/pokemon/${
                    idx + 1
                  }.png`}
                  alt={pokiemon.name}
                  width="200"
                  height="200"
                />
                <h2>
                  {idx + 1}. {pokiemon.name}
                </h2>
                <p>
                  {" "}
                  {pokiemon.types.forEach((element) => {
                    return element.type.name;
                  })}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}

// export async function getStaticProps() {
//   const res = await fetch("https://pokeapi.co/api/v2/pokemon");
//   const pokemons = await res.json();
//   return {
//     props: {
//       pokemons,
//     },
//   };
// }

export default Home;
