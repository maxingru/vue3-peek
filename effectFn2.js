//effectFn基础上更完善的响应式系统




//1.页面一加载：先都执行一遍，将读取响应式数据的加入桶内;
function fn1(){document.body.innerText=obj.text;}
const fn2 = ()=>{console.log(obj.text)}
// fn1();
// fn2();
//2.问题现在就在：页面一加载时，如何将副作用函数(这里是get响应式数据的函数)加入桶内
//解决方法：响应式系统中提供一个变量-让用户把副作用函数(涉及到get响应数据的函数)自己加入桶内

// activeEffect = fn1;
// activeEffect = fn2;

//3.提供一个变量-需要保证函数fn1()执行在activeEffect赋值之后，太麻烦 -> 提供Effect函数给用户
//这样用户传给Effect的参数就是：依赖(get)响应式数据的函数，且响应式数据改变时重新执行参数函数
//这里Effect的作用就类似 计算属性computed
Effect(fn1);        //参数:fn:Function    
Effect(fn2);


4.现在的问题很简单了：就是优化下面的响应式系统
 【当给obj.新增一个属性时 -> 也执行了桶内的。  那如何拦截新增属性？->Proxy的Vue3中也无法做到新增属性是响应的而是非响应性的？】


//# 下面是响应式系统：不需要管
const data = {text:'hello world'}
const bucket = new Set();       //WeakSet无法遍历
let activeEffect = null;
function Effect(fn){
    activeEffect = fn;
    fn();
}
const obj = new Proxy(data,{
    get(target,key){
        //1.之前bucket.add(fn1) 硬编码
        //2.现在effectFn(fn1/fn2)还是硬编码的
        //解决：使用变量
        if(activeEffect){
            bucket.add(activeEffect);
        }
        return target[key];
    },
    set(target,key,value){
        //当响应式数据改变 -> 取出桶内函数重新执行[仅computed、watch？]
        target[key]=value;
        bucket.forEach(fn=>fn());
        return true;
    }
})

