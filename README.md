# kong-elcom

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).



### 利用 vue2 发布 npm 依赖包

#### 创建一个 v2 的项目 vue create mydemo

#### 新建要封装的组件

#### 测试该组件正常运行后,新建文件夹 定义 install 函数
-  我们在使用组件的时候，会用到 Vue.use() 函数，那么当我们执行这个函数的时候，就会执行我们这里定义的 install 函数。
-  在src下新建 kong-packages 文件夹，并且在 kong-packages  内新建 index.js，内容如下：

```js
// index.js 引入创建的组件
import QDdialog from "./../components/QDdialog.vue";

const install = (Vue) => {
	Vue.component(QDdialog.name, QDdialog);
	//注册组件(组件名,组件内容)
};

export default install;
```

#### 打包组件

-   修改 package.json 文件

```bash
    "scripts": {
        "serve": "vue-cli-service serve",
        "build": "vue-cli-service build",
        "kong": "vue-cli-service build --target lib ./src/kong-elcom/index.js --dest kong-elcom --name kong-elcom"
    },
```

-   这里我们新增了一个命令，"kong", 因为默认的 build 打包的是 src 下的所有文件，这里我们只需要打包我们自己的组件就可以了。

    --target lib 指定打包目录，也就是打包的入口文件

    --name 打包后的文件名称

    --dest 打包后的文件夹的名称

-   **执行打包命令 npm run kong**

-   打包成功之后，我们可以看到根目录下方，多了一个文件夹**kong-elcom**

#### 准备我们的 npm 文件夹(kong-package 这个名称会是下载安装时的名称 例:cnpm i kong-packages@1.0.0 --save )

-   新建一个新的文件夹，kong-package，并且将 kong-package 里的 css 文件和 kong-package.umd.min 文件复制到 kong-package 文件夹中

```bash

| kong-package                                                          |
| - style
| -- kong-package.css
|- kong-package.umd.min.js

```

- 在 kong-package 中初始化一个 npm， 在 kong-package 文件夹下，
- 执行 **npm init -y**，最终在 kong-package 文件夹下，会自动新增一个 package.json 文件。

```json
{
	"name": "kong-packages", //包名,在npm中搜索的名字
	"version": "1.0.0",
	"description": "测试的弹框组件",
	"main": "kong-elcom.umd.min.js",
	"files": ["*"],//包含在files中的文件才会被发布上传
	"private": false,//发布一定要加 
	"scripts": {
		"test": "echo \"Error: no test specified\" && exit 1"
	},
	"keywords": ["element弹框", "封装弹窗"],
	"author": "15216547879@163.com",
	"license": "ISC"
}
```

#### 将组件发布到 npm 上

**先切在全局cmd换源，再登录发布包，必须使用npm origin ，不能切换成别的镜像**
- 需要先安装npm 源管理器  `npm install -g nrm`
- 发布时使用  切换到npm  执行: `nrm use npm ` // 切换成功显示 Registry has been set to: https://registry.npmjs.org/
- 切换到淘宝镜像 `nrm use taobao`

创建自己的 npm 账号，这里大家百度一下就可以找到

在生成的 kong-package 文件夹下,终端执行如下命令

- npm login (输入账号密码,输入密码时看不见键入的字符)

输入邮箱

npm publish (回车)

#### 更新发布包时
1. 修改完代码后，我们需要修改 package.json 的version版本

    规则：对于"version":"x.y.z"
          1.修复bug,小改动，增加z
          2.增加了新特性，但仍能向后兼容，增加y
          3.有很大的改动，无法向后兼容,增加x

2. 修改后 运行 npm run build, npm publish 就成功更新了包的版本



#### 本地安装自己的组件

现在，我们就要在本地安装自己刚刚发布的 npm 包了。

执行命令 npm install kong-packages@1.0.0 --save

在 main.js 中使用

```js
import kongElcom from "kong-packages";
import "kong-packages/style/kong-elcom.css";
Vue.use(kongElcom);
```


#### 以上仅为单个组件,同时注册某文件夹下的多个组件
- 使用 require 提供的函数 context 加载某一个目录下的所有 .vue 后缀的文件。
- 然后 context 函数会返回一个导入函数 importFn
- 使用context 函数的属性 keys() 获取所有的文件路径
- 通过文件路径数组，通过遍历数组，再使用 importFn 根据路径导入组件对象值
- 遍历的同时进行全局注册即可

```js
// 导入component文件夹下的所有组件
// 批量导入需要使用一个函数 require.context(dir,deep,matching)
// 参数：1. 目录  2. 是否加载子目录  3. 加载的正则匹配
const importFn = require.context('./', false, /\.vue$/)
// console.dir(importFn.keys()) 文件名称数组
 
export default {
  install (app) {
    // 批量注册全局组件
    importFn.keys().forEach(key => {
      // 导入组件
      const component = importFn(key).default
      // 注册组件
      app.component(component.name, component)
    })

  }
}
 

```
