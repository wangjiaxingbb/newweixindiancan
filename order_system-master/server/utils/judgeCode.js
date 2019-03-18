let returnMsg = function(code,data=null,msg=null){
    return {
        code: code,//错误代码
        data: data,//数据
        message: msg//提示语
    }
}
module.exports = {
    returnMsg
}