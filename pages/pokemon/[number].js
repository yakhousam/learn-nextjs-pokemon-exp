import Link from "next/link";

const pokemon = ({ pokemon, number }) => {
  console.log("in the pokemon page:", pokemon);
  const { types } = pokemon;
  return (
    <div>
      <h1>{pokemon.name}</h1>
      <img
        src={`https://pokeres.bastionbot.org/images/pokemon/${number}.png`}
        alt={pokemon.name}
        width="200"
        height="200"
      />
      <p>number: {number}</p>
      <p>type : {types[0].type.name}</p>
      <div>
        <Link href="/">
          <a>back</a>
        </Link>
      </div>
    </div>
  );
};

pokemon.getInitialProps = async ({ query }) => {
  const number = query.number;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`);
  const pokemon = await res.json();
  return { pokemon, number };
};

export default pokemon;
