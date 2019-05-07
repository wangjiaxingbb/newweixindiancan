const router = require('koa-router')();
const admin = require('./admin/index');
const public = require('./public/index');
const app = require('./app/index');

router.use(admin.routes()).use(admin.allowedMethods());
router.use(public.routes()).use(public.allowedMethods());
router.use(app.routes()).use(app.allowedMethods());

module.exports = router
