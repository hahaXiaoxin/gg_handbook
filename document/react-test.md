# 基于react测试的一些例子

## 1. 一个组件，通过函数式调用以及通过标签式调用的区别是什么

测试地址：[react-test](../packages/react-test/src/index.tsx)

对于react来说，组件的渲染过程本质是一个函数的执行。

也就是说，当组件自身属于不使用任何react hook的纯组件函数的时候，两者的方式并没有什么不同

但是当其中有hook的时候，会有以下区别：

1. 函数式调用的情况下不能进行条件性渲染，包括在使用循环生成时，从初次render到卸载前的每一次render都必须保证执行的react hook的数量是一致的
2. 函数式组件由于渲染时机和上下文不同，在Contenxt.Provider层的组件使用函数式调用的方式的时候，新生成的组件会拿不到useContext的值