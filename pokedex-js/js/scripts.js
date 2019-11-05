const pagintation = {
  maxPage: 10,
  maxPages: 90,
  next: null,
  prev: null,
};

const domElemnts = {
  ulList: document.getElementById('pkmnList'),
  nextBtn: document.getElementById('nextBtn'),
  prevBtn: document.getElementById('prevBtn'),
  input: document.getElementById('pagination'),
  main: document.getElementById('main'),
  detail: document.getElementById('detail'),
};

const pokemons = {
  list: [],
};

let pokemonList;
let newPokemonList;


const pokeDex = (() => {
  const getInitData = (url = 'https://pokeapi.co/api/v2/pokemon/?limit=10' || url) => {
    const api = new apiHandler();
    api.get(url)
      .then((data) => {
        pokemonList = data.results;
        pagintation.next = data.next;
        pagintation.prev = data.previous;
        domElemnts.main.classList.add('loading');
        showPkm(pokemonList)
      });

    const showPkm = async (list) => {
      newPokemonList = list.map((item) => api.get(item.url));
      newPokemonList = await Promise.all(newPokemonList);
      // En lugar de hacer el async tambien se puede hacer:
      // Promise.all(newPokemonList).then((results) => {
      //   newPokemonList = results;
      // })
      printPkm();
    };
  
    const printPkm = () => {
      while (domElemnts.ulList.firstChild) {
        domElemnts.ulList.removeChild(domElemnts.ulList.firstChild);
      }
      newPokemonList.forEach((item) => {
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.setAttribute('src', item.sprites.front_shiny);
        li.classList.add('pkmn__item');
        li.appendChild(img);
        domElemnts.ulList.appendChild(li);
      });
      domElemnts.main.classList.remove('loading');
    };
  }

  const goPage = (e) => {
    if (e.keyCode === 13) {
      if (domElemnts.input.value >= 1 && domElemnts.input.value < 91) {
        console.log(pagintation.next);
        getInitData(`https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${domElemnts.input.value - 1}0`);
      } else {
        getInitData();
      };
    }
  };
  
  const goNext = () => {
    pokeDex.getInitData(pagintation.next);
  };
  
  const goPrev = () => {
    pokeDex.getInitData(pagintation.previous);
  };
  
  nextBtn.addEventListener('click', goNext);
  prevBtn.addEventListener('click', goPrev);
  domElemnts.input.addEventListener('keyup', goPage);

  return {
    getInitData
  };

})();

pokeDex.getInitData();