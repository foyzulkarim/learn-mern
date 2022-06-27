console.log('async promise file loaded');


const isPrime = (num) => {
    if (num < 2) return false;
    for (let i = 2; i < num; i++) {
        if (num % i === 0) return false;
    }
    return true;
}

const sleepWithPromise = (num) => {
    const p = new Promise((resolve) => {
        const start = Date.now();
        setTimeout(() => {
            resolve(new Date(start));
        }, num);
    }); // fn() is called immediately
    return p;
}

const syncWithPromise = () => {
    for (let index = 0; index < 10; index++) {
        console.log('sleeping: ', index, new Date().getSeconds());
        sleepWithPromise(index * 1000).then((start) => {
            const numIsPrime = isPrime(index);
            console.log('prime: ', index, numIsPrime, start, new Date().getSeconds());
        });
    }
}

syncWithPromise();

console.log('done');