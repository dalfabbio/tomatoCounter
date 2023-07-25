//JS

const counterContainer = document.querySelector('.counter-container');
const tomatoContainer = document.querySelector('.tomato-container')

//funzione per la creazione di elementi nel DOM
function createDOMElement(tag, content, style) {
  const element = document.createElement(tag); 
  element.textContent = content;
   if (style) {
    element.classList.add(style);
  }
  return element
}

//Creazione degli elementi base del counter
const plusButton = createDOMElement('button','+ 1', 'btn')
const resultWindow = createDOMElement('div', '', 'counter-result-container');
const result = createDOMElement('p', 0, '');
const minusButton = createDOMElement('button','- 1', 'btn')
const resetButton = createDOMElement('button', 'reset', 'btn');

//Posizionamento degli elementi base del counter
counterContainer.append(minusButton);
minusButton.after(resultWindow);
resultWindow.append(result);
resultWindow.after(plusButton);
counterContainer.append(resetButton);


//funzioni di base del counter
function resultUp (){
  result.innerText = Number(result.innerText) + 1;
  return
}

function resultDown() {
  if (result.innerText == 0) return;
  result.innerText = Number(result.innerText) - 1;
  return
}

function reset() {
  result.innerText = 0;
  while(tomatoContainer.firstChild) {
    tomatoContainer.removeChild(tomatoContainer.firstChild);
  }
  
}

//funzioni per la creazione di pomodori nel campo

function createTomato() {
  const tomato = createDOMElement('div','','tomato');
  tomatoContainer.append(tomato);
}

function removeTomato() {
  tomatoContainer.removeChild(tomatoContainer.lastChild);
}

//funzioni per definire da quanti pomodori partire
const startingTomatoesButton = document.querySelector('.starting-from-button');

function startingFrom() {
  let startingValueInput = document.querySelector('#starting-tomatoes');
  

  result.innerText = startingValueInput.value;

  for (let i = 0; i < startingValueInput.value; i++) {
    createTomato();
  }

  startingValueInput.value = '';
}

//creazione stopwatch
//DA SISTEMARE: 1. il fatto che più premo il tasto, più pomodori compaiono ogni momento. 2. inserire pausa 3. inserire reset del timer (potrebbe essere sempre lo stesso pulsante reset) 
const stopwatchElement = document.getElementById('stopwatch');
let secondsPassed = 0;

function startStopwatch() {
  function updateStopwatch() {
    secondsPassed++;

    const hours = Math.floor(secondsPassed / 3600);
    const minutes = Math.floor((secondsPassed % 3600) / 60);
    const seconds = secondsPassed % 60;

    stopwatchElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
 
  setInterval(updateStopwatch, (1000));
}

const startingStopwatchButton = document.querySelector('.startStopwatch');

startingStopwatchButton.addEventListener('click', ()=> {
  startStopwatch();
  setInterval(createTomato, 60*1000)
})

//applicazione delle funzioni ai pulsanti
plusButton.addEventListener('click', ()=>{
  resultUp();
  createTomato();
  return
})

minusButton.addEventListener('click', ()=>{
  resultDown();
  removeTomato();
  return
})

resetButton.addEventListener('click', ()=> {
  reset();
})

startingTomatoesButton.addEventListener ('click', () => {
  reset();
  startingFrom();
})
