// these are the endpoints we will use
// -https://pokeapi.co/api/v2/pokemon
// -https://pokeres.bastionbot.org/images/pokemon/1.png

// I want to display a list of Pokemon
// Every Pokemon will be in a card
// Every Pokemon card will have the name, picture, their number, and their type
// For styling, only use styled-jsx that came with nextjs

function Home() {
  return <h1>Learn next.js: pokemon example</h1>

  // Render posts...
}

// This function gets called at build time
export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://pokeapi.co/api/v2/pokemon')
  const posts = await res.json()

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  }
}

export default Home
