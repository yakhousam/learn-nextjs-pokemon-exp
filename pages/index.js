import Link from "next/link";
// these are the endpoints we will use
// -https://pokeapi.co/api/v2/pokemon
// -https://pokeres.bastionbot.org/images/pokemon/1.png

// I want to display a list of Pokemon
// Every Pokemon will be in a card
// Every Pokemon card will have the name, picture, their number, and their type
// For styling, only use styled-jsx that came with nextjs

function Home({ pokemons }) {
  console.log(pokemons);
  const { results } = pokemons;
  return (
    <>
      <h1>Pokiemons</h1>
      <ul>
        {results.map((pokiemon, idx) => (
          <li key={idx}>
            <Link href={`/pokemon/${idx + 1}`}>
              <a>
                {idx + 1}. {pokiemon.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon");
  const pokemons = await res.json();
  return {
    props: {
      pokemons,
    },
  };
}

export default Home;
