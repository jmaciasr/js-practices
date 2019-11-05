const productsList = [
  {
    name: 'Manzana',
    price: 500.00,
    type: 'fruit',
    image: 'images/fruits/apple.png',
    id: '01'
  },
  {
    name: 'Banano',
    price: 300.00,
    type: 'fruit',
    image: 'images/fruits/bananas.png',
    id: '02'
  },
  {
    name: 'Uvas',
    price: 2500.00,
    type: 'fruit',
    image: 'images/fruits/grape.png',
    id: '03'
  },
  {
    name: 'Fresas',
    price: 2200.00,
    type: 'fruit',
    image: 'images/fruits/strawberry.png',
    id: '04'
  },
  {
    name: 'Kiwi',
    price: 400.00,
    type: 'fruit',
    image: 'images/fruits/kiwi.png',
    id: '05'
  },
  {
    name: 'Piña',
    price: 1300.00,
    type: 'fruit',
    image: 'images/fruits/pineapple.png',
    id: '06'
  },
  {
    name: 'Aguacate',
    price: 800.00,
    type: 'veggie',
    image: 'images/veggies/avocado.png',
    id: '07'
  },
  {
    name: 'Tomate',
    price: 600.00,
    type: 'veggie',
    image: 'images/veggies/tomato.png',
    id: '08'
  },
  {
    name: 'Brocoli',
    price: 1000.00,
    type: 'veggie',
    image: 'images/veggies/broccoli.png',
    id: '09'
  },
  {
    name: 'Berenjena',
    price: 700.00,
    type: 'veggie',
    image: 'images/veggies/eggplant.png',
    id: '10'
  },
  {
    name: 'Hongos',
    price: 3200.00,
    type: 'veggie',
    image: 'images/veggies/mushroom.png',
    id: '11'
  },
  {
    name: 'Lechuga',
    price: 400.00,
    type: 'veggie',
    image: 'images/veggies/lettuce.png',
    id: '12'
  }
];

const domEl = {
  ulFrutasList: document.getElementById('frutasList'),
  ulVerdurasList: document.getElementById('verdurasList'),
  ulList: document.getElementById('list'),
  spanPriceTotal: document.getElementById('priceTotal'),
};

class Store {
  data = {};
  globalKey = null

  constructor(key, products) {
    const myStorage = this.getLocalStorage(key);
    this.globalKey = key;

    if (myStorage) {
      this.data = myStorage;
    } else {
      this.data.products = products
    }
  };

  getData() {
    return this.data.products;
  };

  addData(key, product) {
    this.data[key] = product;
    this.saveOnLocalStorage();
  };

  removeData(key) {
    if (key) {
      delete this.data[key];
    } else {
      this.data = {};
    }
  };

  saveOnLocalStorage() {
    const data = JSON.stringify(this.data);
    localStorage.setItem(this.globalKey, data);
  };

  getLocalStorage(key = null) {
    const data = localStorage.getItem(key || this.globalKey);
    return JSON.parse(data);
  };

};

const fruitStore = new Store('fruitStore', productsList);

const market = (() => {
  let totalStorage = 0;
  
  const getInitData = (list) => {
    let myList = list;
    printLists(myList, 'baselist');
    printLocalStorage();
  };

  const printLocalStorage = () => {
    printLists(fruitStore.data.products);
  };

  const printLists = (list, id) => {

    list.forEach(e => {
      let li = document.createElement('li');
      let img = document.createElement('img');
      let h2 = document.createElement('h2');
      img.setAttribute('src', e.image);
      img.classList.add('item__icon');
      h2.innerHTML = e.name;
      li.classList.add('list__item');
      h2.setAttribute('data-name', e.name);
      h2.setAttribute('data-cost', e.price);
      li.appendChild(img);
      li.appendChild(h2);
      h2.addEventListener('click', selecProduct);

      if (e.type === 'fruit' && id === 'baselist') {
        domEl.ulFrutasList.appendChild(li);
        h2.setAttribute('data-storage', 'pepe');
      } else if (e.type === 'veggie' && id === 'baselist') {
        domEl.ulVerdurasList.appendChild(li);
        h2.setAttribute('data-storage', 'pepe');
      } else {
        domEl.ulList.appendChild(li);
        h2.setAttribute('data-storage', 'true');
        totalStorage = totalStorage + e.price;
        domEl.spanPriceTotal.innerHTML = totalStorage;
        // totalStorage();
      }
    });
  };

  // const totalStorage = () => {
  //   totalStorage = totalStorage + e.price;
  //   domEl.spanPriceTotal.innerHTML = totalStorage;
  // };


  const selecProduct = (e) => {
    console.log(e.target.getAttribute('data-storage'));
    if (e.target.getAttribute('data-storage') === 'true') {
      domEl.ulList.removeChild(e.target.parentElement)
      totalStorage = totalStorage - Number(e.target.getAttribute('data-cost'));
      domEl.spanPriceTotal.innerHTML = totalStorage;
    } else {
      console.log(!e.target.getAttribute('data-storage'), e.target.getAttribute('data-storage'));
      let listElement = e.target.parentElement.cloneNode(true);
      listElement.setAttribute('data-storage', true);
      console.log(listElement);
      listElement.addEventListener('click', selecProduct);
      domEl.ulList.appendChild(listElement);
      console.log('i clicked', listElement);
      totalStorage = totalStorage + Number(e.target.getAttribute('data-cost'))
      domEl.spanPriceTotal.innerHTML = totalStorage;
    }
  };

  return {
    getInitData
  };
})();

market.getInitData(productsList);