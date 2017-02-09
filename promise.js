function getPromise() {
    return new Promise((resolve, reject) => {
        if (true) {
            setTimeout(() => {
                resolve({aaa: 111});
            }, 1000);
        } else {
            reject('error');
        }
    });
}

async function done() {
    let result = null;
    try {
        result = await getPromise();
    } catch (err) {
        console.log(err);
    }
    return result;
}

const t = await done();
console.log(t);
