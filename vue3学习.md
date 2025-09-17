# 第一章
## 1.4
1.运行时框架
你写了一个框架，框架提供一个Render函数。
你的Render函数要求一个树形结构的参数。 
用户直接手写一个树形结构的对象 -> 你的框架 -> 渲染页面。

因为只支持用户必须手写一个指定结构的对象，用户也不需要学习额外知识。
你现在的框架就是一个纯运行时框架。

运行时+ 编译时：
因为用户每次提供一个对象抱怨太麻烦 -> 你还提供一个Compiler，支持用户直接传标签。
但需要先编译成你Render函数能接受的格式。 这就是编译时 + 运行时。
既可以让用户直接提供数据对象 不经过编译器。
还可以让用户提供标签-> 框架的Compiler编译后  -> 给Render函数 -> 渲染页面。


用户提供标签 -> 框架的Compiler【分析用户提供信息，返回数据对象】 -> 框架的Render函数 -> 渲染。
或者 
用户直接提供数据对象 -> 框架的Render函数 -> 渲染。


## 1.5
1.你的运行时+ 编译时框架

用户提供标签 - > Complier -> Render -> 渲染。
用户直接提供数据对象 ->Render ->渲染。

框架要求：
-1 提供哪些构建产物(不同环境：开发/生产。不同使用场景：script.src标签直接引入)
    [
        不同使用场景：
        -1 IIFE格式 [vue.global.js -> 被scritp.src直接引入] [rollup对vue打包时指定的format:iife]
        -2 esm格式: [就是vue是es模块构建的] [ ES 模块不能通过 file:// 协议工作] 
        [vue.esm.browser.js   -> 给<script type='module'> import Vue from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js' </script>>使用的。
         vue.esm.bundler.js文件 -> 给打包工具webpack/rollup使用的。 [因为用户会使用打包工具的变量process.env.NODE_ENV来代替源码中的__DEV__ 手动决定构建结果的环境是什么]
        -3 服务端渲染：vue.js代码在Node.js环境下运行。模块格式为commonJS -> .cjs [rollup打包vue时 -> format:'cjs']
            const Vue = require('vue.cjs.js');
    ]
![alt text](image-2.png)
-2 给用户提供哪些特性开关：
    [
        实现：利用rollup.js的预定义常量插件实现：
        1.用户可以开关特性 -> Tree-shaking让关闭特性不包裹在最终结果中。
        2.框架升级时，使用特性开关让用户选择是否使用遗留API [让用户自己使用构建工具vite/webpack来决定特性开关的值=true/false]

    ]
-3 给用户提供错误处理后的-> 而不是让用户自己手动挨个进行try.catch
    [
        //这个要求同样可以用到自己定义的第三方库中。
        将使用该框架时出现的错误捕获 -> 提供一个函数给用户，用户调用这个函数拿到框架内捕获到的错误 -> 上报监控系统 or 不管。
       
    ]

-2 警告提示 [仅__DEV__下打印]
-3 HMR
-3 关闭框架中未使用到的功能减少打包体积。
    [Tree-shaking:前提ESMoudle。
    因为Tree-shaking依赖ESM的静态结构。
    rollup.js和webpack.js都支持Tree-shaking
    Tree-shaking: -1 删除dead code -2 没什么用但产生副作用的代码不能删除。 -3 手动告诉构建工具可以删除这段代码（/*#__PURE__*/ 一般只在顶级作用域添加这个注释，函数内的代码不调用这个函数自然不会产生副作用自然被构建工具自动tree-shaking）
    ]


## 1.6
框架设计思路
1. 如何声明式的描述UI [元素、属性v-bind、事件@、层级]
    -1 模板
    -2 js对象   [=虚拟DOM，虚拟DOM就是用来描述真实DOM元素/组件的一个js对象]
        为了方便使用h函数封装一下，h返回返回js对象(虚拟DOM)
        return {tag:'div',props:{onClick:handler},children:[{tag,props,''}]}
        = return h('div',{onClick:handler}?,'' or [h('span',"当前值")]);
渲染函数：
就是返回虚拟DOM的一个函数.  (-> 用返回的这个虚拟DOM(js对象)来生成UI); 

2. 渲染器
将虚拟DOM渲染成真实DOM.
-1 创建节点    
    [1.创建元素2.遍历属性(添加属性和事件)3.遍历children]
-2 更新节点阶段 
    [!!!这里后文。只更新必要的地方，不会重新再创建一遍]

3. 组件
组件就是一组DOM元素的封装。 //虚拟DOM来描述组件。
<!-- 虚拟DOM就是描述真实DOM元素/组件的一个js对象。 -->
组件看成一个函数，这个函数返回虚拟DOM就行。
组件也可以看成一个对象，对象有一个函数，返回虚拟DOM

渲染器处理组件：本质还是将虚拟DOM ->真实DOM。先将组件还原成虚拟DOM就和处理普通标签一样了。

4. 模板


# 问题
1.vue使用rollup.js打包？
2.下载下来源码：看下结构和使用









