const router = require('koa-router')();
const openIdController = require('../../controller/getOpenId/index');
<<<<<<< HEAD
const foodController = require('../../controller/foods/add');
const cateController = require('../../controller/categories/index');
const orderController = require('../../controller/order/index');
=======
>>>>>>> parent of e97173e... 更新代码
router.prefix('/app');
/**
 * 获取openid
 * @param code
 */
router.post('/getOpenId', openIdController.getOpenId);
<<<<<<< HEAD
/**
 * 分页查询菜品列表
 * @param page
 * @param pageSize
 * @param order
 * @param name
 * @param categories
 */
router.post('/queryFoodByPage', foodController.queryAllFoodByPage);
/**
 * 分页查询分类列表
 * @param page
 * @param pageSize
 * @param status
 */
router.post('/queryAllCateByPage', cateController.queryAllCateByPage);
/**
 * 分页查询菜品列表
 * @param page
 * @param pageSize
 * @param order
 * @param name
 * @param categories
 */
router.post('/queryFoodByPage', foodController.queryAllFoodByPage);
/**
 * 创建订单
 * @param checkout_persion_id
 * @param checkout_persion_name
 * @param desk_id
 * @param desk_number
 * @param checkout_price
 * @param food_ids
 */
router.post('/addOrder', orderController.addOrder);
/**
 * 修改订单
 * @param checkout_persion_id
 * @param checkout_persion_name
 * @param desk_id
 * @param desk_number
 * @param checkout_price
 * @param food_ids
 * @param status
 */
router.post('/updateOrder', orderController.updateOrder);
=======
>>>>>>> parent of e97173e... 更新代码
module.exports = router;