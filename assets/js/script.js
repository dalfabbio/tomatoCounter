const counterContainer = document.querySelector('.counter-container');

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

//Posizionamento degli elementi base del counter
counterContainer.append(minusButton);
minusButton.after(resultWindow);
resultWindow.append(result);
resultWindow.after(plusButton);

//logica di funzionamento base del counter
plusButton.addEventListener('click', ()=>{
  result.innerText = Number(result.innerText) + 1;
  return
})

minusButton.addEventListener('click', ()=>{
  if (result.innerText == 0) return;
  result.innerText = Number(result.innerText) - 1;
})