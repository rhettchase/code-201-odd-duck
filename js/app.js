'use strict';

/////////////////////////////////
// GLOBAL SCOPE
////////////////////////////////

const sectionElem = document.getElementById('resultsContainer');
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
const maxClicks = 5; // max number of votes
const productStorageKey = 'product-key';

function Product(name, src, views = 0, clicks = 0) {
  this.name = name;
  this.src = src;
  this.views = views;
  this.clicks = clicks;
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
    removeVotingListener();
    // show the button which would let you render the results
    endVotingRound();
  }

  // handle case of leftover
  // reference: in-class demo
  let leftOver = null;
  if (Product.workingProducts.length === 1) {
    leftOver = Product.workingProducts[0];
  }

  if (Product.workingProducts.length < 3) {
    Product.workingProducts = Product.allProducts.slice(); // makes copy of all products array; also copies the properties of the array including views and clicks
    // if you don't have enough for the next round, this refreshes
    shuffleArray(Product.workingProducts);

    if (leftOver) {
      removeItem(Product.workingProducts, leftOver);
      Product.workingProducts.push(leftOver);
    }
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

/// CLICK FUNCTIONS

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
  removeResultsListener(); // remove listener once button clicked once
}

/// LISTENERS
// setup image listeners in callback
function setupVotingListeners() {
  leftProductImage.addEventListener('click', handleLeftClick);
  middleProductImage.addEventListener('click', handleMiddleClick);
  rightProductImage.addEventListener('click', handleRightClick);
}

// remove listeners
function removeVotingListener() {
  leftProductImage.removeEventListener('click', handleLeftClick);
  middleProductImage.removeEventListener('click', handleMiddleClick);
  rightProductImage.removeEventListener('click', handleRightClick);
}

/// RESULTS
function endVotingRound() {
  // make view results button visible and clickable
  button.addEventListener('click', handleViewResultsClick);
  button.style.display = 'block';
  button.removeAttribute('hidden');
  const resultsHeaderElem = document.createElement('h2');
  sectionElem.appendChild(resultsHeaderElem);
  resultsHeaderElem.textContent = 'Results';

  saveProductResults(); // save products results from this round of voting
}

function removeResultsListener() {
  button.removeEventListener('click', handleViewResultsClick);
}

///// LOCAL STORAGE ////////////

function saveProductResults() {
  const productStorageText = JSON.stringify(Product.allProducts); // convert allProducts array of products to string
  localStorage.setItem(productStorageKey, productStorageText); // set value of allProducts to the key
}

function parseStoredProducts(storageText) {
  // restore from storage
  const storedProductObjects = JSON.parse(storageText);

  Product.allProducts.length = 0; // fail safe to reset products array to 0

  for (let productObject of storedProductObjects) {
    // console.log(productObject.views);
    const currentProduct = new Product(
      productObject.name,
      productObject.src,
      productObject.views,
      productObject.clicks
    );
    Product.allProducts.push(currentProduct);
  }
  console.log(Product.allProducts);
}

function loadProducts() {
  const productStorageText = localStorage.getItem(productStorageKey); // access stored product results data stored in the saveProductResults() function
  console.log(productStorageText);
  if (productStorageText) {
    parseStoredProducts(productStorageText); // if there is stored results data, access it and parse it, if not, initiate products creation
  } else {
    initProducts();
  }
}

/////// CHARTS ////////////////

function renderChart() {
  let productNames = [];
  let productVotes = [];
  let productViews = [];

  for (let i = 0; i < Product.allProducts.length; i++) {
    let currentProduct = Product.allProducts[i];
    productNames.push(currentProduct.name);
    productVotes.push(currentProduct.clicks);
    productViews.push(currentProduct.views);
  }

  // refer to Chart.js
  // https://www.chartjs.org/docs/latest/charts/bar.html
  const data = {
    labels: productNames,
    datasets: [
      {
        label: 'Votes',
        data: productVotes,
        backgroundColor: ['rgba(255, 128, 114, 0.2)'],
        borderColor: ['rgb(255, 128, 114)'],
        borderWidth: 1,
      },
      {
        label: 'Views',
        data: productViews,
        backgroundColor: ['rgba(97, 113, 128, 0.2)'],
        borderColor: ['rgb(97, 113, 128)'],
        borderWidth: 1,
      },
    ],
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };
  const canvasChart = document.getElementById('myChart');
  new Chart(canvasChart, config);
}

///////////////////////////////////
// HELPER FUNCTIONS  ///////////////
///////////////////////////////////

//randomize array
// Fisher Yates function via chatGPT
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Generate a random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements at i and j
  }
}

// reference: class demo code
function removeItem(array, item) {
  const index = array.indexOf(item);
  if (index !== -1) {
    array.splice(index, 1);
  }
}

/////////////////////////
// START APP ///////////
///////////////////////

loadProducts();
renderProducts();
setupVotingListeners();
