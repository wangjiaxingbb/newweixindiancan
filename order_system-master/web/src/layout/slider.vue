<template>
    <div>
        <el-menu class="el-menu-vertical-demo" :default-active="defaultRoute" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :router='true' @open="handleOpen" @close="handleClose" :collapse="isCollapse">
            <template v-for="item in routes">
                <template v-if="!item.hidden">
                    <template v-if="item.children && item.children.length>=1">
                        <el-submenu :index="item.name" :key="item.name">
                            <template slot="title">
                                <ico :ico='item.meta.ico' />
                                <span style="margin-left:6px" slot="title">{{ item.meta.title }}</span>
                            </template>
                            <el-menu-item v-for="subItem in item.children" :key="subItem.name" :index="subItem.name" v-if="subItem.meta">
                                {{ subItem.meta.title }}
                            </el-menu-item>
                        </el-submenu>
                    </template>
                    <template v-else>
                        <el-menu-item :index="item.name" :key="item.name" v-if="item.meta">
                            <ico :ico='item.meta.ico' />
                            <span style="margin-left:6px" slot="title">{{ item.meta.title }}</span>
                        </el-menu-item>
                    </template>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import router from "@/router/index.js";
export default {
    data() {
        return {
            isCollapse: false,
            defaultRoute: 'dashboard',
            routes: []
        };
    },
    created() {
        this.$bus.$on("isCollapse", isCollapse => {
            this.isCollapse = isCollapse;
        });
        // 解决路由和url地址不一致问题
        this.defaultRoute = this.$route.name;
        router.options.routes.forEach(element => {
            if(element.name === 'home'){
                this.routes = element.children;
            }
        });
    },
    mounted() {},
    computed: {}, //计算属性
    methods: {
        handleOpen(key, keyPath) {
            // console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            // console.log(key, keyPath);
        }
    },
    components: {}
};
</script>
<style lang='less' scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    /deep/.el-submenu__title {
        font-size: 15px;
    }
    /deep/.el-menu-item {
        font-size: 15px;
    }
}
</style>