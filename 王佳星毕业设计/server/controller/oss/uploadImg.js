const OSS = require('ali-oss');
const fs = require('fs');
const path = require('path');
const errMsg = require('./../../code/index');
const { returnMsg } = require('../../utils/judgeCode');

let client = new OSS({
	region: 'oss-cn-beijing',
	accessKeyId: 'LTAIOb5D1NsE2dXS',
	accessKeySecret: 'qE8PjBqkNWgirmfOH8Tr3E2NbxkmlP',
	bucket: 'wuchengji'
});
// 查看oss文件列表
async function getFileList() {
	let result = await client.list();
	return result.objects;
}
// 上传
async function upload(ctx) {
	try {
        if(!ctx.request.files){
            ctx.body = returnMsg(202, null, errMsg.PARAM_NULL);
            return;
        }
        const file = ctx.request.files.file;	// 获取上传文件
        let fileName = file.name;
        let name = `${new Date().getTime()}_${fileName}`;
        // 上传文件到oss服务器
        let stream = fs.createReadStream(file.path);
        let result = await client.putStream(name, stream);
        // 删除本地暂存文件
        let url = 'controller/oss/tmp'
        if(fs.existsSync(url)){
            let fileArr = fs.readdirSync(url);
            if(fileArr.length !== 0){
                fileArr.forEach(v=>fs.unlinkSync(path.join(url,v)));
            }
        }
		ctx.body = ctx.body = returnMsg(200, result.url, null);
	} catch (err) {
		console.log(err);
	}
}
module.exports = {
	getFileList,
	upload
};
