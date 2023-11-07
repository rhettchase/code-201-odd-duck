'use strict';

/////////////////////////////////
// GLOBAL SCOPE
////////////////////////////////

const ulElem = document.querySelector('ul');
const sectionElem = document.getElementById('resultsHeader');
const button = document.getElementById('showResults');

// querySelectorAll = list of elements
// querySelector = 1 element
// could also use document.getElementById
const leftProductImage = document.querySelector('section img:first-child');
const middleProductImage = document.querySelector('section img:nth-child(2)');
const rightProductImage = document.querySelector('section img:nth-child(3)');
const allProductNames = [
  'bag',
  'banana',
  'bathroom',
  'boots',
  'breakfast',
  'bubblegum',
  'chair',
  'cthulhu',
  'dog-duck',
  'dragon',
  'pen',
  'pet-sweep',
  'scissors',
  'shark',
  'sweep',
  'tauntaun',
  'unicorn',
  'water-can',
  'wine-glass',
];

let leftProductInstance = null;
let middleProductInstance = null;
let rightProductInstance = null;
let clickCount = 0; // running total of votes
const maxClicks = 10; // max number of votes

function Product(name, src) {
  this.name = name;
  this.src = src;
  this.views = 0;
  this.clicks = 0;
}
Product.allProducts = []; // property of construction itself
Product.workingProducts = [];

/////////////////////////
// FUNCTIONS ///////////

function initProducts() {
  // for (let item of array) {}
  for (let productName of allProductNames) {
    const productInstance = new Product(productName, `img/${productName}.jpg`);
    Product.allProducts.push(productInstance);
  }
}

function renderProducts() {
  // check if click count has reached max

  if (clickCount >= maxClicks) {
    // disable the images event handler
    removeListener();
    // show the button which would let you render the results
    renderResultsButton();
  }

  if (Product.workingProducts.length < 3) {
    Product.workingProducts = Product.allProducts.slice(); // makes copy of all products array; also copies the properties of the array including views and clicks
    // if you don't have enough for the next round, this refreshes
    shuffleArray(Product.workingProducts);
  }

  leftProductInstance = Product.workingProducts.pop(); // retrieves AND removes the last item
  leftProductImage.setAttribute('src', leftProductInstance.src);

  middleProductInstance = Product.workingProducts.pop();
  middleProductImage.setAttribute('src', middleProductInstance.src);

  rightProductInstance = Product.workingProducts.pop();
  rightProductImage.setAttribute('src', rightProductInstance.src);

  leftProductInstance.views += 1;
  middleProductInstance.views += 1;
  rightProductInstance.views += 1;
}

function renderChart() {
  let productNames = [];
  let productVotes = [];
  let productViews = [];

  for (let i = 0; i < Product.allProducts.length; i++) {
    productNames.push(Product.allProducts[i].name);
    productVotes.push(Product.allProducts[i].clicks);
    productViews.push(Product.allProducts[i].views);
  }
  /* refer to Chart.js > Chart Types > Bar Chart:
  https://www.chartjs.org/docs/latest/charts/bar.html
  and refer to Chart.js > Getting Started > Getting Started:
  https://www.chartjs.org/docs/latest/getting-started/ */
  const data = {
    labels: productNames,
    datasets: [{
      label: 'Votes',
      data: productVotes,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)'
      ],
      borderWidth: 1
    },
    {
      label: 'Views',
      data: productViews,
      backgroundColor: [
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgb(255, 159, 64)'
      ],
      borderWidth: 1
    }]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };
  let canvasChart = document.getElementById('myChart');
  const myChart = new Chart(canvasChart, config);
}



///////////////////////////////////
// HELPER FUNCTIONS  ///////////////

//randomize array
// Fisher Yates function via chatGPT
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Generate a random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements at i and j
  }
}

function handleLeftClick() {
  leftProductInstance.clicks += 1;
  clickCount += 1;
  // console.log(leftProductInstance);
  renderProducts();
}

function handleMiddleClick() {
  middleProductInstance.clicks += 1;
  clickCount += 1;
  renderProducts();
}

function handleRightClick() {
  rightProductInstance.clicks += 1;
  clickCount += 1;
  renderProducts();
}

function handleViewResultsClick() {
  renderChart();
}

// function renderResultsClick() {
//   for (let i = 0; i < Product.allProducts.length; i++) {
//     let currentProduct = Product.allProducts[i];
//     let result = `${currentProduct.name} had ${currentProduct.clicks} votes and was viewed ${currentProduct.views} times.`;
//     // console.log(result);
//     const liElem = document.createElement('li');
//     ulElem.appendChild(liElem);
//     liElem.textContent = result;
//   }
// }

// setup listeners in callback
function setupListeners() {
  leftProductImage.addEventListener('click', handleLeftClick);
  middleProductImage.addEventListener('click', handleMiddleClick);
  rightProductImage.addEventListener('click', handleRightClick);
}

// remove listeners
function removeListener() {
  leftProductImage.removeEventListener('click', handleLeftClick);
  middleProductImage.removeEventListener('click', handleMiddleClick);
  rightProductImage.removeEventListener('click', handleRightClick);
}

function renderResultsButton() {
  button.addEventListener('click', handleViewResultsClick);
  button.style.display = 'block';
  button.removeAttribute('hidden');
  const resultsHeaderElem = document.createElement('h2');
  sectionElem.appendChild(resultsHeaderElem);
  resultsHeaderElem.textContent = 'Results';
}

/////////////////////////
// START APP ///////////

initProducts();
renderProducts();
setupListeners();
