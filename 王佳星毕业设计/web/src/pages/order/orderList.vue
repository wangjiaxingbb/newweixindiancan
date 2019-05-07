<template>
    <div class="order-list">
        <el-card>
            <el-form :model="form" ref="ruleForm" label-width="100px" inline>
                <el-form-item label="订单号" prop="order_num">
                    <el-input v-model="form.order_num"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="checkout_persion_name">
                    <el-input v-model="form.checkout_persion_name"></el-input>
                </el-form-item>
                <el-form-item label="桌号" prop="desk_number">
                    <el-input v-model="form.desk_number"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-select v-model="form.status" placeholder="请选择状态">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="已下单" value="1"></el-option>
                        <el-option label="已支付" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getList(1)">查询</el-button>
                    <el-button @click="()=>{$refs['ruleForm'].resetFields();getList(1)}">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class='mt10'>
            <el-table :data="tableData" stripe border class="mt10" v-loading='tabLoading'>
                <el-table-column prop="order_num" label="订单号" min-width="150" align='center'></el-table-column>
                <el-table-column prop="checkout_persion_name" label="结账人" min-width="150" align='center'></el-table-column>
                <el-table-column prop="checkout_price" label="消费总价" min-width="150" align='center'></el-table-column>
                <el-table-column prop="date" label="日期" min-width="150" align='center'>
                    <template slot-scope="scope" v-if="scope.row.date">
                        {{new Date(scope.row.date) | formatDate}}
                    </template>
                </el-table-column>
                <el-table-column prop="desk_number" label="桌号" min-width="150" align='center'></el-table-column>
                <el-table-column prop="status" label="状态" min-width="150" align='center'>
                    <template slot-scope="scope">
                        <span v-if='scope.row.status == 1'>已下单</span>
                        <span v-else-if='scope.row.status == 2'>已支付</span>
                        <span v-else-if='scope.row.status == 3'>未支付</span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
                <el-table-column prop='foodName' label="食物名称" align='center' ></el-table-column>
            </el-table>
            <el-pagination class='page-blok' background @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="page.pageSize" :current-page="page.currentPage" layout="total, prev, pager, next, jumper" :total="page.totalPage">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
import { myMixinTable } from "@/mixins.js";
export default {
    data() {
        return {
            tableData: [],
            tabLoading: false,
            form: {
                order_num: "",
                checkout_persion_name: "",
                desk_number: "",
                status: ""
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
                .queryOrderByPage(data)
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
        }
    },
    components: {}
};
</script>
<style lang='less' scoped>
.order-list{
}
</style>