<template>
    <div class="desk-mange">
        <el-card>
            <el-form :model="form" ref="ruleForm" label-width="100px" inline>
                <el-form-item label="桌号" prop="number">
                    <el-input v-model="form.number"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-select v-model="form.status" placeholder="请选择状态">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="启用" value="1"></el-option>
                        <el-option label="正在使用" value="2"></el-option>
                        <el-option label="停用" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getList(1)">查询</el-button>
                    <el-button @click="()=>{$refs['ruleForm'].resetFields();getList(1)}">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class='mt10'>
            <el-button type="primary" plain size="mini" @click="addOrEditDesk">添加座位</el-button>
            <el-table :data="tableData" stripe border class="mt10" v-loading='tabLoading'>
                <el-table-column prop="number" label="桌号" min-width="150" align='center'>
                    <template slot-scope="scope">
                        <span v-if="scope.row.number != undefined && scope.row.number != null && scope.row.number != ''">
                            {{`${scope.row.number}号`}}
                        </span>
                        <span v-else>
                            -
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="可坐人数" min-width="150" align='center'>
                    <template slot-scope="scope">
                        <span v-if="scope.row.seat_num != undefined && scope.row.seat_num != null && scope.row.seat_num != ''">
                            {{`${scope.row.seat_num}人`}}
                        </span>
                        <span v-else>
                            -
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="current_num" label="当前人数" min-width="150" align='center'>
                    <template slot-scope="scope">
                        <span v-if="scope.row.current_num != undefined && scope.row.current_num != null && scope.row.current_num != ''">
                            {{`${scope.row.current_num}人`}}
                        </span>
                        <span v-else>
                            -
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="状态" min-width="150" align='center'>
                    <template slot-scope="scope">
                        <el-tag :type='scope.row.status == "0"?"danger":scope.row.status == "1"?"primary":"success"'>
                            {{statusArr[scope.row.status]}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="启用/停用" min-width="150" align='center'>
                    <template slot-scope="scope">
                        <el-switch @change="changeStatus(scope.row)" v-model="scope.row.statusSwitch" active-color="#13ce66" inactive-color="#ccc">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" align='center' width='250px'>
                    <template slot-scope="scope">
                        <el-button type="primary" plain size="mini" @click="addOrEditDesk(scope.row)">编辑</el-button>
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
        <!-- 添加/编辑座位弹窗 -->
        <el-dialog :title="title" :visible.sync="dialog" width='500px' :before-close='closeDialog'>
            <el-form :model="addForm" :rules='rule' ref="addForm" label-width="100px">
                <el-form-item label="桌号" prop="number">
                    <el-input-number v-model="addForm.number" :min="0" :step="1" :precision="0"></el-input-number>
                </el-form-item>
                <el-form-item label="可坐人数" prop="seat_num">
                    <el-input-number v-model="addForm.seat_num" :min="0" :step="1" :precision="0"></el-input-number>
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
import { upload } from "@/api.js";
export default {
    data() {
        return {
            tableData: [],
            tabLoading: false,
            btnLoading: false,
            dialog: false,
            title: "添加桌号",
            upFile: "",
            id: "",
            url: "",
            delId: "",
            statusArr: {
                "-1": "删除",
                "0": "停用",
                "1": "启用",
                "2": "正在使用"
            },
            form: {
                number: "",
                status: ""
            },
            addForm: {
                number: 0,
                seat_num: 0
            },
            rule: {
                number: [
                    { required: true, message: "请输入桌号", trigger: "blur" }
                ],
                seat_num: [
                    {
                        required: true,
                        message: "请输入可坐人数",
                        trigger: "blur"
                    }
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
        // 获取桌子列表
        getList(val = 1) {
            this.tabLoading = true;
            let data = {
                ...this.form,
                page: val,
                pageSize: this.page.pageSize
            };
            this.$http
                .deskList(data)
                .then(res => {
                    this.tabLoading = false;
                    let resData = res.data || {};
                    let tmp = [];
                    if (resData.tableData.length !== 0) {
                        resData.tableData.forEach(element => {
                            element.pop = false;
                            element.statusSwitch =
                                element.status == "1" || element.status == "2"
                                    ? true
                                    : false;
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
        // 添加/编辑菜品
        addOrEditDesk(scope) {
            this.id = scope.id;
            this.title = this.id ? "编辑桌号" : "添加桌号";
            if (this.id) {
                this.url = "updateDesk";
                this.addForm.id = this.id;
                this.addForm = { ...scope };
            } else {
                this.addForm.id = null;
                this.url = "addDesk";
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
        // 删除桌子
        deleteAdmin(row) {
            let data = {
                status: -1,
                id: this.delId
            };
            this.$http
                .updateDesk(data)
                .then(res => {
                    row.pop = false;
                    this.getList(this.page.currentPage);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 停用/启用菜品
        changeStatus(row) {
            let data = {
                id: row.id,
                status: row.statusSwitch == true ? "1" : "0"
            };
            this.$http
                .updateDesk(data)
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
.desk-mange {
    .food-name {
        width: 280px;
        overflow: hidden;
        img {
            width: 50px;
            height: 50px;
            border: 1px solid #ccc;
            border-radius: 4px;
            vertical-align: middle;
            margin-right: 10px;
        }
    }
    .avatar {
        .def-img {
            width: 98px;
            height: 98px;
            text-align: center;
            line-height: 98px;
            border-radius: 4px;
            font-size: 22px;
            border: 1px dashed #ccc;
        }
        img {
            width: 100px;
            height: 100px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
    }
}
</style>