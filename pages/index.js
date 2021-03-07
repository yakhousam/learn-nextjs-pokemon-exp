import Link from "next/link";
import Image from "next/image";
// these are the endpoints we will use
// -https://pokeapi.co/api/v2/pokemon
// -https://pokeres.bastionbot.org/images/pokemon/1.png

//display a list of pokemon cards in one page (index page). not every pokemon on its page. useEffect to fetch the data.
//card has name number type image
import React, { useState, useEffect } from "react";

function Home() {
  const [data, setData] = useState({ data: [], types: [] });
  // const [data, setData] = useState([]);
  // const [types, setType] = useState([]);
  // setState(prevState => {
  //   return {...prevState, ...updatedValues};
  // });

  //   setStyle(prevStyle => ({
  //     ...prevStyle,
  //     font: { ...prevStyle.font, align: event.target.value }
  // }));

  //   const styles = {
  //     font: {
  //         size: {
  //             value: '22',
  //             unit: 'px'
  //         },
  //         weight: 'bold',
  //         color: '#663300',
  //         family: 'arial',
  //         align: 'center'
  //     }
  // };
  useEffect(async () => {
    console.log("useEffect run");
    const res = await fetch("https://pokeapi.co/api/v2/pokemon");
    const pokemons = await res.json();
    const { results } = pokemons;
    setData({
      types: [],
      data: results,
    });
    results.forEach((pokemon) => {
      fetch(pokemon.url)
        .then((response) => response.json())
        .then((data) => {
          setData((prevData) => {
            return {
              ...prevData,
              types: [...prevData.types, data.types],
            };
          });
        });
    });
    // setData(results);
    // console.log(data, "data");
    // results.forEach((pokemon) => {
    //   console.log("url", pokemon.url);
    //   fetch(pokemon.url)
    //     .then((response) => response.json())
    //     .then((data) => {
    //       console.log(data.types);
    //       setType(data.types);
    //     });
    // });
  }, []);

  return (
    <div className="container">
      <main>
        <h1 className="title">Pokiemons</h1>
        <p className="description">click on a pokemon to view his page</p>
        <div className="">
          <ul className="no-bullets grid">
            {console.log(data, "data")}
            {/* {data.map((pokiemon, idx) => (
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
              </li>
            ))} */}
          </ul>
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
