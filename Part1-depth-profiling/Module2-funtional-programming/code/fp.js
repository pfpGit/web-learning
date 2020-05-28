/**
 * 高阶函数-作为函数参数
 */
// forEach实现
function forEach(array, fn) {
    for (let i = 0, len = array.length; i < len; i++) {
        fn(array[i], i)
    }
}
let arr = [1, 2, 4, 67, 46]
forEach(arr, function (item, index) {
    console.log('forEach:',item, index)
})

// filter实现
function filter(array, fn) {
    let results = [];
    for (let i = 0, len = array.length; i < len; i++) {
        if(fn(array[i])){
            results.push(array[i])
        }
    }
    return results;
}
let arr1 = [1, 3, 4, 7, 8];
const res = filter(arr1, function (item) {
    return item%2===0;
})
console.log('filter:',res);

// map实现
const map=(array, fn) => {
    let results = [];
    for (let i = 0, len = array.length; i < len; i++) {
        results.push(fn(array[i],i))
    }
    return results
}
let mapArr1 = [1, 2, 3, 4];
const res1 = map(mapArr1, item=>item*item)
console.log(res1);

let mapArr2 = [{count:1},{count:2},{count:3},];
const res2 = map(mapArr2, (item,index)=>{
    item.count = index
    return { ...item,name:'new name'};
})
console.log('mapArr2==>',mapArr2);
console.log('res2==>',res2);

// every实现
const every= (array,fn)=>{
    let result = true;
    for(let i = 0,len=array.length;i<len;i++){
        let tmp = fn(array[i],i);
        if(!tmp){
            result = false;
            break;
        }
    }
    return result;
}
const eArr1 = [1,2,3,5,67,8,8];
const eRes1 = every(eArr1,(item,index)=>{
    return item < 8;
})
console.log(eRes1);

// some实现
const some= (array,fn)=>{
    let result = false;
    for(let i = 0,len=array.length;i<len;i++){
        let tmp = fn(array[i],i);
        if(tmp){
            result = true;
            break;
        }
    }
    return result;
}
const sArr1 = [1,2,3,5,67,8,8];
const sRes1 = some(eArr1,(item,index)=>{
    return item < 8;
})
console.log(sRes1);


/**
 * 高阶函数-作为函数返回值
 */
// once实现-支付等场景
function once(fn) {
    let done = false;
    return function () {
        if (!done) {
            done = true;
            return fn.apply(this, arguments)
        }
    }
}
let pay = once(function (money) {
    console.log(`支付：${money}RMB`)
})
pay(1)
pay(2)
pay(3)
pay(4)

// 闭包案例-求平方
function pow(pow) {
    return function (number) {
        return Math.pow(number, pow)
    }
}
const pow2 = pow(2);
const pow32 = pow2(3);
const pow42 = pow2(4);
console.log(pow32, pow42);


// 闭包案例-员工工资
function makeSalary(base) {
    return function (performence) {
        return base + performence;
    }
}
const level1 = makeSalary(10000);
const level2 = makeSalary(20000);
console.log(level1(15000), level2(1000));

 
// 纯函数库lodash使用
const _ = require('lodash');
const lArr = ['jack','tom','lucy','kate'];
console.log(_.first(lArr));
console.log(_.last(lArr));
console.log(_.toUpper(_.first(lArr)));
console.log(_.reverse(lArr));


// 柯里化应用一
function checkAge(miniAge) {
    return function (age) {
        return age >= miniAge;
    }
}
// es6实现
// const checkAge = (miniAge) => (age => age >= miniAge);

const check18 = checkAge(18);
const check20 = checkAge(20);
console.log(check18(20))
console.log(check18(24))
console.log(check20(19))

// 柯里化应用二
const match =  _.curry(function(reg, str){
    return str.match(reg)
})

const haveSpace = match(/\s+/g);
const haveNumber = match(/\d+/g);

const filter1 = _.curry(function(fn,array){
    return array.filter(fn)
})

const cArr = ['John Conner', 'John Donne'];
console.log(filter1(haveSpace,cArr));
console.log(filter1(haveNumber,cArr));
