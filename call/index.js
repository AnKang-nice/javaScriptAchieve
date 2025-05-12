// call的应用
/***
 * 改变函数的this指向
 */
function addOne(...args) {
    console.log(args);
    console.log(this);
    return args.reduce((a, b) => a + b, 0);
}

let obj = {
    name: 'zhangsan',
}
addOne(1, 2, 3)
let a = addOne.call(obj, 1, 2, 3); // 1, 2, 3
console.log(a)

// call的实现
Function.prototype.myCall = function (context, ...args) {
    if (typeof this !== 'function') {
        return new Error('this is not a function');
    }
    // 1. 处理this指向
    context = context || window; // 如果没有传入context, 默认指向window
    // 2. 处理函数的this指向
    context.fn = this; // 将函数挂载到context上
    // 3. 执行函数
    const result = context.fn(...args); // 执行函数
    // 4. 删除函数
    delete context.fn; // 删除挂载的函数
    // 5. 返回结果
    return result; // 返回结果
}

addOne.myCall(obj, 1, 2, 3); // 1, 2, 3