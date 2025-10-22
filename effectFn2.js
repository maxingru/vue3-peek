//1.在effectFn.js基础上添加了的修改 p45



//对象data:
const data = {text:'hello'};
const bucket = new Set();

//统计当前的副作用函数
let activeEffect = null;
const obj = new Proxy(data,{
    get(target,key,receiver){
        if(affectFn){
            bucket.add(affectFn);
        }
        return target[key];
    },
    set(target,key,value,receiver){
        target[key]=value;
        //缺点：修改指定属性 -> 更新get指定属性的函数 ->重新设置桶的结构
        bucket.forEach((fn)=>fn());
        return true;
    }
});

//页面初始：先一加载 -> 执行所有副作用函数 -> 这样才能触发响应式数据的get -> 将函数加入桶内;
//函数
function effect1(){
    document.body.innerText = obj.text;
}
function effect2(){
    console.log(obj.text);
}
//需要先执行响应式数据的get -> 才能将该函数加入桶内;
addEffect(effect1);     
addEffect(effect2);
//修改响应式数据
setTimeout(()=>{
    obj.text();
    //会发现effect1和effect2的内容被更新了
},1000);


//1.因为同一时间只会执行一个函数 -> 遍历的依次加入桶内
//优化：
function addEffect(fn){
    activeEffect = fn;
    fn();
}






1.我设计的桶的结构：
key1 - [fn1,fn2];
key2 - [fn2,fn3];
这个不对吗？ 怎么weakmap 、map呢？？
