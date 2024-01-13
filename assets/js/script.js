//BASIC VARIABLE DEFINITION
const counterContainer = document.querySelector('.counter-container');
const startingTomatoesButton = document.querySelector('.starting-from-button');
const stopwatchContainer = document.querySelector('.stopwatch-container');
const tomatoContainer = document.querySelector('.tomato-container')
const tools = document.querySelector('.tools');


//FUNCTION FOR CREATING DOM ELEMENTS
function createDOMElement(tag, content, style) {
  const element = document.createElement(tag); 
  element.textContent = content;
   if (Array.isArray(style)) {
    element.classList.add(...style); //allows to add multiple classes through arrays
  } else if (style) {
    element.classList.add(style);
  }
  return element
}


//CREATING BASIC ELEMENTS FOR COUNTER
const plusButton = createDOMElement('button','+ 1', 'btn')
const resultWindow = createDOMElement('div', '', 'counter-result-container');
const result = createDOMElement('p', 0, '');
const minusButton = createDOMElement('button','- 1', 'btn')
const resetButton = createDOMElement('button', 'RESET', ['btn', 'reset-button']);


//POSITIONING BASIC ELEMENTS
counterContainer.append(minusButton);
minusButton.after(resultWindow);
resultWindow.append(result);
resultWindow.after(plusButton);
tools.after(resetButton);


//FUNCTION FOR COUNTER
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
  stopStopwatch();
  pauseResumeStopwatch.textContent = 'PAUSE';
}


//CREATING TOMATOES FUNCTION
function createTomato() {
  const tomato = createDOMElement('div','','tomato');
  tomatoContainer.append(tomato);
}

function removeTomato() {
  tomatoContainer.removeChild(tomatoContainer.lastChild);
}

//STARTING FROM A SPECIFIC NUMBER OF TOMATOES FUNCTION
let startingValueInput = document.querySelector('#starting-tomatoes');
 
function startingFrom() {
  result.innerText = startingValueInput.value;
  for (let i = 0; i < startingValueInput.value; i++) {
    createTomato();
  }

  startingValueInput.value = '';
}

//STOPWATCH
const stopwatchElement = document.getElementById('stopwatch');
const startingStopwatchButton = document.querySelector('.startStopwatch');
const pauseResumeStopwatch = document.querySelector('.pauseResumeStopwatch'); 
let secondsPassed = 0;
let intervalStopWatch
let intervalCreateTomato

function startStopwatch() {
  function updateStopwatch() {
    secondsPassed++;

    const hours = Math.floor(secondsPassed / 3600);
    const minutes = Math.floor((secondsPassed % 3600) / 60);
    const seconds = secondsPassed % 60;

    stopwatchElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  }
 
  intervalStopWatch = setInterval(updateStopwatch, 1000); //defines the update of stopwatch text every second
  intervalUpdateCounter = setInterval(resultUp, 1000); //defines the counter to be updated with the stopwatch
  intervalCreateTomato = setInterval(createTomato, 1000) //defines when must a new tomato be created (1000ms per debugging; 1000*60*25, 25 minutes, for real app)
}

function stopStopwatch() {
  secondsPassed = 0;
  clearInterval(intervalStopWatch);
  clearInterval(intervalCreateTomato);
  clearInterval(intervalUpdateCounter);
  stopwatchElement.textContent = '00:00:00';
}

function pauseStopwatch() {
  clearInterval(intervalStopWatch);
  clearInterval(intervalCreateTomato);
  clearInterval(intervalUpdateCounter);
}


//EVENT FOR BUTTONS
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

startingStopwatchButton.addEventListener('click', ()=> {
 if(stopwatchElement.textContent != '00:00:00') return;
  startStopwatch();
})

pauseResumeStopwatch.addEventListener('click', ()=> {
  if(stopwatchElement.textContent != '00:00:00'){
  if (pauseResumeStopwatch.textContent === 'PAUSE') {
    pauseResumeStopwatch.textContent = 'RESUME';
    pauseStopwatch();
  } else {
    pauseResumeStopwatch.textContent = 'PAUSE'
    startStopwatch();
  }
}
})