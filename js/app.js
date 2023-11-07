'use strict';

// const productContainer = document.getElementById('products');
// const reportContainer = document.getElementById('report');
const button = document.getElementById('showResults');
const ulElem = document.querySelector('ul');

const leftProductImage = document.querySelector('section img:first-child');
// querySelectorAll = list of elements
// querySelector = 1 element
const middleProductImage = document.querySelector('section img:nth-child(2)');
const rightProductImage = document.querySelector('section img:nth-child(3)');
let workingProducts = [];
const allProducts = [];
let leftProductInstance = null;
let middleProductInstance = null;
let rightProductInstance = null;
let clickCount = 0;
const maxClicks = 25; // max number of votes



function Product(name, src) {
  this.name = name;
  this.src = src;
  this.views = 0;
  this.clicks = 0;
}

let bag = new Product('bag', './img/bag.jpg');
let banana = new Product('banana', './img/banana.jpg');
let bathroom = new Product('bathroom', './img/bathroom.jpg');
let boots = new Product('boots', './img/boots.jpg');
let breakfast = new Product('breakfast', './img/breakfast.jpg');
let bubblegum = new Product('bubblegum', './img/bubblegum.jpg');
let chair = new Product('chair', './img/chair.jpg');
let cthulhu = new Product('cthulhu', './img/cthulhu.jpg');
let dogDuck = new Product('dog-duck', './img/dog-duck.jpg');
let dragon = new Product('dragon', './img/dragon.jpg');
let pen = new Product('pen', './img/pen.jpg');
let petSweep = new Product('pet-sweep', './img/pet-sweep.jpg');
let scissors = new Product('scissors', './img/scissors.jpg');
let shark = new Product('shark', './img/shark.jpg');
let sweep = new Product('sweep', './img/sweep.png');
let tauntaun = new Product('tauntaun', './img/tauntaun.jpg');
let unicorn = new Product('unicorn', './img/unicorn.jpg');
let waterCan = new Product('water-can', './img/water-can.jpg');
let wineGlass = new Product('wine-glass', './img/wine-glass.jpg');

allProducts.push(bag);
allProducts.push(banana);
allProducts.push(bathroom);
allProducts.push(boots);
allProducts.push(breakfast);
allProducts.push(bubblegum);
allProducts.push(chair);
allProducts.push(cthulhu);
allProducts.push(dogDuck);
allProducts.push(dragon);
allProducts.push(pen);
allProducts.push(petSweep);
allProducts.push(scissors);
allProducts.push(shark);
allProducts.push(sweep);
allProducts.push(tauntaun);
allProducts.push(unicorn);
allProducts.push(waterCan);
allProducts.push(wineGlass);

function renderProducts() {
  // check if click count has reached max

  if (clickCount >= maxClicks) {
    // disable the images event handler
    removeListener();
    // show the button which would let you render the results
    renderResultsButton();
  }

  if (workingProducts.length <= 1) {
    workingProducts = allProducts.slice(); // makes copy of all products array
    shuffleArray(workingProducts);
  }

  leftProductInstance = workingProducts.pop(); // retrieves AND removes the last item
  leftProductImage.setAttribute('src', leftProductInstance.src);

  middleProductInstance = workingProducts.pop();
  middleProductImage.setAttribute('src', middleProductInstance.src);

  rightProductInstance = workingProducts.pop();
  rightProductImage.setAttribute('src', rightProductInstance.src);

  leftProductInstance.views += 1;
  middleProductInstance.views += 1;
  rightProductInstance.views += 1;
}

// helper function - randomize array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Generate a random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements at i and j
  }
}

function handleLeftClick() {
  leftProductInstance.clicks += 1;
  clickCount += 1;
  console.log(leftProductInstance);
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

function renderResultsClick() {
  for (let i = 0; i < allProducts.length; i++) {
    let currentProduct = allProducts[i];
    let result = `${currentProduct.name} had ${currentProduct.clicks} votes and was viewed ${currentProduct.views} times.`;
    console.log(result);
    const liElem = document.createElement('li');
    ulElem.appendChild(liElem);
    liElem.textContent = result;
  }
}

// setup listeners in callback
function setupListeners() {
  leftProductImage.addEventListener('click', handleLeftClick);
  middleProductImage.addEventListener('click', handleMiddleClick);
  rightProductImage.addEventListener('click', handleRightClick);
  button.addEventListener('click', renderResultsClick);
}

function removeListener() {
  leftProductImage.removeEventListener('click', handleLeftClick);
  middleProductImage.removeEventListener('click', handleMiddleClick);
  rightProductImage.removeEventListener('click', handleRightClick);
}

function renderResultsButton() {
  button.style.display = 'block';
}

renderProducts();
setupListeners();
