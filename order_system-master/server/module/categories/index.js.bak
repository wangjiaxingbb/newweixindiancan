const dbUtils = require('../../utils/db');

const categories = {
	/**
	 * @description 添加分类
	 * @author wangjiaxing
	 * @param {string} [options={name: '', img: '',price:''}]
	 * @returns
	 */
	async addCate(options = { name: ''}) {
		// status：0：禁用 1: 启用 2：删除
		let status = '1';
		let result = dbUtils.insertData('categories', { name: options.name, status: status });
		return result;
	},

	/**
	 * @description 查询所有分类
	 * @author wangjiaxing
	 * @param {string} [options={ page:1, pageSize: 10 }]
	 * @returns  result
	 */
	async queryAllCateByPage(options = { status:'0,1', page: 1, pageSize: 10 }) {
		let start = (options.page - 1) * options.pageSize;
		let sql = `
            SELECT * FROM categories where status in (${options.status}) limit ${start}, ${options.pageSize}
        `;
        let sql1 = `
            SELECT count(1) FROM categories
        `;
        let result = {};
        let totalNum = await dbUtils.query(sql1)
        result.totalNum = totalNum[0]['count(1)'] || 0;
		result.tableData = await dbUtils.query(sql);
		return result;
    },
    
    /**
	 * @description 修改分类
	 * @author wangjiaxing
	 * @param {string} [options={id: ''}]
	 * @returns
	 */
	async updateCate(id, options = { }) {
		let result = dbUtils.updateData('categories', options, id);
		return result;
    },
    /**
	 * @description 根据id查询分类
	 * @author wangjiaxing
	 * @param {string} [options={id: ''}]
	 * @returns  result
	 */
	async getCateInfoById(options = { id: 0 }) {
		let sql = `
            SELECT * FROM categories where id=${options.id} limit 1
        `;
		let result = await dbUtils.query(sql);
		return result.length === 0 ? null : result[0];
    },
};

module.exports = categories;
