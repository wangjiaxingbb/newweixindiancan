// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    openid: null
  },

  getUserInfo(e) {
    wx.showLoading({
      title: '正在请求',
    })
    // 登录 
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        global.http.getOpenId({
          code: res.code || ''
        }).then(res => {
          if (res.data.openid && e.detail.userInfo) {
            global.globalData.openid = res.data.openid;
            global.globalData.userInfo = e.detail.userInfo;
            this.setData({
              openid: global.globalData.openid,
              userInfo: global.globalData.userInfo
            })
            wx.switchTab({
              url: '/pages/index/index',
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      userInfo: global.globalData.userInfo,
      openid: global.globalData.openid
    })
    // 是否登陆成功
    if (this.data.userInfo) {
      console.log('success')
    } else {
      console.log('faile')
    }

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

  }
})