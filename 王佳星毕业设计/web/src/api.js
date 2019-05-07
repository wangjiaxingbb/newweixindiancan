import { baseUrl } from './http/baseUrl.js';
// 上传
export const upload = `${baseUrl}/public/upload`;
// 管理员登录
export const login = { url: '/admin/login', method: 'post', config: {} };
// 管理员列表
export const adminList = { url: '/admin/queryAdminByPage', method: 'post', config: {} };
// 添加管理员
export const addAdmin = { url: '/admin/register', method: 'post', config: {} };
// 编辑管理员
export const editAdmin = { url: '/admin/updateAdmin', method: 'post', config: {} };
// 根据id查询管理员
export const queryAdminById = { url: '/admin/queryAdminById', method: 'post', config: {} };
// 菜品列表
export const foodList = { url: '/admin/queryFoodByPage', method: 'post', config: {} };
// 添加菜品
export const addFood = { url: '/admin/addFood', method: 'post', config: {} };
// 编辑菜品
export const updateFood = { url: '/admin/updateFood', method: 'post', config: {} };
// 桌子列表
export const deskList = { url: '/admin/queryDeskByPage', method: 'post', config: {} };
// 添加桌号
export const addDesk = { url: '/admin/addDesk', method: 'post', config: {} };
// 编辑桌号
export const updateDesk = { url: '/admin/updateDesk', method: 'post', config: {} };
// 获取所有分类
export const queryAllCateByPage = { url: '/admin/queryAllCateByPage', method: 'post', config: {} };
// 添加分类
export const addCate = { url: '/admin/addCate', method: 'post', config: {} };
// 编辑分类
export const updateCate = { url: '/admin/updateCate', method: 'post', config: {} };
// 查询订单列表
export const queryOrderByPage = { url: '/admin/queryOrderByPage', method: 'post', config: {} };