//effectFn基础上更完善的响应式系统

//1.get 响应式数据时：将所有get响应式数据的函数[包括匿名函数等]都加入桶内

const data = {text:'hello world'}
const bucket = new Set();       //WeakSet无法遍历
//将所有副作用函数都通过这个注册到桶内？？

function effectFn(fn){
    bucket.add(fn); //1.不用再硬编码挨个将get响应式数据的函数手动加入桶内

}

const obj = new Proxy(data,{
    get(target,key){
        //1.解决了硬编码的函数名。2.但还是要挨个传函数？


        1.看下这里？？为啥他写的和我不一样？？？

        effectFn(fn1);                                //get响应式数据的函数fn1
        effectFn(()=>{console.log(obj.text)}); //get响应式数据的函数：匿名函数
        return target[key];
    },
    set(target,key,value){
        //当响应式数据改变 -> 取出桶内函数重新执行[仅computed、watch？]
        target[key]=value;
        bucket.forEach(fn=>fn());
        return true;
    }
})

