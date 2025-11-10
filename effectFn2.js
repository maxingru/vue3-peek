
//对象
const data = { text: "hello" };
const bucket = new Set();
let active = null;

//代理 -> 创建响应式对象
const obj = new Proxy(data, {
  get(target, key) {
    //副作用函数执行执行触发了响应式数据的get  -> 该副作用函数自动被加入桶内
    if(active){
        bucket.set(active);
    }
    return target[key];
  },
  set(target, key, val) {
    target[key] = val;
    //遍历桶重新执行一遍
    bucket.forEach((fn)=>fn());
    return true;
  },
});

//读取data的操作 和 setdata的操作
//1.页面初始化时：统计所有的副作用函数 -> 执行一遍副作用函数会触发响应式数据的get操作,从而被加入了桶内

const effect1 = () => {
  document.body.innerHTML = obj.text; //读取操作
};
const effect2 = () => {
  console.log(obj.text);
};
//3.这个仅仅是方便统计副作用函数
function addEffect(fn){
    active = fn;
    fn();
}
//2.遍历当前页面，[将所有的副作用函数加入响应式数据对应的get桶内] -> 不是手动将所有副作用函数都加入对应的set桶内，而是执行一遍副作用函数会触发响应式数据的get操作,被加入了桶内
addEffect(effect1);
addEffect(effect2);


//目前的缺陷：只要是任意属性的set -> 都会把每个副作用函数执行一遍
//现在要解决的：
/*
    1.仅set指定的顶层属性时 -> 仅触发这个属性的副作用函数
    2.新增的属性 -> 啥也不执行
*/

不使用set  -> 换个别的桶？
setTimeout(()=>{
    obj.notExist ='hello';
})


// 1.我设计的桶的结构：
// key1 - [fn1,fn2];
// key2 - [fn2,fn3];
// 这个不对吗？ 怎么weakmap 、map呢？？
