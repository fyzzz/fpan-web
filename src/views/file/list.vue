<template lang="pug">
    el-container
        el-header(style={})
            el-button(type="primary") 上传
            el-button() 新建文件夹
        el-main
            el-table(:data="tableData", stripe style="width: 100%")
                el-table-column(v-for="item in columnList"
                    :key="item.prop", :prop="item.prop", :label="item.label"
                )

</template>

<script>

const columnList = [
    {label: '文件名', prop: 'name', width: 180},
    {label: '大小', prop: 'size', width: 180},
    {label: '修改日期', prop: 'updateTime', width: 180}
];

export default {
    name: "list",
    data() {
        return {
            path: '/',
            tableData: [],
            columnList: columnList,
        }
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            let _this = this;
            _this.getRequest(`/fileInfo/list?path=${_this.path}`).then(resp => {
                _this.tableData = resp;
            })
        }
    }
}
</script>

<style scoped>

</style>
