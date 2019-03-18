<template>
    <div class="login-container">
        <el-form :model="form" ref="ruleForm" class="form">
            <el-form-item label=" " prop="">
                <h2>后台管理系统</h2>
            </el-form-item>
            <el-form-item label=" " prop="username">
                <el-input v-model="form.username" placeholder="请输入用户名" size="mini" class="w200">
                    <ico ico='icon-xingmingyonghumingnicheng' slot="prefix" />
                </el-input>
            </el-form-item>
            <el-form-item label=" " prop="password">
                <el-input type='password' v-model="form.password" placeholder="请输入密码" size="mini" class="w200">
                    <ico ico='icon-mima' slot="prefix" />
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :loading="loading" size="mini" @click="submitForm('form')">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            form: {
                username: "18847127075",
                password: "123456"
            },
            loading: false
        };
    },
    created() {},
    destroyed() {},
    methods: {
        submitForm() {
            if(!this.form.username || !this.form.password){
                return this.$message.warning('请输入用户名密码！')
            }
            this.loading = true;
            this.$http
                .login(this.form)
                .then(res => {
                    this.loading = false;
                    sessionStorage.setItem('userInfo', JSON.stringify(res.data || {}));
                    this.$router.push({name: 'foodList'})
                })
                .catch(err => {
                    this.loading = false;
                });
        }
    },
    components: {}
};
</script>

<style lang="less" scoped>
.login-container {
    width: 100%;
    height: 100vh;
    background: url("/static/images/bg.jpg") no-repeat;
    background-size: cover;
    position: relative;
    .form {
        position: absolute;
        width: 400px;
        height: 300px;
        background-color: rgba(255, 255, 255, 1);
        top: 50%;
        left: 50%;
        margin: -250px 0 0 -200px;
        border-radius: 5px;
        text-align: center;
        padding: 20px 0 0 0;
        box-sizing: border-box;
        .w200 {
            width: 200px;
        }
    }
}
</style>