/**
 * code:
 * 200：请求成功
 * 201：参数丢失
 * 202：参数为空
 * 203：登陆超时
 * 204：错误返回
 * 205: 参数错误
 * 500：服务器内部异常
 */
module.exports = {
    LOASE_PARAM: '参数缺失',
    OPERATE_FAILED: '操作失败',
    PARAM_NULL: '参数不能为空',
    LOGIN_TIMEOUT: '登陆超时',
    SERVERERROR: '服务器内部异常',
    PARAMERROR: '参数错误'
}