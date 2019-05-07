import * as api from './api.js';
let baseUrl = 'http://localhost:3000/';
let request = {}
const list = [];
// 解析api文件
Object.keys(api).forEach(function(name) {
  const value = api[name];
  const url = `${baseUrl}${value[0]}`;
  const action = value[1];
  list.push({
    name,
    url,
    action
  });
});
// 生成API接口
list.forEach(function(item) {
  const name = item.name;
  const url = item.url;
  const method = item.action || 'post';
  request[name] = function(params, config = {}) {
    return new Promise((resolve, reject) => {
      wx.showLoading({
        title: '正在请求...',
      })
      wx.request({
        url: url,
        data: params || {},
        method: method,
        dataType: 'json',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {
          wx.hideLoading()
          if (!res.data.code || res.data.code != 200){
            wx.showToast({
              title: res.data.message || '',
              icon: 'none',
              duration: 2000
            })
          }else{
            resolve(res.data)
          }
        },
      })
    });
  };
});
export default request;