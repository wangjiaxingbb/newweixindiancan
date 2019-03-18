const order = require('../../module/order/index');
const food = require('../../module/foods/index');
const errMsg = require('./../../code/index');
let { returnMsg } = require('../../utils/judgeCode');
module.exports = {
	/**
	 * @description 查询所有订单
	 * @author wangjiaxing
	 * @param {any} ctx
	 */
	async queryAllOrderByPage(ctx) {
		let formData = ctx.request.body;
		formData.page = formData.page ? formData.page : 1;
		formData.pageSize = formData.pageSize ? formData.pageSize : 10;
		formData.order_num = formData.order_num ? formData.order_num : '%%';
		formData.checkout_persion_name = formData.checkout_persion_name ? `%${formData.checkout_persion_name}%` : '%%';
		formData.desk_number = formData.desk_number ? `%${formData.desk_number}%` : '%%';
		if (formData.status === undefined || formData.status === null || formData.status === "") {
			formData.status = '1,2,3';
		} else {
			formData.status = formData.status;
		}
		let result = await order.queryAllOrderByPage(formData);
		if (result) {
			ctx.body = returnMsg(200, result);
			return;
		}
		ctx.body = returnMsg(204, null, errMsg.OPERATE_FAILED);
	},
    /**
	 * @description 创建订单
	 * @author wangjiaxing
	 * @param {any} ctx
	 */
	async addOrder(ctx) {
		let formData = ctx.request.body;
		// 判断订单是否已经存在
		if (formData.id) {
			let id = Number(formData.id);
			let isId = typeof id === 'number' && id != NaN && id != 0;
			if (!isId) {
				ctx.body = returnMsg(204, null, '参数错误');
				return;
			}
			let keys = Object.keys(formData);
			let data = {};
			let attrs = ['checkout_persion_id', 'checkout_persion_name', 'checkout_price', 'desk_id', 'desk_number', 'food_ids'];
			keys.forEach(v => {
				if (formData[v] && formData[v] !== '' && attrs.includes(v)) {
					data[v] = formData[v];
				}
			});
			let result = await order.updateOrder(id, data);
			if (result.affectedRows != 0) {
				let insetOrderFood = JSON.parse(formData.food_info).map(v=>{
					return {
						order_num: formData.order_num, 
						order_id: formData.id, 
						food_id: v.food_id, 
						food_name: v.food_name,
						food_num: v.food_num
					}
				})
				for(let i = 0; i<insetOrderFood.length;i++){
					await order.addOrderFood(insetOrderFood[i]);
				}
				ctx.body = returnMsg(200, null, '更新成功');
				return;
			}
			ctx.body = returnMsg(204, null, errMsg.OPERATE_FAILED);
		}
		if (formData.desk_id === undefined || formData.desk_number === undefined) {
			ctx.body = returnMsg(201, null, errMsg.LOASE_PARAM);
			return;
		}
		if (formData.desk_id === '' || formData.desk_number === '') {
			ctx.body = returnMsg(202, null, errMsg.PARAM_NULL);
			return;
		}
		let result = await order.addOrder(formData);
		let orderId = result.insertId;
		if (orderId) {
			let orderInfo = await order.getOrderInfoById({ id: orderId });
			let insetOrderFood = JSON.parse(formData.food_info).map(v=>{
				return {
					order_num: orderInfo.order_num, 
					order_id: orderInfo.id, 
					food_id: v.food_id, 
					food_name: v.food_name,
					food_num: v.food_num
				}
			})
			for(let i = 0; i<insetOrderFood.length;i++){
				await order.addOrderFood(insetOrderFood[i]);
			}
			// 修改菜品销量
			for(let i = 0; i<insetOrderFood.length;i++){
				let foodId = insetOrderFood[i].food_id;
				let foodSaleNum = insetOrderFood[i].food_num;
				// 获取菜品原始销量
				let foodInfo = await food.getFoodInfoById({id: foodId});
				let foodOriginSaleNum = foodInfo.sale_num || 0;
				// 菜品实际销量
				let totalSaleNum = foodSaleNum + foodOriginSaleNum;
				// 修改销量
				await food.updateFood(foodId, {sale_num: totalSaleNum});
			}
			ctx.body = returnMsg(200, orderInfo, null);
			return;
		}
		ctx.body = returnMsg(204, null, errMsg.OPERATE_FAILED);
<<<<<<< HEAD
	},
	/**
	* @description 修改订单
	* @author wangjiaxing
	* @param {any} ctx
	*/
=======
    },
     /**
	 * @description 修改订单
	 * @author wangjiaxing
	 * @param {any} ctx
	 */
>>>>>>> parent of e97173e... 更新代码
	async updateOrder(ctx) {
		let formData = ctx.request.body || {};
		let id = Number(formData.id);
		let isId = typeof id === 'number' && id != NaN && id != 0;
		if (!isId) {
			ctx.body = returnMsg(204, null, '参数错误');
			return;
		}
		let keys = Object.keys(formData);
		let data = {};
		let attrs = ['checkout_persion_id', 'checkout_persion_name', 'checkout_price', 'desk_id', 'desk_number', 'food_ids', 'status'];
		keys.forEach(v => {
			if (formData[v] && formData[v] !== '' && attrs.includes(v)) {
				data[v] = formData[v];
			}
		});
		let result = await order.updateOrder(id, data);
		if (result.affectedRows != 0) {
			ctx.body = returnMsg(200, null, '更新成功');
			return;
		}
		ctx.body = returnMsg(204, null, errMsg.OPERATE_FAILED);
	}
};
