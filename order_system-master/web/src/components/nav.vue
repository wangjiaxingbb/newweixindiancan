<template>
    <div class='nav'>
        <div class="nav-wrap">
            <i class='el-icon-location'></i>
            <ul class='nav-name'>
                <li @click="goNav(v)" v-for="(v, k) in navArr" :key="k">{{v.meta.title || ''}} <span v-if="k !== navArr.length-1">/</span> </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            navArr: []
        };
    },
    watch: {
        $route(to, from) {
            this.watchRoute();
        }
    },
    created() {
        this.watchRoute();
    },
    mounted() {},
    computed: {}, //计算属性
    methods: {
        // 路由跳转
        goNav(route) {
            // this.$router.push({ name: route.name, param: route.param });
        },
        // 监听路由变化
        watchRoute() {
            if (this.$route.matched && this.$route.matched.length !== 0) {
                this.navArr = [];
                this.$route.matched.forEach(element => {
                    if (element.meta.renderNav !== false) {
                        this.navArr.push(element);
                    }
                });
            }
        }
    },
    components: {}
};
</script>
<style lang='less' scoped>
.nav {
    .nav-wrap {
        background-color: #fff;
        border-bottom: 1px solid #ccc;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        color: #97a8be;
        i {
            float: left;
            line-height: 30px;
        }
        .nav-name {
            float: left;
            font-size: 14px;
            margin-left: 10px;
            li {
                float: left;
                cursor: pointer;
                span {
                    font-size: 12px;
                    margin: 0 5px 0 0;
                }
            }
        }
    }
}
</style>