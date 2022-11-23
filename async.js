//Asynchronous code are things that run in the background
//Usually involves some long running tasks

const examplePromise = new Promise((resolve,reject) => {
    setTimeout(() => {
        if (Math.random() > 0.5) {
            resolve("Success");
        }
        else {
            reject("Failure");
        }
    },2000);
});

async function asyncFunction() {
    const result = await examplePromise;
    console.log(result);
}
asyncFunction().catch(console.log);

async function hello() { return "Hello" };
console.log(hello());

let hello1 = async () => {return "Hello"};
hello().then(console.log);