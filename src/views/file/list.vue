<template lang="pug">
    el-container
        el-header(style={})
            el-button(type="primary") 上传
            el-button(@click="dialogFormVisible=true") 新建文件夹
            el-dialog(title="新建文件夹", :visible.sync="dialogFormVisible" width="30%")
                el-form(:model="mkdirForm")
                    el-form-item(label='名称：' label-width='60px')
                        el-input(v-model="mkdirForm.name" autocomplete="off")
                div(slot="footer" class="dialog-footer")
                    el-button(@click="dialogFormVisible = false") 取 消
                    el-button(type="primary" @click="mkdir") 确 定
        el-main
            el-table(:data="tableData", stripe style="width: 100%")
                el-table-column(v-for="item in columnList"
                    :key="item.prop", :prop="item.prop", :label="item.label"
                )
                el-table-column(fixed="right" label="操作" width="100")
                    template(slot-scope="scope")
                        el-button(@click="deleteFile(scope.row)" type="text" size="small") 删除

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
            dialogFormVisible: false,
            mkdirForm: {name: ''}
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
        },
        mkdir() {
            let _this = this;
            _this.postRequest(`/fileInfo/mkdir`, {
                path: _this.path + _this.mkdirForm.name
            }).then(() => {
                _this.$message.success("创建成功");
                _this.getData();
                _this.mkdirForm = [];
                _this.dialogFormVisible = false;
            })
        },
        deleteFile(val) {
            let _this = this;
            _this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                _this.postRequest(`/fileInfo/delete`, {
                    path: val.path
                }).then(() => {
                    _this.$message.success("删除成功");
                    _this.getData();
                    _this.mkdirForm = [];
                    _this.dialogFormVisible = false;
                })
            }).catch(() => {
                _this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
    }
}
</script>

<style scoped>

</style>
