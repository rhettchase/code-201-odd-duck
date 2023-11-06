'use strict';

const productContainer = document.getElementById("products");
const reportContainer = document.getElementById("report");

let workingProducts = [];
const allProducts = [];
const leftProductImage = document.querySelector('section img:first-child');
// querySelectorAll = list of elements
// querySelector = 1 element
const middleProductImage = document.querySelector('section img:nth-child(2)');
const rightProductImage = document.querySelector('section img:nth-child(3)');
let leftProductInstance = null;
let middleProductInstance = null;
let rightProductInstance = null;
let clickCount = 0;
const maxClicks = 4;

// leftProductImage.setAttribute('src',

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

// console.log(allProducts);

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

leftProductImage.addEventListener('click', handleLeftClick);
middleProductImage.addEventListener('click', handleMiddleClick);
rightProductImage.addEventListener('click', handleRightClick);

function renderProducts() {
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
  middleProductInstance.views +=1;
  rightProductInstance.views +=1;
}

renderProducts();

console.log(allProducts);
console.log(clickCount);
