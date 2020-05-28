async function t5(){
    let a = await new Promise((resolve=>{
        resolve('hello')
    })).then(res=>{
        // return 'hello then'
        let b = res;
    }).then(res=>{
        return 'last then'
    })
    console.log(a);
    
}
t5()