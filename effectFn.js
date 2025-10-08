


//数据-> 响应式数据：拦截get、set操作
//将一个数据变为响应式数据：
//需要在这个数据改变时 -> 重新执行一遍所有get该数据的函数
//就是拦截这个数据的get 和 set
//get:凡是读取该数据的函数均放入桶内
//set:当修改该数据时 -> 把桶内的函数都重新执行一遍。

const data = {text:'hello world'};
//get响应式数据的函数
function effectFn(){
    console.log(obj.text);
    // document.body.innerText = obj.text; //范围的代理对象
}
//桶
const bucket = new Set();
const obj = new Proxy(data,{
    get(target,key){
        bucket.add(effectFn); 缺点：需要一个一个将get响应式数据的函数加入桶内？？
        return target[key];
    },
    set(target,key,value){
        //重新set响应式数据时 -> 将副作用函数从桶里拿出来执行
        target[key]=value;
        bucket.forEach(fn=>fn());   【缺点2：每个get的函数都是重新执行？是仅computed/watch这种才会重新执行吧？普通函数变量不会吧？】
        return true;
    }
})

//测试obj是否为响应式数据？
//先读取
effectFn(); 
setTimeout(()=>{
    obj.text='测试';//当响应式数据改变时 -> 测试get该响应式数据的函数是否自动重新执行了。
},1000);







