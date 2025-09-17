//组件就是一组DOM元素的封装。
//那用一个函数表示组件：这个函数返回一组DOM元素。


//组件：返回一组虚拟DOM
const MyComponent = function(){
    return {
        tag:'div',
        props:{
            onClick:()=>console.log(22),
        },
        children:'click me'
    }
}


//使用虚拟DOM描述组件。
const vNode = {
    tag:MyComponent,

}


//渲染器：将虚拟DOM  -> 真实DOM
function renderer(vnode,root){
  //标签
  if(typeof vnode.tag==='string'){
    mountElement(vnode,root);
  // }else if(typeof vnode.tag === 'function'){
  //   mountComponent(vnode,root);
  // }else if(typeof vnode.tag === 'object' && vnode.tag!==null){
  //   mountComponent(vnode,root);  //或者 mountComponent(vnode.render);
  // }
  }else{
    mountComponent(vnode,root);
  }
}

//标签
function mountElement(vnode,root){
   
  const el = document.createElement(vnode.tag);
  //props
  for (const key of Object.keys(vnode.props)) {
    if(/^on/.test(key)){
        const eventName = key.split("on")[1].toLowerCase();
        el.addEventListener(eventName,vnode.props[key])
    }
  }
  //处理children
  if(typeof vnode.children ==="string"){
    const textNode = document.createTextNode(vnode.children);
    el.appendChild(textNode);
  }else if(Array.isArray(vnode.children)){
    vnode.children.forEach(node=>{
        renderer(node,el);
    })
  }
  root.appendChild(el);
}
//处理组件
function mountComponent(vnode,root){
    if(typeof vnode.tag==='function'){
      renderer(vnode.tag(),root);
    }else if(typeof vnode.tag ==='object' &&  vnode.tag!==null){
      renderer(vnode.tag.render(),root);
    }
}
renderer(vNode,document.body);





