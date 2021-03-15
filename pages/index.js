import useSwr from "swr";

async function fetcher(url) {
  // if you change the tab on your browser and go back you will see this line printed on the console
  // that means useSwr fetch and revalidate the data
  console.log("fetcher is fetching");
  try {
    const pokemonsArray = [];
    const res = await fetch(url);
    const { results: pokemons } = await res.json();

    for (const pokemon of pokemons) {
      const res = await fetch(pokemon.url);
      const { id, name, types } = await res.json();
      pokemonsArray.push({
        id,
        name,
        image_url: `https://pokeres.bastionbot.org/images/pokemon/${id}.png`,
        types,
      });
    }
    return pokemonsArray;
  } catch (error) {
    // we rethrow the error so it can be catched by useSwr
    throw error;
  }
}

function Home() {
  const {
    data: pokemonData,
    error,
  } = useSwr("https://pokeapi.co/api/v2/pokemon", (url) => fetcher(url));

  // the code bellow is what I use to display the data in the browser rather than using console.log
  // if (true) return <pre>{JSON.stringify(pokemonData, null, 2)}</pre>;

  if (error) return <div>something went wrong</div>;

  if (!pokemonData) return <div>Loading.............</div>;

  return (
    <div className="container">
      <main className="main">
        <h1 className="title">Pokiemons</h1>
        <p className="description">click on a pokemon to view his page</p>
        <div>
          {!pokemonData ? (
            <div>Loading....</div>
          ) : (
            <ul className="no-bullets grid">
              {pokemonData.map((pokemon) => (
                <li key={pokemon.id} className="card">
                  <img
                    src={pokemon.image_url}
                    alt={pokemon.name}
                    width="200"
                    height="200"
                  />
                  <h2>
                    #{pokemon.id}
                    <br />
                    {pokemon.name}
                  </h2>
                  <ul>
                    {pokemon.types.map(({ slot, type }) => (
                      <li key={slot}>{type.name}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

      <style jsx>{`
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
