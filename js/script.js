const difDosagemPositivo = document.querySelector('.dif_dosagem_positivo');
const difDosagemNegativo = document.querySelector('.dif-dosagem-negativo');
const carboplatinaPorcentPos = document.querySelector('.carboplatina-porcentagem-positivo');
const carboplatinaPorcentNeg = document.querySelector('.carboplatina-porcentagem-negativo');
const carboplatinaValorMais = document.querySelector('.carboplatina-porcent-valor-mais');
const carboplatinaValorMenos = document.querySelector('.carboplatina-porcent-valor-menos');
const dif = document.querySelector('.dif');
const comboboxDif = document.querySelector('.combobox-dif');
const comboboxReducao = document.querySelector('.combobox-reducao');
const comboboxSexo = document.querySelector('.combobox-sexo');
const unidadeMedida = document.querySelector('.combobox-unidade-medida');
const unidadeMedidaDosagem = document.querySelector('.span-dosagem');
const clearanceInput = document.querySelector('.clearance-input');
const alturaInput = document.querySelector('.altura');
const pesoInput = document.querySelector('.peso');
const idadeInput = document.querySelector('.idade');
const creatininaInput = document.querySelector('.creatinina');
const carboplatinaValor = document.querySelector('.carboplatina-valor');
const aucInput = document.querySelector('.auc');
const scInput = document.querySelector('.sc');
const dosagemInput = document.querySelector('.dosagem');
const dosagemResultado = document.querySelector('.dosagemResult');
const dosagemPercentMais = document.querySelector('.dosagem-percent-mais');
const dosagemPercentMenos = document.querySelector('.dosagem-percent-menos');
const clearancevalor = document.querySelector('.Clearance-valor');


let porcentagem = 5;
let unidadeMedidaVal = 'mg/m²';
let altura = '';
let peso = '';
let sc = 0;
let dosagemValor = 0;
let dosagem = '';
let ValorReduzidoDosagem = 0;
let valorPercentual = 0;
let dosagemMaisPorcento = 0;
let dosagemMenosPorcento = 0;
let casasDecimais = 0;
let reducaoPorcentagem = 0;
let clearance = 0;
let idade = 0;
let creatinina = 0;
let carboplatina = 0;
let auc = 0;
let carboplatinaPercentual = 0;
let carboplatinaMais = 0;
let carboplatinaMenos = 0;
let sexo = 1;
let clearanceInputval = 0;
let ativo = false;


// renderizando valores na tela
const renderCalculadora = () => {
  difDosagemPositivo.innerHTML = `+${porcentagem}%`;
  difDosagemNegativo.innerHTML = `-${porcentagem}%`;
  carboplatinaPorcentPos.innerHTML = `+${porcentagem}%`;
  carboplatinaPorcentNeg.innerHTML = `-${porcentagem}%`;
  unidadeMedidaDosagem.innerHTML = `${unidadeMedidaVal}`;
  scInput.innerHTML = `${sc} m²`;
  dosagemResultado.innerHTML = `${dosagemValor.toFixed(casasDecimais)} mg`;
  dosagemPercentMais.innerHTML = `${dosagemMaisPorcento.toFixed(casasDecimais)} mg`;
  dosagemPercentMenos.innerHTML = `${dosagemMenosPorcento.toFixed(casasDecimais)} mg`;
  carboplatinaValor.innerHTML = `${carboplatina.toFixed(2)} mg`;
  clearancevalor.innerHTML = `${clearance.toFixed(2)} ml`;
  carboplatinaValorMais.innerHTML = `${carboplatinaMais.toFixed(2)} mg`;
  carboplatinaValorMenos.innerHTML = `${carboplatinaMenos.toFixed(2)} mg`;
};


//Input de Valores (Input e Combobox)
comboboxDif.addEventListener('change', () => {
  porcentagem = comboboxDif.value;

  calculos();
  renderCalculadora();
});

unidadeMedida.addEventListener('change', () => {
  unidadeMedidaVal = unidadeMedida.value;

  calculos();
  renderCalculadora();
});

comboboxSexo.addEventListener('change', () => {
  sexo = comboboxSexo.value;

  calculos();
  renderCalculadora();
});

alturaInput.addEventListener('input', () => {
  altura = alturaInput.value;

  calculos();
  renderCalculadora();
});

pesoInput.addEventListener('input', () => {
  peso = pesoInput.value;

  calculos();
  renderCalculadora();
});

idadeInput.addEventListener('input', () => {
  idade = idadeInput.value;

  calculos();
  renderCalculadora();
});

creatininaInput.addEventListener('input', () => {
  creatinina = creatininaInput.value;

  calculos();
  renderCalculadora();
});

