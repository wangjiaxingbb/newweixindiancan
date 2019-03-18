<template>
    <div class="food-list">
        <el-card>
            <el-form :model="form" ref="ruleForm" label-width="100px" inline>
                <el-form-item label="菜名" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="分类" prop="categories">
                    <el-select v-model="form.categories" placeholder="请选择状态">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="(v, k) in cateArr" :key="k" :label="v.name" :value="v.id"></el-option>
                    </el-select>
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
            <el-button type="primary" plain size="mini" @click="addOrEditFood">添加菜品</el-button>
            <el-table :data="tableData" stripe border class="mt10" v-loading='tabLoading' @sort-change='sortChange'>
                <el-table-column prop="name" label="菜名" width="300">
                    <template slot-scope="scope">
                        <div class='food-name'>
                            <img v-if='scope.row.img != ""' :src="scope.row.img" alt="">
                            <img v-else src="@/assets/images/defaultImg.png" alt="">
                            {{scope.row.name}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="price" label="价格" min-width="70" align='center'>
                    <template slot-scope="scope">
                        {{scope.row.price | handleMoney}}
                    </template>
                </el-table-column>
                <el-table-column prop='sale_num' label="销量" min-width="70" align='center' sortable></el-table-column>
                <el-table-column label="分类" min-width="100" align='center'>
                    <template slot-scope="scope">
                        {{cateNameObj[scope.row.categories]}}
                    </template>
                </el-table-column>
                <el-table-column label="口味" min-width="150" align='center'>
                    <template slot-scope="scope">
                        <el-tag style="margin-right: 5px" v-for="(v, k) in scope.row.tasteArr" :key="k">{{v}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="评分" min-width="100" align='center'>
                    <template slot-scope="scope">
                        <el-rate v-model="scope.row.score" disabled show-score text-color="#ff9900" allow-half score-template="{value}分">
                        </el-rate>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="状态" min-width="50" align='center'>
                    <template slot-scope="scope">
                        <el-switch @change="changeStatus(scope.row)" v-model="scope.row.statusSwitch" active-color="#13ce66" inactive-color="#ccc">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" align='center' width='250px'>
                    <template slot-scope="scope">
                        <el-button type="primary" plain size="mini" @click="addOrEditFood(scope.row)">编辑</el-button>
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
        <!-- 添加/编辑菜品弹窗 -->
        <el-dialog :title="title" :visible.sync="dialog" width='500px' :before-close='closeDialog'>
            <el-form :model="addForm" :rules='rule' ref="addForm" label-width="100px">
                <el-form-item label="菜名" prop="name">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="分类" prop="categories">
                    <el-select v-model="addForm.categories" placeholder="请选择状态">
                        <el-option v-for="(v, k) in cateArr" :key="k" :label="v.name" :value="v.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="图片" prop="img">
                    <div class='avatar'>
                        <el-upload :action="upFile" :show-file-list='false' :on-success='uploadSuccess'>
                            <div v-if="!addForm.img" class="def-img">+</div>
                            <img v-else :src="addForm.img" alt="">
                        </el-upload>
                    </div>
                </el-form-item>
                <el-form-item label="价格" prop="price">
                    <el-input v-model="addForm.price"></el-input>
                </el-form-item>
                <el-form-item label="口味">
                    <el-tag style="margin-right: 5px" v-for="(v, k) in taste" :key="k" closable :disable-transitions="false" @close="handleClose(v)">
                        {{v}}
                    </el-tag>
                    <el-input style="width: 100px" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
                    </el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新口味</el-button>
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
            title: "添加菜品",
            upFile: "",
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
                status: "",
                categories: "",
                order: "DESC"
            },
            addForm: {
                name: "",
                price: "",
                img: ""
            },
            taste: ["正常"],
            inputVisible: false,
            inputValue: "",
            rule: {
                name: [
                    { required: true, message: "请输入菜名", trigger: "blur" }
                ],
                categories: [
                    { required: true, message: "请选择分类", trigger: "blur" }
                ],
                price: [
                    { required: true, message: "请输入价格", trigger: "blur" }
                ]
            },
            cateArr: [],
            cateNameObj: {}
        };
    },
    mixins: [myMixinTable],
    created() {
        this.upFile = upload;
    },
    mounted() {
        this.getCateArr();
        this.getList(this.page.currentPage);
    },
    computed: {}, //计算属性
    methods: {
        // 获取分类列表
        getCateArr() {
            let data = {
                page: 1,
                pageSize: 100000
            };
            this.$http
                .queryAllCateByPage(data)
                .then(res => {
                    let resData = res.data || {};
                    this.cateArr = resData.tableData || [];
                    if (this.cateArr.length !== 0) {
                        this.cateArr.forEach(v => {
                            this.cateNameObj[v.id] = v.name;
                        });
                    }
                })
                .catch(err => {});
        },
        // 获取菜品列表
        getList(val = 1) {
            this.tabLoading = true;
            let data = {
                ...this.form,
                page: val,
                pageSize: this.page.pageSize
            };
            this.$http
                .foodList(data)
                .then(res => {
                    this.tabLoading = false;
                    let resData = res.data || {};
                    let tmp = [];
                    if (resData.tableData.length !== 0) {
                        resData.tableData.forEach(element => {
                            element.pop = false;
                            element.statusSwitch =
                                element.status == "1" ? true : false;
                            element.tasteArr = element.taste.split(",");
                            element.score = Number(element.score);
                            element.categories = Number(element.categories);
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
        // 销量排序
        sortChange(row) {
            if (row.order === "ascending") {
                this.form.order = "ASC";
            } else {
                this.form.order = "DESC";
            }
            this.getList(this.page.currentPage);
        },
        // 上传成功
        uploadSuccess(res) {
            this.addForm.img = res.data || "";
        },
        // 添加/编辑菜品
        addOrEditFood(scope) {
            this.id = scope.id;
            this.title = this.id ? "编辑菜品" : "添加菜品";
            if (this.id) {
                this.url = "updateFood";
                this.addForm.id = this.id;
                let tasteArr = scope.taste.split(",");
                this.taste = tasteArr;
                this.addForm = { ...scope };
            } else {
                this.addForm.id = null;
                this.url = "addFood";
            }
            this.dialog = true;
        },
        // 提交表单
        submitForm() {
            this.$refs["addForm"].validate(valid => {
                if (valid) {
                    let taste = this.taste.join(",");
                    let data = { ...this.addForm, taste };
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
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        // 关闭弹窗
        closeDialog() {
            this.$refs["addForm"].resetFields();
            this.dialog = false;
            this.taste = ["正常"];
        },
        // 删除菜品
        deleteAdmin(row) {
            let data = {
                status: 2,
                id: this.delId
            };
            this.$http
                .updateFood(data)
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
                .updateFood(data)
                .then(res => {
                    this.getList(this.page.currentPage);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 删除口味标签
        handleClose(tag) {
            if (tag === "正常") {
                return this.$message.warning("默认口味不能删除！");
            }
            this.taste.splice(this.taste.indexOf(tag), 1);
        },
        // 添加口味标签
        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        // 确认添加口味标签
        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
                this.taste.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = "";
        }
    },
    components: {}
};
</script>
<style lang='less' scoped>
.food-list {
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