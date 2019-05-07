<template>
    <div class="admin-list">
        <el-card>
            <el-form :model="form" ref="ruleForm" label-width="100px" inline>
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-select v-model="form.status" placeholder="请选择状态">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="启用" value="1"></el-option>
                        <el-option label="关闭" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getList(1)">查询</el-button>
                    <el-button @click="()=>{$refs['ruleForm'].resetFields();getList(1)}">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class='mt10'>
            <el-button type="primary" plain size="mini" @click="addOrEditAdmin">添加管理员</el-button>
            <el-table :data="tableData" stripe border class="mt10" v-loading='tabLoading'>
                <el-table-column prop="username" label="用户名" min-width="150" align='center'></el-table-column>
                <el-table-column label="密码" min-width="150" align='center'>
                    <template slot-scope="scope">
                        ****
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="姓名" min-width="150" align='center'></el-table-column>
                <el-table-column prop="status" label="状态" min-width="150" align='center'>
                    <template slot-scope="scope">
                        <el-switch @change="changeStatus(scope.row)" v-model="scope.row.statusSwitch" active-color="#13ce66" inactive-color="#ccc">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" min-width="150" align='center'>
                    <template slot-scope="scope">
                        {{scope.row.create_time | formatDate}}
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" align='center' width='250px'>
                    <template slot-scope="scope">
                        <el-button @click="showPwd(scope.row)" type="success" plain size="mini">查看密码</el-button>
                        <el-button type="primary" plain size="mini" @click="addOrEditAdmin(scope.row)">编辑</el-button>
                        <el-popover placement="top" width="160" v-model="scope.row.pop">
                            <p>确定删除吗？</p>
                            <div class="mt10 tac">
                                <el-button type="danger" size="mini" @click="deleteAdmin(scope.row)">确定</el-button>
                                <el-button size="mini" type="info" @click="scope.row.pop = false">取消</el-button>
                            </div>
                            <el-button slot="reference" type="danger" plain size="mini" @click="()=>{scope.row.pop = true;delId = scope.row.id}">删除</el-button>
                        </el-popover>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination class='page-blok' background @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="page.pageSize" :current-page="page.currentPage" layout="total, prev, pager, next, jumper" :total="page.totalPage">
            </el-pagination>
        </el-card>
        <!-- 添加/编辑管理员弹窗 -->
        <el-dialog :title="title" :visible.sync="dialog" width='500px' class='tac' :before-close='closeDialog'>
            <el-form :model="addForm" :rules='rule' ref="addForm" label-width="100px" inline>
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="addForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addForm.password"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item class='mt10'>
                    <el-button type="primary" :loading="btnLoading" @click="submitForm">确认</el-button>
                    <el-button @click="closeDialog">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { myMixinTable } from "@/mixins.js";
export default {
    data() {
        return {
            tableData: [],
            tabLoading: false,
            btnLoading: false,
            dialog: false,
            title: "添加管理员",
            id: "",
            url: "",
            delId: "",
            statusArr: {
                "0": "停用",
                "1": "启用",
                "2": "删除"
            },
            form: {
                name: "",
                username: "",
                status: ""
            },
            addForm: {
                name: "",
                username: "",
                password: ""
            },
            rule: {
                username: [
                    { required: true, message: "请输入用户名", trigger: "blur" }
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" }
                ],
                name: [
                    { required: true, message: "请输入姓名", trigger: "blur" }
                ]
            }
        };
    },
    mixins: [myMixinTable],
    created() {},
    mounted() {
        this.getList(this.page.currentPage);
    },
    computed: {}, //计算属性
    methods: {
        // 获取管理员列表
        getList(val = 1) {
            this.tabLoading = true;
            let data = {
                ...this.form,
                page: val,
                pageSize: this.page.pageSize
            };
            this.$http
                .adminList(data)
                .then(res => {
                    this.tabLoading = false;
                    let resData = res.data || {};
                    let tmp = [];
                    if (resData.tableData.length !== 0) {
                        resData.tableData.forEach(element => {
                            element.pop = false;
                            element.statusSwitch =
                                element.status == "1" ? true : false;
                            tmp.push(element);
                        });
                    }
                    this.tableData = tmp;
                    this.page.totalPage = resData.totalNum;
                })
                .catch(err => {
                    this.tabLoading = false;
                    console.log(err);
                });
        },
        // 查看密码
        showPwd(row) {
            let password = row.password || "";
            let username = row.username || "";
            this.$alert(password, `${username}密码`, {
                confirmButtonText: "确定"
            });
        },
        // 添加/编辑管理员
        addOrEditAdmin(scope) {
            this.id = scope.id;
            this.title = this.id ? "编辑管理员" : "添加管理员";
            if (this.id) {
                this.url = "editAdmin";
                this.addForm.id = this.id;
                this.addForm = { ...scope };
            } else {
                this.addForm.id = null;
                this.url = "addAdmin";
            }
            this.dialog = true;
        },
        // 提交表单
        submitForm() {
            let data = { ...this.addForm };
            this.btnLoading = true;
            this.$http[this.url](data)
                .then(res => {
                    this.btnLoading = false;
                    this.dialog = false;
                    this.getList(this.page.currentPage);
                })
                .catch(err => {
                    this.btnLoading = false;
                    console.log(err);
                });
        },
        // 关闭弹窗
        closeDialog() {
            this.$refs["addForm"].resetFields();
            this.dialog = false;
        },
        // 删除管理员
        deleteAdmin(row) {
            let data = {
                status: 2,
                id: this.delId
            };
            this.$http
                .editAdmin(data)
                .then(res => {
                    row.pop = false;
                    this.getList(this.page.currentPage);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 停用/启用管理员
        changeStatus(row) {
            let data = {
                id: row.id,
                status: row.statusSwitch == true ? "1" : "0"
            };
            this.$http
                .editAdmin(data)
                .then(res => {
                    this.getList(this.page.currentPage);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    components: {}
};
</script>
<style lang='less' scoped>
.admin-list {
}
</style>