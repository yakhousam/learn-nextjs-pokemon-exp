function PokemonUL({ pokemonData }) {
  return (
    <>
      <ul className="no-bullets grid">
        {pokemonData.map((pokemon) => (
          <li key={pokemon.number} className="card">
            <img
              src={pokemon.image_url}
              alt={pokemon.name}
              width="200"
              height="200"
            />
            <h2>
              {pokemon.number}. {pokemon.name}
            </h2>
            <ul>
              {pokemon.types.map((pokemon) => (
                <li key={pokemon.slot}>{pokemon.type.name}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
}
export default PokemonUL;
