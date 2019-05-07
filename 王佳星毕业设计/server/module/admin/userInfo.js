const dbUtils = require('../../utils/db');

const userInfo = {
	/**
	 * @description 根据username查询用户
	 * @author wangjiaxing
	 * @param {string} [options={username: ''}]
	 * @returns  result
	 */
	async getUserInfoByName(options = { username: '' }) {
		let sql = `
            SELECT * FROM adminUser where username=${options.username} and status not in (2) limit 1
        `;
		let result = await dbUtils.query(sql);
		return result;
	},

	/**
	 * @description 根据id查询用户
	 * @author wangjiaxing
	 * @param {string} [options={id: ''}]
	 * @returns  result
	 */
	async getUserInfoById(options = { id: 0 }) {
		let sql = `
            SELECT * FROM adminUser where id=${options.id} limit 1
        `;
		let result = await dbUtils.query(sql);
		return result.length === 0 ? null : result[0];
	},

	/**
	 * @description 根据username password查询用户
	 * @author wangjiaxing
	 * @param {string} [options={username: '', password: ''}]
	 * @returns  result
	 */
	async getUserInfoByNamePwd(options = { username: '', password: '' }) {
		let sql = `
            SELECT * FROM adminUser where username='${options.username}' and password='${options.password}' limit 1
        `;
		let result = await dbUtils.query(sql);
		return result;
	},

	/**
	 * @description 用户注册
	 * @author wangjiaxing
	 * @param {string} [options={username: '', password: '',department:''}]
	 * @returns
	 */
	async registerUser(options = { username: '', password: '', name: '' }) {
        let create_time = new Date().getTime();
		let result = dbUtils.insertData('adminUser', { username: options.username, password: options.password, name: options.name, create_time: create_time });
		return result;
    },
    
    /**
	 * @description 修改管理员
	 * @author wangjiaxing
	 * @param {string}
	 * @returns
	 */
	async updateAdmin(id, options = { id: ''}) {
		let result = dbUtils.updateData('adminUser', options, id);
		return result;
    },
    
    /**
	 * @description 查询所有管理员
	 * @author wangjiaxing
	 * @param {string} [options={ page:1, pageSize: 10 }]
	 * @returns  result
	 */
	async queryAllAdminByPage(options = { page: 1, pageSize: 10, name: '%%', username: '%%' }) {
		let start = (options.page - 1) * options.pageSize;
		let sql = `
            SELECT * FROM adminUser where name like '${options.name}' and username like '${options.username}' and status in (${options.status}) limit ${start}, ${options.pageSize}
        `;
        let sql1 = `
            SELECT count(1) FROM adminUser
        `;
        let result = {};
        let totalNum = await dbUtils.query(sql1)
        result.totalNum = totalNum[0]['count(1)'] || 0;
		result.tableData = await dbUtils.query(sql);
		return result;
    }
};

module.exports = userInfo;
