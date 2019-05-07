module.exports = {
  // 删除数组中元素
  delArrItem(arr = [], e = '') {
    if (arr.length === 0 || !e) {
      return arr;
    } else {
      let tmpArr = [];
      arr.forEach(v => {
        if (v !== e) {
          tmpArr.push(v);
        }
      });
      return tmpArr;
    }
  },
  // 获取当前用户信息
  getAdminInfo(){
      return JSON.parse(sessionStorage.getItem('userInfo'));
  }  
};
