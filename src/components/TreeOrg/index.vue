<template>
    <div class='tree-main' :style="{ width: width + 'px' }">
        <treeselect :multiple="false" :searchable="false" :always-open="false" retryText="重新加载?" retryTitle="重试"
            :options="options" :auto-load-root-options="false" :normalizer="normalizer" @input="inputChange"
            @select="changeSelect" :load-options="loadOptions" placeholder="请选择" v-model="value">
            <div slot="value-label" slot-scope="{ node }">
                <span v-if="name">{{ name }}</span>
                <input class="node-ipt" type="text" v-else :value="node.label">
            </div>
        </treeselect>
    </div>
</template>
  
<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import TreeApi from '@/api/TreeApi/index.js'
import { LOAD_CHILDREN_OPTIONS } from '@riophae/vue-treeselect'

export default {
    name: 'TreeOrg',
    components: {
        Treeselect,
    },
    props: {
        width: {
            type: Number,
            default: 200,
        },
        nodeval: {
            type: Number,
            default: null,
        },
    },
    data: () => ({
        isShow: false,
        value: null,
        name: '',
        options: null,
        // 自定义键值
        normalizer(node) {
            // 去掉children=[]的children属性
            if (node.is_children != 1) {
                delete node.children
            }
            return node
        },
    }),
    created() {
        this.getOrgTreeList()
    },
    methods: {
        //   接受回显值,在打开详情时触发
        openInfo(id, name) {
            this.value = id;
            this.name = name;
        },
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
        inputChange(n, i) {
            if (n == undefined) {
                this.$emit('changeSelect', null)
            }
        },
        changeSelect(n, i) {
            this.$emit('changeSelect', n)
        },
        // 加载子节点数据
        loadOptions({ action, parentNode, callback }) {
            if (action === LOAD_CHILDREN_OPTIONS) {
                // 展开时加载点击节点的 子节点
                TreeApi
                    .getOrganizeList({
                        id: parentNode.id,
                    })
                    .then((res) => {
                        parentNode.children = res.data.list
                        parentNode.children.forEach((item) => {
                            if (item.is_children == 1) {
                                item.children = null
                            }
                        })
                        callback()
                    })
            }
        },
    },
}
</script>
  
<style lang="scss" scoped>
.tree-main {
    font-size: 12px;

    .node-ipt {
        border: none;
        outline: none;
    }
}

.tree-main ::v-deep label {
    font-weight: 400 !important;
}

.tree-main ::v-deep .vue-treeselect__control {
    height: 40px !important;
}

.tree-main ::v-deep .vue-treeselect__placeholder,
.tree-main ::v-deep .vue-treeselect__single-value {
    line-height: 40px;
}

.tree-main ::v-deep .vue-treeselect__menu {
    overflow: auto !important;
}

.tree-main ::v-deep .vue-treeselect__label {
    overflow: unset !important;
}
</style>
  