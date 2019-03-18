//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
<<<<<<< HEAD
    swiper: [],
    showTaste: false,
    foodInfo: {},
    hotFoodArr: [],
    goodFoods: []
  },

  // 开始点餐
  orderFood() {
    console.log(123456)
    wx.switchTab({
      url: '/pages/category/category',
    })
  },
  // 选规格
  selectSpec(e) {
    let info = e.target.dataset.foodinfo;
    info.tasteArr = info.taste ? info.taste.split(',') : [];
    info.num = 1;
    info.defaultTaste = info.tasteArr.length == 0 ? '' : info.tasteArr[0];
    global.globalData.selectedFoods.forEach(v => {
      if (v.id == info.id) {
        info.num = v.num;
        info.defaultTaste = v.defaultTaste;
      }
    })
    this.setData({
      foodInfo: info,
      showTaste: true
    })
    console.log(this.data)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(global)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    global.http.queryFoodByPage({
      status: 1,
      page: 1,
      pageSize: 20
    }).then(res => {
      this.setData({
        hotFoodArr: res.data.tableData
      })
      let goodsFoods = [];
      this.data.hotFoodArr.forEach(v => {
        if (v.img) {
          goodsFoods.push(v);
        }
      })
      let len = goodsFoods.length;
      for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
          if (Number(goodsFoods[j].price) < Number(goodsFoods[j + 1].price)) { //相邻元素两两对比
            let temp = goodsFoods[j + 1]; //元素交换
            goodsFoods[j + 1] = goodsFoods[j];
            goodsFoods[j] = temp;
          }
        }
      }
      this.setData({
        goodFoods: goodsFoods
      })
    })
    global.http.queryFoodByPage({
      status: 1,
      page: 1,
      order: 'DESC',
      pageSize: 20
    }).then(res => {
      this.setData({
        swiper: res.data.tableData
      })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

=======
    userInfo: {},
    hasUserInfo: false,
    code: null,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
>>>>>>> parent of e97173e... 更新代码
  }
})