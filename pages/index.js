import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import PokemonList from "../components/PokemonList";
import Pagination from "../components/Pagination";
function Home() {
  const router = useRouter();
  const initialPage = "https://pokeapi.co/api/v2/pokemon";
  const [pokemonData, setPokemonData] = useState([]);
  const [nextPage, setNextPage] = useState();
  const [currPage, setCurrPage] = useState(initialPage);
  const [prevPage, setPrev] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    let page = Number(router.query.page);
    console.log("page= ", page);
    if (page && page !== 0) {
      console.log("page was changed");
      let queryPage = page * 20;
      console.log(
        `${initialPage}?offset=${queryPage}&limit=20`,
        "querypage to change to"
      );
      setCurrPage(`${initialPage}?offset=${queryPage}&limit=20`);
    }
  }, [router.query]);

  useEffect(() => {
    const imgUrl = "https://pokeres.bastionbot.org/images/pokemon/";
    const holder = [];
    async function getData() {
      try {
        console.log(router.query, "router query params");
        console.log(currPage, "currPage");
        const res = await fetch(currPage);
        const pokemons = await res.json();
        setPrev(pokemons.previous);
        setNextPage(pokemons.next);
        const parsedUrl = new URL(currPage);
        const offset = Number(parsedUrl.searchParams.get("offset")) / 20;
        router.push(`/?page=${offset}`, undefined, { shallow: true });

        const { results } = pokemons;
        for (const value of results) {
          const result = await fetch(value.url);
          const pokemon = await result.json();
          holder.push({
            number: pokemon.id,
            name: pokemon.name,
            image_url: imgUrl + pokemon.id + ".png",
            types: pokemon.types,
          });
        }
        setPokemonData(holder);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, [currPage]);

  const Next = () => {
    setCurrPage(nextPage);
  };

  const Prev = () => {
    setCurrPage(prevPage);
  };

  if (isLoading) return "Loading the pokemons";
  return (
    <div className="container">
      <main className="main">
        <h1 className="title">Pokiemons</h1>
        <p className="description">click on a pokemon to view his page</p>
        <div className="">
          <Pagination Next={Next} Prev={Prev} prevPage={prevPage} />
          <PokemonList pokemonData={pokemonData} />
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
        .buttonText {
          font-size: 1.5em;
          font-weight: bold;
          text-align: center !important;
        }
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        a {
          color: inherit;
          text-decoration: none;
        }
        .title a {
          color: #0070f3;
          text-decoration: none;
        }
        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }
        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }
        .title,
        .description {
          text-align: center;
        }
        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          max-width: 800px;
          margin-top: 3rem;
        }
        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }
        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }
        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }
        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }
        .logo {
          height: 1em;
        }
        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
        ul.no-bullets {
          list-style-type: none; /* Remove bullets */
          padding: 0; /* Remove padding */
          margin: 0; /* Remove margins */
        }
      `}</style>
      <style jsx>{``}</style>
    </div>
  );
}

export default Home;
