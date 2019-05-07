// 混合器

// 分页
const myMixinTable = {
    data() {
        return {
            page: {
                currentPage: 1,
                totalPage: 0,
                pageSize: 10
            }
        };
    },
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.page.currentPage = val;
            console.log(`当前页: ${this.page.currentPage}`);
            this.getList(val);
        }
    }
};
export { myMixinTable };