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

// Variable that converts the array from string to object
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

// Array of transactions
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [] 

// function that removes a transaction
const removeTransaction = (ID) => {
    transactions = transactions.filter(transaction => transaction.id !== ID);
    updateLocalStorage();
    init();
}

// function that adds a transaction
const addTransactionIntoDOM = ({id,name,amount}) => {
    const operator = amount < 0 ? '-' : '+'
    const CSSClass = amount < 0 ? 'minus' : 'plus'
    const amountWithoutOperator = Math.abs(amount);
    const li = document.createElement('li');

    li.classList.add(CSSClass);
    li.innerHTML = ` ${name}<span> ${operator} R$ ${amountWithoutOperator}</span><button onClick='removeTransaction(${id})' class="delete-btn">x</button>`
    
    transactionsUl.append(li);
}

// taking the value of the incomes
const getIncomes = (transactionsAmounts) => transactionsAmounts.filter(value => value > 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2);


// taking the value of the expenses
const getExpenses = (transactionsAmounts) => Math.abs(transactionsAmounts
    .filter(value => value < 0)
    .reduce((accumulator, value) => accumulator + value, 0))
    .toFixed(2)

// taking the total value of the balance
const getTotal = (transactionsAmounts) => transactionsAmounts
    .reduce((accumulator, transaction) => accumulator + transaction, 0)
    .toFixed(2);

const updateBalanceValues = () => {
    // transforming the array into a new array that contains just the amounts
    const transactionsAmounts = transactions.map(({amount}) => amount)
    // taking the total value of the balance
    const total = getTotal(transactionsAmounts);
    // taking the value of the incomes
    const income = getIncomes(transactionsAmounts);
    // taking the value of the expenses
    const expense = getExpenses(transactionsAmounts);
    // puting the values in the interface 
    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}` 
    expenseDisplay.textContent = `R$ ${expense}` 
}

// function that initializy the transactions 
const init = () => {
    transactionsUl.innerHTML = '';
    transactions.forEach(addTransactionIntoDOM);
    updateBalanceValues()
}

init();

// function that saves the array of the transactions in the localStorage
const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

// function that generates a random number 
const generateID = () => Math.round(Math.random() * 1000);

const addToTransactionArray = (transactionName, transactionAmount) => {
    transactions.push({
        id: generateID(), 
        name: transactionName, 
        amount: Number(transactionAmount)
    })
}

const cleanInputs = () => {
    inputTransactionName.value = '';
    inputTransactionAmount.value = '';
}

const handleFormSubmit = (event) => {
    event.preventDefault();

    const transactionName = inputTransactionName.value.trim();
    const transactionAmount = inputTransactionAmount.value.trim();
    const isSomeInputEmpty = transactionName === '' || transactionAmount === '';

    if(isSomeInputEmpty){
        alert('Por favor, preencha tanto o nome quanto o valor da transação');
        return
    }
   
    addToTransactionArray(transactionName, transactionAmount);
    init();
    updateLocalStorage();
    cleanInputs();
}
// function that listens for form submission
form.addEventListener('submit', handleFormSubmit)
