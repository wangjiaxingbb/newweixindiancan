const categories = require('../../module/categories/index');
const errMsg = require('./../../code/index');
let { returnMsg } = require('../../utils/judgeCode');
module.exports = {
	/**
	 * @description 添加分类
	 * @author wangjiaxing
	 * @param {any} ctx
	 */
	async addCate(ctx) {
		let formData = ctx.request.body;
		if (formData.name === undefined) {
			ctx.body = returnMsg(201, null, errMsg.LOASE_PARAM);
			return;
		}
		let result = await categories.addCate(formData);
		let cateId = result.insertId;
		if (cateId) {
			let cateInfo = await categories.getCateInfoById({ id: cateId });
			ctx.body = returnMsg(200, cateInfo, '添加成功');
			return;
		}
		ctx.body = returnMsg(204, null, errMsg.OPERATE_FAILED);
	},

	/**
	 * @description 查询所有分类
	 * @author wangjiaxing
	 * @param {any} ctx
	 */
	async queryAllCateByPage(ctx) {
		let formData = ctx.request.body;
		formData.page = formData.page ? formData.page : 1;
        formData.pageSize = formData.pageSize ? formData.pageSize : 10;     
        if(formData.status === undefined || formData.status === null || formData.status === ""){
            formData.status = '0,1';
        }else {
            formData.status = formData.status;
        }        
        let result = await categories.queryAllCateByPage(formData);
        if(result){
            ctx.body = returnMsg(200, result);
            return;
        }
        ctx.body = returnMsg(204, null, errMsg.OPERATE_FAILED);
    },
    
    /**
	 * @description 修改分类
	 * @author wangjiaxing
	 * @param {any} ctx
	 */
	async updateCate(ctx) {
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
        let attrs = ['name', 'status'];
		keys.forEach(v => {
            if(formData[v] && formData[v] !== '' && attrs.includes(v)){
                data[v] = formData[v];
            }
        });
        if(Object.keys(data).length === 0){
            ctx.body = returnMsg(204, null, '参数错误');
            return;
        }
        let result = await categories.updateCate(id, data);
        if(result.affectedRows != 0){
            ctx.body = returnMsg(200, null, '更新成功'); 
            return;  
        }
        ctx.body = returnMsg(204, null, errMsg.OPERATE_FAILED);
	}
};
