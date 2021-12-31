// Element showing transactions
const transactionsUl = document.querySelector('#transactions');
// Element showing total incomes
const incomeDisplay = document.querySelector('#money-plus');
// Element showing total expenses
const expenseDisplay = document.querySelector('#money-minus');
// Element showing total balance 
const balanceDisplay = document.querySelector('#balance');
// Element that represents the form
const form = document.querySelector('#form');
// Element that represents the input name transaction
const inputTransactionName = document.querySelector('#text');
// Element that represent the input amount transaction
const inputTransactionAmount = document.querySelector('#amount');

// Array of transactions
let dummyTransactions = [
    { id: 1, name: "Bolo de brigadeiro",amount: -20 },
    { id: 2, name: "Salário",amount: 300 },
    { id: 3, name: "Torta de frango",amount: -10 },
    { id: 4, name: "Violão", amount: 150}
]

// function that removes a transaction
const removeTransaction = (ID) => {
    dummyTransactions.filter(transaction => transaction.id !== ID);
    init();
}

// function that adds a transaction

const addTransactionIntoDOM = (transaction) => {
    const operator = transaction.amount < 0 ? '-' : '+'
    const CSSClass = transaction.amount < 0 ? 'minus' : 'plus'
    const amountWithoutOperator = Math.abs(transaction.amount);
    const li = document.createElement('li');

    li.classList.add(CSSClass);
    li.innerHTML = `
    ${transaction.name}
    <span> ${operator} R$ ${amountWithoutOperator}</span>
    <button onClick='removeTransaction(${transaction.id})' class="delete-btn">
    x
    </button>`
    
    transactionsUl.append(li);
}

const updateBalanceValues = () => {
    const transactionsAmounts = dummyTransactions
    .map(transaction => transaction.amount)
    // taking the total value of the transactions
    const total = transactionsAmounts
    .reduce((accumulator, transaction) => accumulator + transaction, 0)
    .toFixed(2);
    // taking the value of the incomes
    const income =  transactionsAmounts
    .filter(value => value > 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2);
    // taking the value of the expenses
    const expense = Math.abs(transactionsAmounts
    .filter(value => value < 0)
    .reduce((accumulator, value) => accumulator + value, 0))
    .toFixed(2)
    // puting the values in the interface 
    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}` 
    expenseDisplay.textContent = `R$ ${expense}` 
}

const init = () => {
    transactionsUl.innerHTML = '';
    dummyTransactions.forEach(addTransactionIntoDOM);
    updateBalanceValues()
}

init();

const generateID = () => Math.round(Math.random() * 1000);

form.addEventListener('submit', event => {
    event.preventDefault();

    const transactionName = inputTransactionName.value.trim();
    const transactionAmount = inputTransactionAmount.value.trim();

    if(transactionName === '' || transactionAmount === ''){
        alert('Por favor, preencha tanto o nome quanto o valor da transação');
        return
    }

    const transaction = {
        id: generateID(), 
        name: transactionName, 
        amount: Number(transactionAmount)
    };
    dummyTransactions.push(transaction);

    init();
    inputTransactionName.value = '';
    inputTransactionAmount.value = '';

})
