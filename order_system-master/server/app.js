const Koa = require('koa');
const app = new Koa();
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const koaBody = require('koa-body');
const formidable = require('formidable');
const path = require('path');
const logger = require('koa-logger');
const cors = require('koa-cors');
const router = require('./routes/index');
const errMsg = require('./code/index');
let { returnMsg } = require('./utils/judgeCode');

// error handler
onerror(app);

// middlewares 中间件
app.use(
	koaBody({
		multipart: true,
		formidable: {
			uploadDir: path.join(__dirname, 'controller/oss/tmp'), // 设置文件上传目录
			keepExtensions: true, // 保持文件的后缀
			maxFileSize: 100 * 1024 * 1024, // 设置上传文件大小最大限制，默认1M
			onFileBegin: (name, file) => {
				
			}
		}
	})
);
// app.use(
// 	bodyparser({
// 		enableTypes: ['json', 'form', 'text']
// 	})
// );
app.use(json());
app.use(logger());
app.use(cors());
app.use(require('koa-static')(__dirname + '/public'));

// logger 错误处理
app.use(async (ctx, next) => {
	const start = new Date();
	try {
		await next();
	} catch (e) {
		console.log(e);
		ctx.body = returnMsg(500, null, errMsg.SERVERERROR);
	}
	const ms = new Date() - start;
	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);//后台服务引用处理 sql 地址 时间
});

// routes
app.use(router.routes(), router.allowedMethods());

// error-handling 打印错误信息给后台
app.on('error', (err, ctx) => {
	console.error('server error', err, ctx);
});

module.exports = app;
