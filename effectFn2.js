
// //对象
// const data = { text: "hello" };
// const bucket = new Set();
// let active = null;

// //代理 -> 创建响应式对象
// const obj = new Proxy(data, {
//   get(target, key) {
//     //副作用函数执行执行触发了响应式数据的get  -> 该副作用函数自动被加入桶内
//     if(active){
//         bucket.set(active);
//     }
//     return target[key];
//   },
//   set(target, key, val) {
//     target[key] = val;
//     //遍历桶重新执行一遍
//     bucket.forEach((fn)=>fn());
//     return true;
//   },
// });

// //读取data的操作 和 setdata的操作
// //1.页面初始化时：统计所有的副作用函数 -> 执行一遍副作用函数会触发响应式数据的get操作,从而被加入了桶内

// const effect1 = () => {
//   document.body.innerHTML = obj.text; //读取操作
// };
// const effect2 = () => {
//   console.log(obj.text);
// };
// //3.这个仅仅是方便统计副作用函数
// function addEffect(fn){
//     active = fn;
//     fn();
// }
// //2.遍历当前页面，[将所有的副作用函数加入响应式数据对应的get桶内] -> 不是手动将所有副作用函数都加入对应的set桶内，而是执行一遍副作用函数会触发响应式数据的get操作,被加入了桶内
// addEffect(effect1);
// addEffect(effect2);


// //目前的缺陷：只要是任意属性的set -> 都会把每个副作用函数执行一遍
// //现在要解决的：
// /*
//     1.仅set指定的顶层属性时 -> 仅触发这个属性的副作用函数
//     2.新增的属性 -> 啥也不执行
// */

// // 不使用set  -> 换个别的桶？
// setTimeout(()=>{
//     obj.notExist ='hello';
// })

/*
修改桶：
target1:
  key1:[fn,fn1,fn2]
  key2:[fn,fn3,fn5]
target2:
  key1:[f2],
  key2:[f3]


我还要记下每个对象：
WeakMap: key-value
key: 
  Map:key-value
  key:target
  valye:key
value:
  set:[fn1]
  
*/
const data = { text: "hello" };
const obj = new Proxy(data,{
  get(target,key){
    /*
    1.这里每次都新建map? 和 value?
    先读取一下？看是否存在？
    怎么遍历的map???

    */
    const key = bucket.get();
    bucket.set();   //
    return target[key];
  },
  set(target,key,value){
    target[key]=value;
    //从bucket内都取出来执行一次
    return true;
  }
});
const obj1 = new Proxy(data,{});
页面一初始化时就加载
const targetKeys = new Map([[obj,'id'],[obj,'text']]);
const target1Keys = new Map([[obj1,'name']]);

const bucket = new WeakMap();
bucket.set(key1,new Set([fn1,fn2,fn3]));
nucket.set(key2,new Set([fn]));




/*
map:
属性和方法：
size
set()
get()
has()
delete()
clear()

遍历
forof 
forEach
keys()
values()
entries()


*/