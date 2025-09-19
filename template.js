<div id='foo' :class='cls'></div>


//编译器：将模板 -> 渲染函数
function render() {
    // return h('div',{class:'cls'});
    return {
        tag:'div',
        props:{
            id:'foo',
            class:cls
        },
        children:'',
        patchFlags:1,       //表示当前的class属性是动态的 ->方便后续的渲染器更新时使用
    }
}
