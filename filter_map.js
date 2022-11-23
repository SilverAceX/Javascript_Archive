//Lab 2 Tertius Erskine
array = [1,2,3,4,5,6,7];
const filteredArray = array.filter(item => item > 2)
console.log(filteredArray);
console.log(array);

const mappedArray = array.map( item => {
    const squareItem = Math.pow(item, 3);
    return `This is my result`
})

console.log(mappedArray)

export const secondMap = (param) => "This is the parameter " + param;
console.log(secondMap(5));

const transformAndPrint = (array, transformFunc) => {
    const transformedArray = array.map(transformFunc);
    console.log(transformedArray);
}