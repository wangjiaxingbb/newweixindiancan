const userInfo = require('../../module/admin/userInfo');
const errMsg = require('./../../code/index');
let { returnMsg } = require('../../utils/judgeCode');

module.exports = {
	/**
	 * @description 管理员登录
	 * @author wangjiaxing
	 * @param {any} ctx
	 * @returns
	 */
	async login(ctx) {
		let formData = ctx.request.body || {};
		if (formData.username === undefined || formData.password === undefined) {
			ctx.body = returnMsg(201, null, errMsg.LOASE_PARAM);
			return;
		}
		for (const key in formData) {
			if (formData[key] === '') {
				ctx.body = returnMsg(202, null, errMsg.PARAM_NULL);
				return;
			}
		}
		let result = await userInfo.getUserInfoByName(formData);
		if (result.length === 0) {
			ctx.body = returnMsg(204, null, '用户不存在');
			return;
		}
		result = await userInfo.getUserInfoByNamePwd(formData);
		if (result.length === 0) {
			ctx.body = returnMsg(204, null, '密码错误');
			return;
		}
		if (!result[0].status || result[0].status == 0 || result[0].status == 2) {
			ctx.body = returnMsg(204, null, '当前管理员无法登陆');
			return;
		}
		ctx.body = returnMsg(200, result[0], '登陆成功！');
	},

	/**
	 * @description 管理员注册
	 * @author wangjiaxing
	 * @param {any} ctx
	 */
	async registerUser(ctx) {
		let formData = ctx.request.body || {};
		if (formData.username === undefined || formData.password === undefined) {
			ctx.body = returnMsg(201, null, errMsg.LOASE_PARAM);
			return;
		}
		for (const key in formData) {
			if (formData[key] === '' && key !== 'id') {
				ctx.body = returnMsg(202, null, errMsg.PARAM_NULL);
				return;
			}
		}
		let result = await userInfo.getUserInfoByName(formData);
		if (result.length !== 0) {
			ctx.body = returnMsg(204, null, '用户已存在');
			return;
		}
		let regResult = await userInfo.registerUser(formData);
		let userId = regResult.insertId;
		let userMsg = await userInfo.getUserInfoById({ id: userId });
		ctx.body = returnMsg(200, userMsg, '添加成功');
	},

	/**
	 * @description 修改管理员
	 * @author wangjiaxing
	 * @param {any} ctx
	 */
	async updateAdmin(ctx) {
		let formData = ctx.request.body || {};
		let id = Number(formData.id);
		let isId = typeof id === 'number' && id != NaN && id != 0;
		if (isId) {
			if (formData.status && formData.status != '') {
				if (formData.status != 0 && formData.status != 1 && formData.status != 2) {
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
		let attrs = ['username', 'password', 'name', 'status', 'avatar'];
		keys.forEach(v => {
			if (formData[v] && formData[v] !== '' && attrs.includes(v)) {
				data[v] = formData[v];
			}
        });
        if(Object.keys(data).length === 0){
            ctx.body = returnMsg(204, null, '参数错误');
            return;
        }
		let result = await userInfo.updateAdmin(id, data);
		if (result.affectedRows != 0) {
			ctx.body = returnMsg(200, null, '更新成功');
			return;
		}
		ctx.body = returnMsg(204, null, errMsg.OPERATE_FAILED);
    },
    
    /**
	 * @description 查询所有管理员
	 * @author wangjiaxing
	 * @param {any} ctx
	 */
	async queryAllAdminByPage(ctx) {
		let formData = ctx.request.body;
		formData.page = formData.page ? formData.page : 1;
        formData.pageSize = formData.pageSize ? formData.pageSize : 10;
        formData.name = formData.name ? `%${formData.name}%` : '%%';  
        formData.username = formData.username ? `%${formData.username}%` : '%%';
        if(formData.status === undefined || formData.status === null || formData.status === ""){
            formData.status = '0,1';
        }else {
            formData.status = formData.status;
        }       
        let result = await userInfo.queryAllAdminByPage(formData);
        if(result){
            ctx.body = returnMsg(200, result);
            return;
        }
        ctx.body = returnMsg(204, null, errMsg.OPERATE_FAILED);
    },
    /**
	 * @description 根据id查询管理员
	 * @author wangjiaxing
	 * @param {any} ctx
	 */
    async queryAdminById(ctx) {
		let formData = ctx.request.body || {};
		if (formData.id === undefined) {
			ctx.body = returnMsg(201, null, errMsg.LOASE_PARAM);
			return;
        }
        let reg = /^[1-9]\d*$/;
        if(!reg.test(formData.id)){
            ctx.body = returnMsg(205, null, errMsg.PARAMERROR);
			return;
        }
        let result = await userInfo.getUserInfoById(formData);
        if(!result){
            ctx.body = returnMsg(204, null, '用户不存在');
			return;
        }
        ctx.body = returnMsg(200, result, null);
    }
};
