
## 组件封装在弹窗内,用于新增/编辑页面

# main.js 

import TianMap from 'kong-tian'; // 包名
import 'kong-tian/tianmap.css';
Vue.use(TianMap);

## 1首选,在列表页引入组件
```bash
# 获取天地图页面使用
<template>
# 经纬度
<tian-Lnglat ref="tianLnglat"></tian-Lnglat>
#标记范围
<tian-Map ref="tianArea"></tian-Map>
</template>

<script>
# 引入组件
import tianMap from '@/components/Admin/TianDiTu'
import tianLnglat from '@/components/Admin/TianLngLat'
export default{
     components: {
        tianLnglat,
        tianMap,
    },
    data(){
        return {

        }
    },

}
</script>
```

## 2其次,在新增/编辑页面

```bash
<template>
        <el-form-item style="width:100%;" label="经纬度">
            <el-input v-model="villageForm.long_lat" class="item_input" disabled />
            <el-button type="primary" size="mini" style="margin-left:20px;" @click="openMap(villageForm.long_lat)">选取经纬度</el-button>
        </el-form-item>
        <el-form-item style="width:100%;" label="边界范围">
            <el-input v-model="villageForm.area_long_lat" class="item_input" v-show="!villageForm.area_long_lat" disabled />
            <el-button type="primary" size="mini" style="margin-left:20px;" v-show="villageForm.area_long_lat" @click="toMark(villageForm.area_long_lat)">已标记</el-button>
            <el-button type="primary" size="mini" style="margin-left:20px;" v-show="!villageForm.area_long_lat" @click="toMark(villageForm.area_long_lat)">请标记范围</el-button>
        </el-form-item>
</template>

<script>
export default{
    data(){
        return {
            villageForm:{
                long_lat:'',//经纬度
                area_long_lat:'',//范围
            }
           
        }
    },
      methods: {

            # 经纬度------------------
            # // 打开地图弹窗
             openMap(data) {
                this.$parent.$refs.tianLnglat.openMapLnglatDetail(data)
            },
            # // 标记完成后,接收经纬度
            getLongLat(obj) {
                this.villageForm.long_lat = obj
            },



            # 边界范围----------------
            # // 标记边界范围,
            toMark(data) {
                this.$parent.$refs.tianArea.openMapAreaDetail(data);
            },
            # // 标记完成后 接收边界范围
            getLongLatArea(obj) {
                this.villageForm.area_long_lat = obj
            },
      },

}
</script>
```
