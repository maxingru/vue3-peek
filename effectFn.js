
目前问题：
    1.get时需要手动一个一个将副作用加入桶内
    2.set时：对于普通函数应该是只重新定义一遍吗？而不是响应式数据改变就重新执行一次!!!!!


//数据-> 响应式数据：拦截get、set操作
const obj = {text:'hello world'};
//桶：确保每个函数都是唯一名。
const bucket = new WeakSet();
const proxy = new Proxy(obj,{
    get(target,key){
        bucket.add();               //这里需要手动？？？？ 如果多个副作用函数 -> 也需要我手动？？
        return target[key];
    },
    set(target,key,newVal){
        target[key]=newVal;
        //将桶内的函数都重新定义一遍？  【这里不能是重新执行一次吧？仅仅计算属性和watch才会重新执行，普通函数不会重新执行？】
        bucket.forEach(fn=>fn());
        return true;    //代表操作成功
    }
})

//使用这个obj的函数:副作用函数
function effect(){
    documnet.body.innerText = obj.text;
}
effect();   //此时响应式数据=之前的
setTimeout(()=>{
    obj.text = 'new text';      //！！！这里修改这个obj.text -> effect函数不会重新执行吧？只是重新定义了而已
    //还需要手动执行一次obj.text吧？
},1000);