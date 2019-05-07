<template>
    <div class='layout-header'>
        <div class="collapse" @click="changeCollapse">
            <i :class="styles"></i>
        </div>
        <div class='avatar'>
            <el-upload :action="upFile" :show-file-list='false' :on-success='uploadSuccess'> <img :src="avatar" alt=""> </el-upload>
        </div>
        <el-dropdown @command="handleCommand" class='user-name' trigger="click">
            <span class="el-dropdown-link">
                {{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command='logout'>退出到登录页</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
import { upload } from "@/api.js";
export default {
    data() {
        return {
            isCollapse: false,
            styles: ["el-icon-more", "def-class"],
            userName: "请登录",
            avatar: "@/assets/images/avatar.png",
            upFile: ""
        };
    },
    created() {
        this.getUserInfo();
        this.upFile = upload;
    },
    mounted() {},
    computed: {}, //计算属性
    methods: {
        // 侧边栏菜单收起展开功能
        changeCollapse() {
            this.isCollapse = !this.isCollapse;
            this.$bus.$emit("isCollapse", this.isCollapse);
            if (this.styles.includes("rotateY")) {
                this.styles = this.$tools.delArrItem(this.styles, "rotateY");
            } else {
                this.styles.push("rotateY");
            }
        },
        // 用户名字操作
        handleCommand(command) {
            switch (command) {
                case "logout":
                    sessionStorage.removeItem("userInfo");
                    this.$router.push({ name: "login" });
                    break;

                default:
                    break;
            }
        },
        // 获取用户信息
        getUserInfo() {
            this.$http
                .queryAdminById({ id: this.$tools.getAdminInfo().id })
                .then(res => {
                    this.userName = res.data.name;
                    this.avatar = res.data.avatar || '@/assets/images/avatar.png';
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 修改用户头像
        editAdmin(avatar) {
            let data = {
                id: this.$tools.getAdminInfo().id,
                avatar: avatar
            };
            this.$http
                .editAdmin(data)
                .then(res => {})
                .catch(err => {
                    console.log(err);
                });
        },
        // 上传成功
        async uploadSuccess(res) {
            let avatar = res.data || "";
            await this.editAdmin(avatar);
            await this.getUserInfo();
        }
    },
    components: {}
};
</script>
<style lang='less' scoped>
.layout-header {
    background-color: #fff;
    border-bottom: 1px solid #eaeaea;
    height: 60px;
    line-height: 60px;
    padding: 0 20px;
    position: relative;
    .collapse {
        cursor: pointer;
        width: 40px;
        font-size: 24px;
    }
    .def-class {
        transition: all 0.5s;
    }
    .rotateY {
        transform: rotate(90deg);
    }
    .user-name {
        cursor: pointer;
        position: absolute;
        top: 0;
        right: 50px;
    }
    .avatar {
        cursor: pointer;
        position: absolute;
        width: 45px;
        height: 45px;
        top: 7px;
        right: 110px;
        img {
            width: 45px;
            height: 45px;
            border: 1px solid #ccc;
            border-radius: 50%;
        }
    }
}
</style>