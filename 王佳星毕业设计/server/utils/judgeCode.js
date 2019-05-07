let returnMsg = function(code,data=null,msg=null){
    return {
        code: code,
        data: data,
        message: msg
    }
}
module.exports = {
    returnMsg
}