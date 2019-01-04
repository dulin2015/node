// console.log(require.context('./', true, /\.js/).keys());

const files = require.context('./', true, /\.js$/); //动态获取当前目录下的所有js文件

// console.log(files.keys); //["./index.js", "./user.js"] 返回一个数组

let configRouters = [];

files.keys().forEach(key => {
  // console.log(files(key))
  if (key === './index.js') return;
  configRouters = [...configRouters, ...files(key).default]; // 读取文件中default模块的内容
});

export default configRouters;

