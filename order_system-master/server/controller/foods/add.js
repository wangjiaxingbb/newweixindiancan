const food = require('../../module/foods/index');
const errMsg = require('./../../code/index');
let { returnMsg } = require('../../utils/judgeCode');
module.exports = {
	/**
	 * @description 添加菜品
	 * @author wangjiaxing
	 * @param {any} ctx
	 */
	async addFood(ctx) {
		let formData = ctx.request.body;
		if (formData.name === undefined || formData.price === undefined) {
			ctx.body = returnMsg(201, null, errMsg.LOASE_PARAM);
			return;
		}
		if (formData.name === '' || formData.price === '') {
			ctx.body = returnMsg(202, null, errMsg.PARAM_NULL);
			return;
		}
		let result = await food.addFood(formData);
		let foodId = result.insertId;
		if (foodId) {
			let foodInfo = await food.getFoodInfoById({ id: foodId });
			ctx.body = returnMsg(200, foodInfo, '添加成功');
			return;
		}
		ctx.body = returnMsg(204, null, errMsg.OPERATE_FAILED);
	},

	/**
	 * @description 查询所有菜品
	 * @author wangjiaxing
	 * @param {any} ctx
	 */
	async queryAllFoodByPage(ctx) {
		let formData = ctx.request.body;
		formData.page = formData.page ? formData.page : 1;
        formData.pageSize = formData.pageSize ? formData.pageSize : 10;
        formData.order = formData.order ? formData.order : 'ASC';   
        formData.name = formData.name ? `%${formData.name}%` : '%%';  
        formData.categories = formData.categories ? formData.categories : null; 
        if(formData.status === undefined || formData.status === null || formData.status === ""){
            formData.status = '0,1';
        }else {
            formData.status = formData.status;
        }        
        let result = await food.queryAllFoodByPage(formData);
        if(result){
            ctx.body = returnMsg(200, result);
            return;
        }
        ctx.body = returnMsg(204, null, errMsg.OPERATE_FAILED);
    },
    
    /**
	 * @description 根据菜品名称查询菜品
	 * @author wangjiaxing
	 * @param {any} ctx
	 */
	async getFoodInfoByName(ctx) {
		let formData = ctx.request.body;
		formData.name = formData.name ? formData.name : '';       
        let result = await food.getFoodInfoByName(formData);
        if(result){
            ctx.body = returnMsg(200, result);
            return;
        }
        ctx.body = returnMsg(204, null, errMsg.OPERATE_FAILED);
    },
    
    /**
	 * @description 修改菜品
	 * @author wangjiaxing
	 * @param {any} ctx
	 */
	async updateFood(ctx) {
        let formData = ctx.request.body || {};
        let id = Number(formData.id);
        let isId = typeof id === 'number' && id != NaN && id != 0;
		if (isId) {
            if(formData.status && formData.status != ''){
                if(formData.status != 0 && formData.status != 1 && formData.status != 2){
                    ctx.body = returnMsg(204, null, '参数错误');
			        return;
                }
            }
		} else {
			ctx.body = returnMsg(204, null, '参数错误');
			return;
        }
        let keys = Object.keys(formData);
        let data = {};
        let attrs = ['name', 'img', 'price', 'status', 'sale_num', 'categories','taste', 'score'];
		keys.forEach(v => {
            if(formData[v] && formData[v] !== '' && attrs.includes(v)){
                data[v] = formData[v];
            }
        });
        if(Object.keys(data).length === 0){
            ctx.body = returnMsg(204, null, '参数错误');
            return;
        }
        let result = await food.updateFood(id, data);
        if(result.affectedRows != 0){
            ctx.body = returnMsg(200, null, '更新成功'); 
            return;  
        }
        ctx.body = returnMsg(204, null, errMsg.OPERATE_FAILED);
	}
};
