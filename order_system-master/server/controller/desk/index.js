const desk = require('../../module/desk/index');
const errMsg = require('./../../code/index');
let { returnMsg } = require('../../utils/judgeCode');
module.exports = {
	/**
	 * @description 添加桌号
	 * @author wangjiaxing
	 * @param {any} ctx
	 */
	async addDesk(ctx) {
		let formData = ctx.request.body;
		if (formData.number === undefined || formData.seat_num === undefined) {
			ctx.body = returnMsg(201, null, errMsg.LOASE_PARAM);
			return;
		}
		if (formData.number === '' || formData.seat_num === '') {
			ctx.body = returnMsg(202, null, errMsg.PARAM_NULL);
			return;
        }
        let result = await desk.getDeskByNumber(formData);
        if (result.length !== 0) {
			ctx.body = returnMsg(204, null, '桌号已存在');
			return;
		}
        let res = await desk.addDesk(formData);
        let deskId = res.insertId;
        if(deskId){
            ctx.body = returnMsg(200, null, '添加成功');
			return;
        }
        ctx.body = returnMsg(204, null, errMsg.OPERATE_FAILED);
    },
    
    /**
	 * @description 修改桌子状态
	 * @author wangjiaxing
	 * @param {any} ctx
	 */
	async updateDesk(ctx) {
        let formData = ctx.request.body || {};
        let id = Number(formData.id);
        let isId = typeof id === 'number' && id != NaN;
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
        let attrs = ['number', 'status'];
		keys.forEach(v => {
            if(formData[v] && formData[v] !== '' && attrs.includes(v)){
                data[v] = formData[v];
            }
        });
        if(Object.keys(data).length === 0){
            ctx.body = returnMsg(204, null, '参数错误');
            return;
        }
        let result = await desk.updateDesk(id, data);
        if(result.affectedRows != 0){
            ctx.body = returnMsg(200, null, '更新成功'); 
            return;  
        }
        ctx.body = returnMsg(204, null, errMsg.OPERATE_FAILED);
    },
    
    /**
	 * @description 查询所有桌子
	 * @author wangjiaxing
	 * @param {any} ctx
	 */
	async queryAllDeskByPage(ctx) {
		let formData = ctx.request.body;
		formData.page = formData.page ? formData.page : 1;
        formData.pageSize = formData.pageSize ? formData.pageSize : 10;
        formData.number = formData.number ? `%${formData.number}%` : '%%';  
        if(formData.status === undefined || formData.status === null || formData.status === ""){
            formData.status = '0,1,2';
        }else {
            formData.status = formData.status;
        }         
        let result = await desk.queryAllDeskByPage(formData);
        if(result){
            ctx.body = returnMsg(200, result);
            return;
        }
        ctx.body = returnMsg(204, null, errMsg.OPERATE_FAILED);
    },
};
