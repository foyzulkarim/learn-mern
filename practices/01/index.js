console.log('script loaded');

const strInput = prompt('Input the numbers as an array');
const numbers = strInput.split(',').map(n => parseInt(n));
const sum2 = numbers.reduce((s, c) => s = s + c, 0);

console.log(sum2);