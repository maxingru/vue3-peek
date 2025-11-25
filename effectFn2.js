
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
// const data = { text: "hello" };
// const obj = new Proxy(data,{
//   get(target,key){
//     /*
//     1.这里每次都新建map? 和 value?
//     先读取一下？看是否存在？
//     怎么遍历的map???

//     */
//     const key = bucket.get();
//     bucket.set();   //
//     return target[key];
//   },
//   set(target,key,value){
//     target[key]=value;
//     //从bucket内都取出来执行一次
//     return true;
//   }
// });
// const obj1 = new Proxy(data,{});
// 页面一初始化时就加载
// const targetKeys = new Map([[obj,'id'],[obj,'text']]);
// const target1Keys = new Map([[obj1,'name']]);

// const bucket = new WeakMap();
// bucket.set(key1,new Set([fn1,fn2,fn3]));
// nucket.set(key2,new Set([fn]));

/*
1.桶内
WeakMap:
  每个key都是一个map
  每个value都是一个set  【只要是这个响应式对象的都搞在value中，然后修改响应式对象的任一个属性都把value中的fn执行一遍？？？】

*/

// const data = {text:'hello'}
// const bucket = new WeakMap();
// const activeFn = null;
// function addAffect(fn){
//   activeFn = fn;
//   fn();
// }
// const obj = new Proxy(data,{
//   get(target,key){
//     //凡是触发这个get的函数都加入桶内
//     if(activeFn){
//       //bucket.set(activeFn);
//       const key = new Map
//     }
//     return target[key]
//   },
//   set(target,key,value){
//     target[key]=value
//     return true;
//   }
// });


// const fn1 = ()=>{
//   document.body.innerHTML = obj.text;
// }
// const fn2 = ()=>{
//   console.log(obj.text);
// }

// //页面一加载,页面的先执行一遍？
// addAffect(fn1);
// addAffect(fn2);





// const obj1 = new Proxy(data,{})
// const bucket1 = new WeakMap();
// //响应对象1
// const target1Key = new Map([[obj1,'name'],[obj1,'id']]);
// const target1Val = new Set();



// 1.重新来一遍：
// 为啥activeEffect何时为空
// set内 depsMap何时为空？？


//1.我要创建一个响应式对象
//2.我要创建一个桶
//3.我要创建一个副作用函数
//4.我要创建一个代理对象
//5.我要在代理对象的get中收集副作用函数
//6.我要在代理对象的set中触发副作用函数

//1.响应式数据:get操作加入桶内，set操作触发桶内的副作用函数
const obj = {text:'hello'};  //我要让这个对象变成响应式对象
//2.创建一个桶
const bucket = new Set();
const activeFn = null;
const data = new Proxy(data,{
  get(target,key){
    if(activeFn){
      bucket.add(activeFn); //
    }
    console.log("触发get:",key);
    return target[key]
  },
  set(target,key,value){
    target[key] = value;
    bucket.forEach((fn)=>fn());
    console.log("触发set:",key,value);
    return true;
  }
});
//1.我已经创建完一个响应式对象data
//2.现在我要使用这个响应式对象
//3.这个响应式对象应该满足的要求： [watch/computed/template 和 其它]
// 现在的要求：当我set这个响应式对象时 -> 凡是get这个响应式对象的地方全都重新执行一遍
const effect1 = ()=>{
  console.log = obj.text; //这里自动会触发get操作->我只需要执行这个函数就行。
}
const effect2 = ()=>{
  console.log(obj.text);
}

//1.当前的页面初始化 ->所有get这个响应式数据的地方都加入桶内
activeFn = effect1;



//1.页面初始化完之后：我set响应式数据
setTimeout(()=>{
  obj.text = 'world';
},2000);



