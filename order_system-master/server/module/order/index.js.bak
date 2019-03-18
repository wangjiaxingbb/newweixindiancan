const dbUtils = require('../../utils/db');
const food = require('../foods/index');
const order = {
	/**
	 * @description 查询所有订单
	 * @author wangjiaxing
	 * @param {string} [options={ page:1, pageSize: 10 }]
	 * @returns  result
	 */
	async queryAllOrderByPage(options = { order_num: '%%', status: '1,2,3', date: '%%', checkout_persion_name: '%%', desk_number: '%%', page: 1, pageSize: 10 }) {
		let start = (options.page - 1) * options.pageSize;
		let sql = `
            SELECT * FROM orders where order_num like '${options.order_num}' and status in (${options.status}) and checkout_persion_name like '${options.checkout_persion_name}' and desk_number like '${options.desk_number}' limit ${start}, ${options.pageSize}
        `;
		let sql1 = `
            SELECT count(1) FROM orders where order_num like '${options.order_num}' and status in (${options.status}) and checkout_persion_name like '${options.checkout_persion_name}' and desk_number like '${options.desk_number}'
		`;
		let result = {};
		let totalNum = await dbUtils.query(sql1);
		result.totalNum = totalNum[0]['count(1)'] || 0;
		result.tableData = await dbUtils.query(sql);
		result.tableData = await order.queryOrderFoodName(result.tableData)
		return result;
	},
	/**
	 * @description 查询订单食物名
	 * @author wangjiaxing
	 * @param {string} [options={ page:1, pageSize: 10 }]
	 * @returns  result
	 */
	async queryOrderFoodName(orderList){
		if(orderList.length !== 0){
			for(let i = 0; i<orderList.length;i++){
				let v = orderList[i];
				v.foodName = '';
				let foodNames = await dbUtils.query(`SELECT food_name FROM order_foods where order_num='${v.order_num}'`);
				v.foodName = foodNames.map(v=>v.food_name).join(',');
			}
		}
		return orderList;
	},
    /**
	 * @description 创建订单
	 * @author wangjiaxing
	 * @param {string} [options={}]
	 * @returns
	 */
	async addOrder(options = {}) {
		// status：1：已下单 2：已支付
        let status = '1';
        let order_num = `N${new Date().getTime()}${options.desk_number}`;
		let result = await dbUtils.insertData('orders', { 
            order_num: order_num, 
            date: new Date(), 
            checkout_persion_id: options.checkout_persion_id,
            checkout_persion_name: options.checkout_persion_name,
            desk_id: options.desk_id,
            desk_number: options.desk_number,
			checkout_price: options.checkout_price,
			food_info: options.food_info,
            status: status
        });
		return result;
	},
	/**
	 * @description 插入订单食物
	 * @author wangjiaxing
	 * @param {string} [options={}]
	 * @returns
	 */
	async addOrderFood(options = {}) {
		let result = await dbUtils.insertData('order_foods', { 
            order_num: options.order_num, 
			order_id: options.order_id, 
			food_id: options.food_id, 
			food_name: options.food_name,
			food_num: options.food_num
        });
		return result;
	},
    /**
	 * @description 根据id查询订单
	 * @author wangjiaxing
	 * @param {string} [options={id: ''}]
	 * @returns  result
	 */
	async getOrderInfoById(options = { id: 0 }) {
		let sql = `
            SELECT * FROM orders where id=${options.id} limit 1
        `;
		let result = await dbUtils.query(sql);
		return result.length === 0 ? null : result[0];
    },
    /**
	 * @description 修改订单
	 * @author wangjiaxing
	 * @param {string} [options={id: ''}]
	 * @returns
	 */
	async updateOrder(id, options = { }) {
		let result = dbUtils.updateData('orders', options, id);
		return result;
	}
};
module.exports = order;
