const fp = require('lodash/fp')

// -----------------代码一 -------------------------
// horsepower马力，dollar_value价格，in_stack库存
const cars = [
    {
        name: "Ferrari FF",
        horsepower: 660,
        dollar_value: 700000,
        in_stock: true
    },
    {
        name: "Spyker C12 Zagato",
        horsepower: 650,
        dollar_value: 648000,
        in_stock: false
    }, {
        name: "Jaguar XKR-S",
        horsepower: 550,
        dollar_value: 132000,
        in_stock: false
    },
    {
        name: "Audi R8",
        horsepower: 525,
        dollar_value: 114200,
        in_stock: false
    },
    {
        name: "Aston Martin One-77",
        horsepower: 750,
        dollar_value: 1850000,
        in_stock: true
    },
    {
        name: "Pagani Huayra",
        horsepower: 700,
        dollar_value: 1300000,
        in_stock: false
    }
]


// ----------------- 练习一 -------------------------
let isLastInStack = fp.flowRight(fp.curry(fp.prop('in_stock')), fp.last)
console.log(isLastInStack(cars));

// ----------------- 练习二 -------------------------
let getFirstCarName = fp.flowRight(fp.curry(fp.prop('name')), fp.first)
console.log(getFirstCarName(cars));

// ----------------- 练习三 -------------------------
let _average = function (xs){
    return fp.reduce(fp.add, 0, xs) / xs.length
}
let getCarDollarValues = fp.curry(fp.map(car => car.dollar_value))
let averageDollarValue = fp.flowRight(_average, getCarDollarValues)
console.log(averageDollarValue(cars));

// ----------------- 练习四 -------------------------
let _underscore = fp.replace(/\W+/g,'_')
let sanitizeNames = fp.flowRight(fp.toLower, _underscore, fp.join(' '))
console.log(sanitizeNames(["Hello World"]));



// ----------------- 代码二 -------------------------
const { Maybe, Container } = require('./support.js')

// ----------------- 练习一 -------------------------
let maybe = Maybe.of([5, 6, 1])
let ex1 = maybe.map(x=>{
    let sum = 0
    fp.map(item=>{
        sum = fp.add(sum, item)
    }, x)
    return sum
})
console.log(ex1);

// ----------------- 练习二 -------------------------
let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do'])

let ex2 = xs.map(fp.first)
console.log(ex2);

// ----------------- 练习三 -------------------------
let safeProp = fp.curry(function(x, o){
    return Maybe.of(o[x])
})
let user = {id: 2, name: 'Albert'}
let ex3 = safeProp('name')(user).map(fp.first)
console.log(ex3);

// ----------------- 练习四 -------------------------
let ex4 = function (n) {
    return Maybe.of(n).map(parseInt)._value
}
console.log(ex4(1.2222));
