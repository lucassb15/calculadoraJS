

onload = () => {
    document.querySelector('#btn-0').onclick = () => digito(0);
    document.querySelector('#btn-1').onclick = () => digito(1);
    document.querySelector('#btn-2').onclick = () => digito(2);
    document.querySelector('#btn-3').onclick = () => digito(3);
    document.querySelector('#btn-4').onclick = () => digito(4);
    document.querySelector('#btn-5').onclick = () => digito(5);
    document.querySelector('#btn-6').onclick = () => digito(6);
    document.querySelector('#btn-7').onclick = () => digito(7);
    document.querySelector('#btn-8').onclick = () => digito(8);
    document.querySelector('#btn-9').onclick = () => digito(9);
    document.querySelector('#btn-ponto').onclick = ponto;
    document.querySelector('#btn-limpar').onclick = limpa;
    document.querySelector('#btn-divide').onclick = () => operador('/');
    document.querySelector('#btn-vezes').onclick = () => operador('*');
    document.querySelector('#btn-menos').onclick = () => operador('-');
    document.querySelector('#btn-mais').onclick = () => operador('+');
    document.querySelector('#btn-igual').onclick = calcula;
};


let exibirValor = '0'; // valor do visor
let novoNumero = true; // verifica se o proximo digito será de um novo numero
let armazenarValorAnterior = 0; // valor acumulado para uma operação
let operacaoPendente = null; // operação acumulada

// Atualiza o visor
const visor = () => {
    let [parteInteira, parteDecimal] = exibirValor.split(',');
    let j = '';
    c = 0;
    for (let i = parteInteira.length - 1; i >= 0; i--) {
        if (++c > 3) {
            j = '.' + j;
            c = 1;
        };
        j = parteInteira[i] + j;
    }
    j = j + (parteDecimal ? ',' + parteDecimal : '');
    document.querySelector('#mostrarNumero').innerText = j;
};
//  67 - 95 // 66 - 94 // 
// Clique no botão 
const digito = (n) => {
    if (novoNumero) {
        exibirValor = '' + n;
        novoNumero = false;
    } else exibirValor += n;
    visor();
    if(exibirValor.length > 11){
        exibirValor = exibirValor.substring(0,12);
    }
};

// Cria a virgula
const ponto = () => {
    if (novoNumero) {
        exibirValor += '0,';
        novoNumero = false;
    } else
        if (exibirValor.indexOf(',') == -1) exibirValor += ',';
    visor();
};

// Limpa o visor
const limpa = () => {
    novoNumero = true;
    armazenarValorAnterior = 0;
    operacaoPendente = null;
    exibirValor = '0';
    visor();
};

//Converte a string do valor para um número real
const valorAtual = () => parseFloat(exibirValor.replace(',', '.'));
// Operadores
const operador = (op) => {
    calcula();
    armazenarValorAnterior = valorAtual();
    operacaoPendente = op;
    novoNumero = true;
}

const calcula = () => {
    if(operacaoPendente != null) {
        let resultado;
        switch(operacaoPendente) {
            case '+': resultado = armazenarValorAnterior + valorAtual(); break;
            case '-': resultado = armazenarValorAnterior - valorAtual(); break;
            case '*': resultado = armazenarValorAnterior * valorAtual(); break;
            case '/': resultado = armazenarValorAnterior / valorAtual(); break;
        }
        exibirValor = resultado.toString().replace('.', ',');
    }
    novoNumero = true;
    operacaoPendente = null;
    armazenarValorAnterior = 0;
    visor();
}