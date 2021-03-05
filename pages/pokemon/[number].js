import Link from "next/link";

const pokemon = ({ pokemon }) => {
  console.log("in the pokemon page:", pokemon);
  return (
    <div>
      <h1>{pokemon.name}</h1>
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
  return { pokemon };
};

export default pokemon;
