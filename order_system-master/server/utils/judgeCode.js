let returnMsg = function(code,data=null,msg=null){
    return {
        code: code,//�������
        data: data,//����
        message: msg//��ʾ��
    }
}
module.exports = {
    returnMsg
}