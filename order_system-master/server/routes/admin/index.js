const router = require('koa-router')();
const queryQuote = require('../../controller/quote/quote');
const queryUserController = require('../../controller/admin/query');
const foodController = require('../../controller/foods/add');
const cateController = require('../../controller/categories/index');
const deskController = require('../../controller/desk/index');
const orderController = require('../../controller/order/index');

router.prefix('/admin');
/**
 * 管理员登录
 * @param username
 * @param password
 */
router.post('/login', queryUserController.login);

/**
 * 添加管理员
 * @param username
 * @param password
 * @param name
 */
router.post('/register', queryUserController.registerUser);

/**
 * 修改管理员
 * @param username
 * @param password
 * @param name
 * @param status
 */
router.post('/updateAdmin', queryUserController.updateAdmin);

/**
 * 根据id查询管理员
 * @param id
 */
router.post('/queryAdminById', queryUserController.queryAdminById);

/**
 * 分页查询管理员列表
 * @param page
 * @param pageSize
 * @param username
 * @param name
 * @param status
 */
router.post('/queryAdminByPage', queryUserController.queryAllAdminByPage);
/**
 * 添加分类
 * @param name
 */
router.post('/addCate', cateController.addCate);

/**
 * 分页查询分类列表
 * @param page
 * @param pageSize
 * @param status
 */
router.post('/queryAllCateByPage', cateController.queryAllCateByPage);
/**
 * 修改分类
 * @param name
 * @param status
 */
router.post('/updateCate', cateController.updateCate);

/**
 * 添加菜品
 * @param name
 * @param price
 * @param img
 */
router.post('/addFood', foodController.addFood);

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
 * 根据菜品名称查询菜品
 * @param name
 */
router.post('/queryFoodByName', foodController.getFoodInfoByName);

/**
 * 修改菜品
 * @param name
 * @param img
 * @param price
 * @param sale_num
 * @param status
 */
router.post('/updateFood', foodController.updateFood);

/**
 * 添加桌号
 * @param number
 */
router.post('/addDesk', deskController.addDesk);
/**
 * 修改桌子状态
 * @param number
 * @param status
 */
router.post('/updateDesk', deskController.updateDesk);

/**
 * 分页查询桌子列表
 * @param page
 * @param pageSize
 * @param number
 * @param status
 */
router.post('/queryDeskByPage', deskController.queryAllDeskByPage);

/**
 * 分页查询订单列表
 * @param page
 * @param pageSize
 * @param order_num
 * @param date
 * @param checkout_persion_name
 * @param desk_number
 * @param status
 */
router.post('/queryOrderByPage', orderController.queryAllOrderByPage);
/**
 * 创建订单
 * @param checkout_persion_id
 * @param checkout_persion_name
 * @param desk_id
 * @param desk_number
 * @param checkout_persion_name
 * @param checkout_price
 * @param food_ids
 */
router.post('/addOrder', orderController.addOrder);


router.get('/getEveryDayQuote', queryQuote.getQuote);

module.exports = router;