aucInput.addEventListener('input', () => {
  auc = aucInput.value;

  calculos();
  renderCalculadora();
});

clearanceInput.addEventListener('input', () => {
  clearanceInputval = clearanceInput.value;

  calculos();
  renderCalculadora();
});

dosagemInput.addEventListener('input', () => {
  dosagem = dosagemInput.value;

  calculos();
  renderCalculadora();
});

comboboxReducao.addEventListener('change', () => {
  reducaoPorcentagem = comboboxReducao.value;

  calculos();
  renderCalculadora();
});

//Lógica de Calculos

const calculos = () => {
  // calculo de superficie corpórea
  sc = (0.007184 * Math.pow(altura, 0.725) * Math.pow(peso, 0.425)).toFixed(4);

  if (unidadeMedidaVal == 'mg/m²') {
    ValorReduzidoDosagem = ((dosagem * sc) / 100) * reducaoPorcentagem;
    dosagemValor = dosagem * sc - ValorReduzidoDosagem;

    valorPercentual = (dosagemValor / 100) * porcentagem;
    dosagemMaisPorcento = dosagemValor + valorPercentual;
    dosagemMenosPorcento = dosagemValor - valorPercentual;
    casasDecimais = 2;
  } else if (unidadeMedidaVal == 'mg/kg') {
    ValorReduzidoDosagem = ((dosagem * peso) / 100) * reducaoPorcentagem;
    dosagemValor = dosagem * peso - ValorReduzidoDosagem;
    valorPercentual = (dosagemValor / 100) * porcentagem;
    dosagemMaisPorcento = dosagemValor + valorPercentual;
    dosagemMenosPorcento = dosagemValor - valorPercentual;
    casasDecimais = 0;
  }

  // Condição para apresentação do Valor do Clearance
  if ((comboboxSexo.value == 1) | (comboboxSexo.value == 0.85)) {
    clearanceInput.setAttribute('disabled', 'disabled');
    clearanceInput.setAttribute('hidden', 'hidden');
    clearancevalor.removeAttribute('hidden');
    ativo = false;
  } else {
    clearanceInput.removeAttribute('disabled');
    clearanceInput.removeAttribute('hidden');
    clearancevalor.setAttribute('hidden', 'hidden');
    ativo = true;
  }

  // calculo da Clearance de Creatinina

  if (peso && auc && creatinina && idade) {
    clearance = ((peso * (140 - idade)) / (72 * creatinina)) * sexo;

    if (ativo == true) {
      clearance = parseFloat(clearanceInputval);
    }

    // Calculo da Carboplatina
    carboplatinaReducao = (((25 + clearance) * auc) / 100) * reducaoPorcentagem;
    carboplatina = ((25 + clearance) * auc) - carboplatinaReducao;


    carboplatinaPercentual = (carboplatina / 100) * porcentagem;
    carboplatinaMais = carboplatina + carboplatinaPercentual;
    carboplatinaMenos = carboplatina - carboplatinaPercentual;
  }
};

// filtro de Input (Não permite os caracteres ". , + -")
pesoInput.addEventListener("keypress", function (e) {
  if (e.key === "." || e.key === "+" || e.key === "-") {
    e.preventDefault();
  }
});

clearanceInput.addEventListener("keypress", function (e) {
  if (e.key === "." || e.key === "+" || e.key === "-") {
    e.preventDefault();
  }
});

alturaInput.addEventListener("keypress", function (e) {
  if (e.key === "." || e.key === "," || e.key === "+" || e.key === "-") {
    e.preventDefault();
  }
});

idadeInput.addEventListener("keypress", function (e) {
  if (e.key === "." || e.key === "," || e.key === "+" || e.key === "-") {
    e.preventDefault();
  }
});

dosagemInput.addEventListener("keypress", function (e) {
  if (e.key === "." || e.key === "+" || e.key === "-") {
    e.preventDefault();
  }
});

aucInput.addEventListener("keypress", function (e) {
  if (e.key === "." || e.key === "+" || e.key === "-") {
    e.preventDefault();
  }
});

scInput.addEventListener("keypress", function (e) {
  if (e.key === "." || e.key === "+" || e.key === "-") {
    e.preventDefault();
  }
});

creatininaInput.addEventListener("keypress", function (e) {
  if (e.key === "." || e.key === "+" || e.key === "-") {
    e.preventDefault();
  }
});

pesoInput.addEventListener("keypress", function (e) {

  if (e.key === "." || e.key === "+" || e.key === "-") {
    e.preventDefault();
  }

});



renderCalculadora();
