const dbUtils = require('../../utils/db');

const food = {
	/**
	 * @description 添加菜品
	 * @author wangjiaxing
	 * @param {string} [options={ name: '', img: '', price: '', categories: '', taste:'', score: '' }]
	 * @returns
	 */
	async addFood(options = { name: '', img: '', price: '', categories: '', taste: '', score: '' }) {
		// status：0：禁用 1: 启用 2：删除
		let status = '1';
		let score = '0';
		let result = dbUtils.insertData('foods', { name: options.name, img: options.img, price: options.price, status: status, categories: options.categories, taste: options.taste, score: score });
		return result;
	},

	/**
	 * @description 根据id查询菜品
	 * @author wangjiaxing
	 * @param {string} [options={id: ''}]
	 * @returns  result
	 */
	async getFoodInfoById(options = { id: 0 }) {
		let sql = `
            SELECT * FROM foods where id=${options.id} limit 1
        `;
		let result = await dbUtils.query(sql);
		return result.length === 0 ? null : result[0];
	},

	/**
	 * @description 根据菜品名称查询菜品
	 * @author wangjiaxing
	 * @param {string} [options={name: ''}]
	 * @returns  result
	 */
	async getFoodInfoByName(options = { name: '' }) {
		let sql = `
            SELECT * FROM foods where name='${options.name}' and status not in (2) limit 1
        `;
		let result = await dbUtils.query(sql);
		return result;
	},

	/**
	 * @description 查询所有菜品
	 * @author wangjiaxing
	 * @param {string} [options={ page:1, pageSize: 10 }]
	 * @returns  result
	 */
	async queryAllFoodByPage(options = { categories: '', name: '%%', status: '0,1', page: 1, pageSize: 10, order: 'ASC' }) {
		let start = (options.page - 1) * options.pageSize;
		let sql = '';
		if (!options.categories) {
			sql = `SELECT * FROM foods where categories in (select id from categories where status=1) and name like '${options.name}' and status in (${options.status}) ORDER BY sale_num ${options.order} limit ${start}, ${options.pageSize}`;
		} else {
			sql = `
            SELECT * FROM foods where categories in (select id from categories where id=${options.categories} and status=1) and name like '${options.name}' and status in (${options.status}) ORDER BY sale_num ${options.order} limit ${start}, ${options.pageSize}
        `;
		}
<<<<<<< HEAD
		let sql1 = '';
		if (!options.categories) {
			sql1 = `SELECT count(1) FROM foods where status in (${options.status})`;
		} else {
			sql1 = `SELECT count(1) FROM foods where status in (${options.status}) and categories=${options.categories}`;
		}
=======
		let sql1 = `
            SELECT count(1) FROM foods
        `;
>>>>>>> parent of e97173e... 更新代码
		let result = {};
		let totalNum = await dbUtils.query(sql1);
		result.tableData = await dbUtils.query(sql);
		result.totalNum = totalNum[0]['count(1)'] || 0;
		return result;
	},

	/**
	 * @description 修改菜品
	 * @author wangjiaxing
	 * @param {string} [options={id: ''}]
	 * @returns
	 */
	async updateFood(id, options = {}) {
		let result = dbUtils.updateData('foods', options, id);
		return result;
	}
};

module.exports = food;
