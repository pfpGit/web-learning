export {}
interface Eat {
    eat(food:string):void
}
class Persion implements Eat{
    // 类型标注
    name:string
    private age:number
    protected gender:boolean

    constructor(name:string,age:number) {
        this.name = name;
        this.age = age;
        this.gender = true;
    }

    say(msg:string):void{
        console.log('I am '+this.name,msg);
    }

    eat(){
        console.log(this.gender);
        
    }
}

class Student extends Persion{
    private constructor(name:string, age: number){
        super(name,age)
        // console.log(this.age);
        console.log(this.gender);
        
    }

    static create(name:string,age:number){
        return new this(name,age)
    }
}

const s = Student.create('pfp',10);
// const ss = new Student('pfp',22);

const tom = new Persion('tom',10);
console.log(tom.name);
// console.log(tom.age);
// console.log(tom.gender);
