const dbUtils = require('../../utils/db');

const food = {
	/**
	 * @description 添加饭桌
	 * @author wangjiaxing
	 * @param {string} [options={number: 1, status:'1'}]
	 * @returns
	 */
	async addDesk(options = { number: 1 }) {
		// status：-1：删除 0: 停用 1：启用 2：正在使用
		let status = '1';
		let result = dbUtils.insertData('desks', { number: options.number,seat_num: options.seat_num, status: status });
		return result;
    },
    
    /**
	 * @description 根据桌号查询桌子
	 * @author wangjiaxing
	 * @param {string} [options={number: ''}]
	 * @returns  result
	 */
	async getDeskByNumber(options = { number: 0 }) {
		let sql = `
            SELECT * FROM desks where number='${options.number}' and status not in (-1) limit 1
        `;
		let result = await dbUtils.query(sql);
		return result;
    },
    
    /**
	 * @description 修改桌子状态
	 * @author wangjiaxing
	 * @param {string} [options={id: '', status: ''}]
	 * @returns
	 */
	async updateDesk(id, options = { }) {
		let result = dbUtils.updateData('desks', options, id);
		return result;
    },

    /**
	 * @description 查询所有桌子
	 * @author wangjiaxing
	 * @param {string} [options={ page:1, pageSize: 10 }]
	 * @returns  result
	 */
	async queryAllDeskByPage(options = { page: 1, pageSize: 10, number: '%%', status: '0,1,2' }) {
		let start = (options.page - 1) * options.pageSize;
		let sql = `
            SELECT * FROM desks where number like '${options.number}' and status in (${options.status}) limit ${start}, ${options.pageSize}
        `;
        let sql1 = `
            SELECT count(1) FROM desks
        `;
        let result = {};
        let totalNum = await dbUtils.query(sql1)
        result.totalNum = totalNum[0]['count(1)'] || 0;
		result.tableData = await dbUtils.query(sql);
		return result;
    }
};

module.exports = food;
