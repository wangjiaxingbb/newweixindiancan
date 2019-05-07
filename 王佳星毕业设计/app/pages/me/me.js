// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    makingFood: [],
    totalMoney: 0,
    userInfo: {}
  },
  // 结账
  settle(){
    let data = {
      id: global.globalData.orderId,
      status: 2
    }
    global.http.updateOrder(data).then(res => {
      if (res.code == 200){
        wx.showToast({
          title: '结账成功！',
          icon: 'none',
          duration: 2000
        })
      }
    })
    global.globalData.makingFoods = [];
    this.setData({
      makingFood: [],
      totalMoney: 0
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      userInfo: global.globalData.userInfo
    })
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
    let arr = global.globalData.makingFoods || [];
    let total = 0;
    if(arr.length !== 0){
      arr.forEach(v=>{
        total += (v.price * v.num);
      })
    }
    this.setData({
      makingFood: global.globalData.makingFoods || [],
      totalMoney: total
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

  }
})