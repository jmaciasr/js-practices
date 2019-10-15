
const pagintation = {
  maxPage: 10,
  maxPages: 90,
};

const domElemnts = {
  ulList: document.getElementById('pkmnList'),

};

const pokemons = {
  list: [],
};

let pokemonList;
let newPokemonList;

const pokeDex = (url = null) => {
  const api = new apiHandler();
  api.get(url || 'https://pokeapi.co/api/v2/pokemon/?limit=10')
  .then((data) => {
    console.log(data);
    pokemonList = data.results;
    console.log(pokemonList);
    showPkm(pokemonList)
  });

  const showPkm = (list) => {
    newPokemonList = list.map((item) => api.get(item.url));
    console.log(newPokemonList);
    console.log(newPokemonList[0]);
    Promise.all(newPokemonList).then((data) => {
    console.log('data es =', data);
    })
  };
};


pokeDex();