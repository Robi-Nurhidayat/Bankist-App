'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function(acc) {
    const movements = acc.movements.forEach(function(mov, i) {
        const deposit = mov > 0 ? 'deposit' : 'withdrawal';
        const html = `<div class="movements__row">
                    <div class="movements__type movements__type--${deposit}">${i} ${deposit}</div>
                    
                    <div class="movements__value">${mov}€</div>
                </div>`;

        containerMovements.insertAdjacentHTML('afterbegin', html);
    });
};

const calcCurrentBalance = function(acc) {
    acc.balance = acc.movements.reduce((acc, cur) => acc + cur);
    const balance = acc.balance;
    labelBalance.textContent = `${balance}`;
};

const calcSummaryBalance = function(acc) {
    const summaryIn = acc.movements
        .filter(mov => mov > 0)
        .reduce((acc, cur) => acc + cur);
    labelSumIn.textContent = `${summaryIn}`;

    const summaryOut = acc.movements
        .filter(mov => mov < 0)
        .reduce((acc, cur) => acc + cur);

    labelSumOut.textContent = `${summaryOut}`;

    const summaryInterest = acc.movements
        .filter(mov => mov > 0)
        .map(mov => mov * 2)
        .reduce((acc, cur) => acc + cur);

    labelSumInterest.textContent = `${summaryInterest}`;
};

const getUsername = function(acc) {
    acc.forEach(val => {
        val.username = val.owner
            .toLowerCase()
            .split(' ')
            .map(val => val[0])
            .join('');
    });
};

getUsername(accounts);

const updateUi = function(acc) {
    // display balance
    calcCurrentBalance(acc);

    // display summary
    calcSummaryBalance(acc);

    // display movements
    displayMovements(acc);
};

// event handler
let currentAccount;
btnLogin.addEventListener('click', function(e) {
    e.preventDefault();

    currentAccount = accounts.find(
        acc => acc.username === inputLoginUsername.value
    );

    if (currentAccount.pin === Number(inputLoginPin.value)) {
        // menampilkan menu utama (App)
        containerApp.style.opacity = 100;
        updateUi(currentAccount);

        inputLoginUsername.value = inputLoginPin.value = '';
        inputLoginUsername.blur();
        inputLoginPin.blur();
    }
});

// btn transfer
btnTransfer.addEventListener('click', function(e) {
    e.preventDefault();

    const userReceiver = accounts.find(
        user => user.owner === inputTransferTo.value
    );

    const amount = Number(inputTransferAmount.value) * 0.1;

    if (
        userReceiver.owner !== currentAccount.owner &&
        currentAccount.balance > amount
    ) {
        currentAccount.movements.push(-amount);
        userReceiver.movements.push(amount);

        updateUi(currentAccount);
    }

    inputTransferTo.value = inputTransferAmount.value = '';
});

// btn loan
btnLoan.addEventListener('click', function(e) {
    e.preventDefault();
    const amount = Number(inputLoanAmount.value) * 0.1;

    currentAccount.movements.push(amount);

    inputLoanAmount.value = '';
    updateUi(currentAccount);
});

// close account

btnClose.addEventListener('click', function(e) {
    e.preventDefault();

    const closeAccount = accounts.findIndex(
        acc => acc.username === currentAccount.username
    );

    accounts.splice(closeAccount, 1);

    containerApp.style.opacity = 0;
});

console.log(accounts);
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// const getFirstName = function(acc) {
//     const namaSmall = acc
//         .toLowerCase()
//         .split(' ')
//         .map(nama => nama[0])
//         .join('');

//     return namaSmall;
// };

// console.log(getFirstName(account1.owner));