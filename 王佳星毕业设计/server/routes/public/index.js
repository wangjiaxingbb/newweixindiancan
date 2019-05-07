const router = require('koa-router')();
const public = require('../../controller/oss/uploadImg');
router.prefix('/public');
// 文件上传
router.post('/upload', public.upload);
module.exports = router;