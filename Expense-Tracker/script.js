// Get DOM elements
const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const transactionForm = document.getElementById('transaction-form');
const textInput = document.getElementById('text');
const amountInput = document.getElementById('amount');
const categoryInput = document.getElementById('category');
const transactionList = document.getElementById('transaction-list');
const filterButtons = document.querySelectorAll('.filter-btn');

// Local storage key
const STORAGE_KEY = 'transactions';

// Get transactions from local storage
let transactions = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
let currentFilter = 'all';

// Initialize app
function init() {
    updateUI();
    setupFilterButtons();
}

// Update UI
function updateUI() {
    const amounts = transactions.map(transaction => transaction.amount);
    
    const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
    const incomeTotal = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => acc + item, 0)
        .toFixed(2);
    const expenseTotal = (
        amounts
            .filter(item => item < 0)
            .reduce((acc, item) => acc + item, 0) * -1
    ).toFixed(2);
    
    balance.textContent = `$${total}`;
    income.textContent = `$${incomeTotal}`;
    expense.textContent = `$${expenseTotal}`;
    
    displayTransactions();
}

// Display transactions
function displayTransactions() {
    transactionList.innerHTML = '';
    
    const filteredTransactions = transactions.filter(transaction => {
        if (currentFilter === 'all') return true;
        if (currentFilter === 'income') return transaction.amount > 0;
        if (currentFilter === 'expense') return transaction.amount < 0;
    });
    
    filteredTransactions.forEach(transaction => {
        const sign = transaction.amount < 0 ? '-' : '+';
        const type = transaction.amount < 0 ? 'expense' : 'income';
        
        const item = document.createElement('li');
        item.classList.add('transaction-item', type);
        
        item.innerHTML = `
            <div class="transaction-info">
                <div class="transaction-text">${transaction.text}</div>
                <div class="transaction-category">${transaction.category}</div>
            </div>
            <span class="transaction-amount ${type}">${sign}$${Math.abs(transaction.amount).toFixed(2)}</span>
            <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">×</button>
        `;
        
        transactionList.appendChild(item);
    });
}

// Add transaction
function addTransaction(e) {
    e.preventDefault();
    
    if (textInput.value.trim() === '' || amountInput.value === '' || categoryInput.value === '') {
        alert('Please fill in all fields');
        return;
    }
    
    const transaction = {
        id: generateID(),
        text: textInput.value,
        amount: +amountInput.value,
        category: categoryInput.value
    };
    
    transactions.push(transaction);
    updateLocalStorage();
    updateUI();
    
    textInput.value = '';
    amountInput.value = '';
    categoryInput.value = '';
}

// Generate random ID
function generateID() {
    return Math.floor(Math.random() * 1000000);
}

// Delete transaction
function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    updateUI();
}

// Update local storage
function updateLocalStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

// Setup filter buttons
function setupFilterButtons() {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentFilter = button.dataset.filter;
            displayTransactions();
        });
    });
}

// Event listeners
transactionForm.addEventListener('submit', addTransaction);

// Initialize
init();