// index.js
import TianMap from '../components/TianMap/index.vue'
 
 
const components = [
    TianMap
]
// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = Vue => {
    // 判断是否可以安装
    if (install.installed) return
        // 遍历注册全局组件
    components.map(component => Vue.component(component.name, component))
}
 
export default install


// 导入component文件夹下的所有组件
// 批量导入需要使用一个函数 require.context(dir,deep,matching)
// 参数：1. 目录  2. 是否加载子目录  3. 加载的正则匹配
// const importFn = require.context('./', false, /\.vue$/)
// // console.dir(importFn.keys()) 文件名称数组
 
// export default {
//   install (app) {
 
//     // 批量注册全局组件
//     importFn.keys().forEach(key => {
//       // 导入组件
//       const component = importFn(key).default
//       // 注册组件
//       app.component(component.name, component)
//     })
//   }
// }