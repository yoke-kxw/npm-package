## 注意:组件中每一级的children 如果有子级必须设置为null,没有就删掉该属性;
```bash
# 页面引用
<template>
    <tree-org ref="treeselect"  @changeSelect="changeSelect" :width="300" ></tree-org>
</template>

# 回调方法   changeSelect()
methods:{
    # // 区域回调
        changeSelect(data) {
            if (data) {
                this.villageForm.area_code = data.id;
                this.villageForm.area_name = data.label;
                this.$refs.treeselect.openInfo( this.villageForm.area_code,this.villageForm.area_name);
            } else {
                this.villageForm.area_code = ''
            }
        },
}

#main.js 

import TreeOrg from 'tree-org';
import 'tree-org/style/tree-org.css';
Vue.use(TreeOrg);

#接口需要按照组件定义
```js
import TreeApi from '@/api/TreeApi/index.js'
// 顶级所属区域
    getOrgTreeList() {
        TreeApi.getOrgTreeList({
                id: 0,
            })
            .then((res) => {
                this.options = res.data.list
                this.options[0].children = null
            })
    },

//接口返回值数据结构
[{
    id:'371100',
    name:'日照市',
    children:[{
        id:'371101',
        name:'东港区',
        children:[],
        is_children:1,
    }],
    is_children:1,//有子节点 ,不等于1时 会去掉children=[]的children属性
}]
```

# 回显,编辑时: 在获取详情成功回调中触发, 参数为 所属区域的 id和所属区域的name
this.$refs.treeselect.openInfo( this.villageForm.community_id,this.villageForm.area_name);

# 重置,新增时: 直接打开后 触发, 参数为 null,null
this.$refs.treeselect.openInfo( null,null);

```
