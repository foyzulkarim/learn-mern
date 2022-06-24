console.log('script.js loaded');

const isPrime = (num) => {
    if (num < 2) return false;
    for (let i = 2; i < num; i++) {
        if (num % i === 0) return false;
    }
    return true;
}

const sleep = (num) => {
    const start = Date.now();
    while (true) {
        if (Date.now() - start > num) break;
    }
    return true;
}

const sync = (data) => {
    console.log(data);
    for (let index = 0; index < 10; index++) {
        console.log(index);
        const isDone = sleep(index * 1000);
        if (isDone) {
            const numIsPrime = isPrime(index);
            console.log(index, numIsPrime);
        }
    }
}

const sleepWithCallback = (num, callback) => {
    const start = Date.now();
    while (true) {
        if (Date.now() - start > num) break;
    }
    callback(new Date(start).getSeconds());
}

const syncCallbackFunction = (start) => {
    const numIsPrime = isPrime(index);
    console.log('prime: ', index, numIsPrime, start, new Date().getSeconds());
};

const syncWithCallback = (data) => {
    console.log(data);
    for (let index = 0; index < 10; index++) {
        console.log('sleeping: ', index, new Date().getSeconds());
        sleepWithCallback(index * 1000, syncCallbackFunction);
    }
}

const sleepWithSetTimeout = (num, callback) => {
    const start = Date.now();
    setTimeout(() => {
        callback(new Date(start).getSeconds(), num);
    }, num * 1000);
}
const setTimeOutCallbackFunction = (start, index) => {
    const numIsPrime = isPrime(index);
    console.log('prime: ', index, numIsPrime, start, new Date().getSeconds());
};
const syncWithSetTimeout = () => {
    for (let index = 0; index < 10; index++) {
        console.log('sleeping: ', index, new Date().getSeconds());
        sleepWithSetTimeout(index, setTimeOutCallbackFunction);
    }
}

const sleepWithPromise = (num) => {
    const p = new Promise((resolve) => {
        const start = Date.now();
        setTimeout(() => {
            resolve(new Date(start).getSeconds());
        }, num);
    });
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

const sleepWithAsync = async (num) => {
    const start = Date.now();
    setTimeout(() => {
        console.log('resolving: ', num, new Date().getSeconds());
        return new Date(start).getSeconds();
    }, num);
}

const asyncFn = async (data) => {
    console.log(data);
    for (let index = 0; index < 10; index++) {
        console.log('sleeping: ', index, new Date().getSeconds());
        const start = await sleepWithAsync(index * 1000);
        const numIsPrime = isPrime(index);
        console.log('prime: ', index, numIsPrime, start, new Date().getSeconds());
    }
}

const sleepWithAsyncPromise = async (num) => {
    const myPromise = new Promise((resolve) => {
        const start = new Date();
        const sleepingTime = 1000 * num;
        console.log('sleepingTime: ', sleepingTime, start.toLocaleTimeString());
        setTimeout(() => {
            console.log('sleepingTimeResolved: ', sleepingTime, new Date().toLocaleTimeString());
            resolve(start);
        }, sleepingTime);
    });
    return myPromise;
}

const asyncCaller1 = async () => {
    for await (const index of [...new Array(10)].keys()) {
        console.log('sleeping called: ', index, new Date().toLocaleTimeString());
        sleepWithAsyncPromise(index).then((start) => {
            const numIsPrime = isPrime(index);
            console.log('result: ', index, numIsPrime, start.toLocaleTimeString(), (new Date() - start) / 1000);
        });
    }
}

const asyncCaller2 = async () => {
    for await (const index of [...new Array(10)].keys()) {
        console.log('sleeping called: ', index, new Date().toLocaleTimeString());
        const start = await sleepWithAsyncPromise(index);
        const numIsPrime = isPrime(index);
        console.log('result: ', index, numIsPrime, start.toLocaleTimeString(), (new Date() - start) / 1000);
    }
}


// syncWithCallbackFunction('d');
// syncWithSetTimeout('d');
// syncWithPromise('d');
// asyncFn('d');
(async () => { await asyncCaller2(); })();
console.log('done');