# 什么是函数式编程

函数式编程(Functional Programming, FP)，FP是编程范式之一,我们常听说的编程范式还有面向过程编程、面向对象编程。

- 面向过程编程：按照步骤来实现，一步一步的实现功能

- 面向对象编程的思维方式：把现实世界中的事物抽象成程序世界中的类和对象，通过封装、继承和多态来演示事物事件的联系

- 函数式编程的思维方式：把现实世界的事物和事物之间的联抽象到程序世界(`对运算过程进行抽象`)

- 程序的本质：根据输入通过某种运算获得相应的输出，程序开发过程中会涉及很多有输入和输出的函数 `x->f(联系、映射)>y`, `y=f(x)`

- 函数式编程中的函数指的不是程序中的函数(方法)，而是数学中的函数即映射关系，例如: y = sin(x), x和y的关系

特点：
- 相同的输入始终要得到相同的输出(`纯函数`)

- 函数式编程用来描述数据(`函数`)之间的映射
  
- 可以实现代码重用

```js
//非函数式
let num1 = 2
let num2 = 3
let sum = num1 + num2
console.log(sum)

// 函数-对运算过程的抽象封装
function add (n1, n2){
    return n1 + n2
}
let sum = add(2, 3)
console.log(sum)
```




## 高阶函数（Highter-order function）
应用
- 可以把函数作为参数传递给另一个函数
- 可以把函数作为函数的返回值

作为函数的参数
```js
// forEach实现
function forEach(array,fn){
    for(let i=0,len = array.length;i<len;i++){
        fn(array[i],i)
    }
}
let arr = [1,2,4,67,46]
forEach(arr,function(item,index){
    console.log(item,index)
})

// filter实现
function filter(array,fn){
    let results = [];
    for(let i=0,len=array.length; i<len;i++){
        results.push(arr[i],i)
    }
    return results;
}
let arr = [1,3,4,7,8];
const res = filter(arr,function(item,index){
    return item%2===0;
})
console.log(res);
```
> 优点：灵活控制函数执行过程，可以在运行时控制独立的执行逻辑，避免公共函数的过度耦合

作为函数的返回值
```js
// once实现-支付等场景
function once(fn){
    let done = false;
    return function(){
        if(!done){
            done = true;
            return fn.apply(this,arguments)
        }
    }
}
let pay = once(function(money){
    console.log(`支付：${money}RMB`)
})
pay(1)
pay(2)
pay(3)
pay(4)
```
> 优点：缓存状态，控制函数执行

```js
// map实现
const map(array,fn)=>{
    for(let i=0,len=array.length;i<len;i++){
        return fn(array[i],i)
    }
}
let arr = [1,2,3,4];
const res1 = map(arr,(item,index)=>{
    console.log(item,index)
})
```
高阶函数总结：
- 高阶函数可以抽象函数的公共部分
- 在开发中只关注不同场景下的逻辑处理






## 闭包
---
函数中返回的函数，在返回的函数中访问了外部函数中的成员变量
- 函数中返回了新的函数
- 返回的函数访问外部函数的成员变量

```js
// 闭包的使用场景：once
funcion once(fn){
    let done = false;
    return function(){
        if(!done){
            done = true;
            fn.apply(this,arguments);
        }
    }
}
let pay = once(function(money){
    console.log(`支付：${money}RMB`)
})
pay(343)
pay(343)
```
闭包的本质：
> 函数在执行时放到执行栈中，当函数执行完毕之后会从执行栈上移除；但是闭包中的成员变量被内部函数引用，导致函数不能正常释放

- 闭包的作用：延长了函数成员变量的使用寿命
- 闭包的不足：导致函数成员变量无法正常被释放，可能会导致内存泄漏




## 纯函数（Pure functions）
---
- 相同的输入都会得到相同的输出
- 函数执行过程没有任何副作用


```js
// 纯函数slice：返回数组中指定的部分，不会改变原数组
let arr1 = [1,2,3,4,5]
arr1.slice(0,3);
// => [1,2,3]
arr1.slice(0,3);
// => [1,2,3]
arr1.slice(0,3);
// => [1,2,3]

// 副作用函数splice：返回数组中指定的部分，不会改变原数组
let arr2 = [1,2,3,4,5]
arr2.splice(0,3);
// => [1,2,3]
arr2.splice(0,3);
// => [4,5]
arr2.splice(0,3);
// => []
```



## 副作用
---
函数依赖外部变量，造成函数的无法保证相同的输入有相同的输出，带来副作用
```js
// 函数中有外部依赖，无法保证相同的输入得到相同的输出
let miniAge = 18;
function checkAge(age){
    return age>=miniAge
}
```



## 柯里化（currying）
---
- 一个函数有多个参数，先把一部分参数传递进去（利用闭包把这部分的参数保存起来）
- 同时，返回一个函数，在返回的函数中传递剩余参数，并返回结果

```js
// 柯里化应用
function checkAge(miniAge){
    return function(age){
        return age>=miniAge;
    }
}
// es6实现
const checkAge = ( miniAge ) => ( age => age >= miniAge );

const check18 = checkAge(18);
const check20 = checkAge(20);
console.log(check18(20))
console.log(check18(24))
console.log(check20(19))
```