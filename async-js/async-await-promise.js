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
            resolve(new Date(start).toLocaleTimeString());
        }, num);
    }); // fn() is called immediately
    return p;
}

const syncWithPromise = async () => {
    for (let index = 0; index < 5; index++) {
        console.log('sleeping: ', index, new Date().toLocaleTimeString());
        const start = await sleepWithPromise(index * 1000);
        const numIsPrime = isPrime(index);
        console.log('prime: ', index, numIsPrime, start, new Date().toLocaleTimeString());
        console.log('index executed', index, new Date().toLocaleTimeString());
    }
}

(async () => {
    await syncWithPromise();
})().then(() => { console.log('all done') });

// const myPromise = await syncWithPromise();
// myPromise.then(() => {
//     console.log('all done');
// });

