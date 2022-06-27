
// Write Javascript code!
console.log('Hello friends.');

const isPrime = (num) => {
    if (num < 2) return false;
    for (let i = 2; i < num; i++) {
        if (num % i === 0) return false;
    }
    return true;
};

const syncCallbackFunction = (number, start) => {
    const numIsPrime = isPrime(number);
    console.log(
        'isprime: ',
        number,
        ' result: ',
        numIsPrime,
        ' start ',
        start,
        ' end ',
        new Date()
    );
};

const sleepWithCallback = (number, callback) => {
    const start = Date.now();
    const sleep = number * 1000;
    while (true) {
        if (Date.now() - start > sleep) break;
    }
    callback(number, new Date(start));
};

const syncWithCallback = () => {
    for (let index = 0; index < 10; index++) {
        console.log('lopping:\t', index, '\t', new Date());
        sleepWithCallback(index, syncCallbackFunction);
    }
};

syncWithCallback();
console.log('all done');

const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>Learn MERN like a pro</h1>`;
