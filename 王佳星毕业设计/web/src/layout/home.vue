<!-- 布局容器 -->
<template>
    <div>
        <el-container style="height: 100vh" class='overflow-y-auto'>
            <div class='hide-scroll' style="background-color: #545c64;">
                <v-slider />
            </div>
            <el-container>
                <el-header>
                    <v-header />
                </el-header>
                <el-container style="background-color: #e8edf0">
                    <el-main>
                        <v-nav />
                        <el-main class='main-wrap'>
                            <router-view />
                        </el-main>
                    </el-main>
                    <el-footer>
                        <v-footer />
                    </el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import vSlider from "./slider";
import vHeader from "./header";
import vFooter from "./footer";
import vNav from "@/components/nav";
export default {
    data() {
        return {};
    },
    created() {},
    mounted() {},
    computed: {}, //计算属性
    methods: {},
    components: { vSlider, vHeader, vNav, vFooter }
};
</script>
<style lang='less' scoped>
/deep/.el-header,
.el-main,
.el-footer {
    padding: 0;
}
.main-wrap {
    padding: 15px;
    box-sizing: border-box;
}
</style>