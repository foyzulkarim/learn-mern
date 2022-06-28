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
    const promises = [];
    //for (let index = 0; index < 5; index++) {
    for await (const index of [...new Array(5)].keys()) {
        console.log('sleeping: ', index, new Date().toLocaleTimeString());
        const startPromise = sleepWithPromise(index * 1000).then(start => {
            const numIsPrime = isPrime(index);
            const now = new Date().toLocaleTimeString();
            console.log('prime: ', index, numIsPrime, start, now);
            console.log('index executed', index, now);
            return { index, start, numIsPrime, now };
        });
        promises.push(startPromise);
    }
    const results = await Promise.all(promises);
    console.log('results', results);
}

(async () => {
    await syncWithPromise();
})().then(() => { console.log('all done') });

console.log('last line');