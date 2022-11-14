// index.js
import TianMap from '../components/TianMap/index.vue'
 
 
const install = (Vue)=>{
    Vue.component(TianMap.name,TianMap)
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
 
//     // 定义指令
//     defineDirective(app)
//   }
// }