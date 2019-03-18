let config = require('../../config');
const koa2Req = require('koa2-request');
let { returnMsg } = require('../../utils/judgeCode');
module.exports = {
	/**
	 * @description 获取openid
	 * @author wangjiaxing
	 * @param {any} ctx
	 */
	async getOpenId(ctx) {
        let formData = ctx.request.body;
        let appId = config.appId;
        let AppSecret = config.appSecret;
        let code = formData.code;
		const res = await koa2Req({
			url: `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${AppSecret}&js_code=${code}&grant_type=authorization_code`
        });
        let resData = JSON.parse(res.body);
        if(resData.openid){
            ctx.body = returnMsg(200, {openid: resData.openid}, null);
        }else{
            ctx.body = returnMsg(204, null, '登陆失败');
        }
	}
};
