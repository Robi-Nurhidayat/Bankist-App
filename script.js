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

const displayMovements = function (acc, sort = false) {
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  movs.forEach(function (mov, i) {
    const deposit = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
                    <div class="movements__type movements__type--${deposit}">${i} ${deposit}</div>
                    
                    <div class="movements__value">${mov}€</div>
                </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcCurrentBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, cur) => acc + cur);
  const balance = acc.balance;
  labelBalance.textContent = `${balance}`;
};

const calcSummaryBalance = function (acc) {
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

const getUsername = function (acc) {
  acc.forEach(val => {
    val.username = val.owner
      .toLowerCase()
      .split(' ')
      .map(val => val[0])
      .join('');
  });
};

getUsername(accounts);

const updateUi = function (acc) {
  // display balance
  calcCurrentBalance(acc);

  // display summary
  calcSummaryBalance(acc);

  // display movements
  displayMovements(acc);
};

// event handler
let currentAccount;
btnLogin.addEventListener('click', function (e) {
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
btnTransfer.addEventListener('click', function (e) {
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
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);
    updateUi(currentAccount);
  }

  inputLoanAmount.value = '';
});

// close account

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  const closeAccount = accounts.findIndex(
    acc => acc.username === currentAccount.username
  );

  accounts.splice(closeAccount, 1);

  containerApp.style.opacity = 0;
});

console.log(accounts);

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});
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

console.log(movements);

// movements.sort((a, b) => {
//     if (a > b) {
//         return 1;
//     }
//     if (b > a) {
//         return -1;
//     }
// });

movements.sort((a, b) => b - a);

console.log(movements);

const arr = [1, 2, 3, 4, 5, 6, 7];

console.log(arr);

const y = Array.from({ length: 7 }, () => 1);

console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1);

console.log(z);

const randomArray = Array.from(
  { length: 100 },
  () => Math.floor(Math.random() * 6) + 1
);

console.log(randomArray);

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );

  console.log(movementsUI);
});

// latihan array

// 1) menghitung jumlah pemasukkan bank

const bankDepositSum = accounts
  .flatMap(mov => mov.movements)
  .filter(mov => mov > 0)
  .reduce((sum, curr) => sum + curr);
console.log(bankDepositSum);

// 2). menghitung jumlah simpanan yang ada di bank minimal 1000$
// cara 1 menggunakan filter
// const sumDeposit1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;
// console.log(sumDeposit1000);

// cara 2 menggunakan reduce
const sumDeposit1000 = accounts
  .flatMap(acc => acc.movements)
  // .reduce((count, curr) => (curr >= 1000 ? (count += 1) : count), 0);
  .reduce((count, curr) => (curr >= 1000 ? ++count : count), 0);

console.log(sumDeposit1000);
console.log(accounts);

// 3) menentukan mana deposit dan withdrawls

const { deposit, withdrawls } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, curr) => {
      // cara 1

      // curr > 0 ? (sums.deposit += curr) : (sums.withdrawls += curr);
      // return sums;

      // cara 2

      sums[curr > 0 ? 'deposit' : 'withdrawls'] += curr;

      return sums;
    },
    { deposit: 0, withdrawls: 0 }
  );

console.log(deposit, withdrawls);

// 4) konversi huruf awal judul menjadi kapital
// example -> this is a nice title = This Is a Nice Title

const convertTitleCase = function (title) {
  // versi robi
  // const judul = title
  //   .split(' ')
  //   .map(val => {
  //     return val.length === 1 ? val : val[0].toUpperCase() + val.slice(1);
  //   })
  //   .join(' ');
  // return judul;

  // versi jonas

  const expections = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word =>
      expections.includes(word) ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join(' ');
  return titleCase;
};

console.log(convertTitleCase('this is a nice title'));
