// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedFoodArr: [],
    makingFood: []
  },

  //  下单  
  orderFood() {
    let tmp = this.data.makingFood;
    tmp.push(...this.data.selectedFoodArr);
    let foodInfo = this.data.selectedFoodArr.map(v => {
      return {
        food_name: v.name,
        food_num: v.num,
        food_id: v.id
      }
    })
    this.setData({
      makingFood: tmp,
      selectedFoodArr: [],
    })
    let foodIdArr = []
    let total = 0;
    this.data.makingFood.forEach(v=>{
      foodIdArr.push(v.id);
      total += (v.price * v.num);
    })
    let userInfo = global.globalData.userInfo;
    let data = {
      id: global.globalData.orderId || null,
      order_num: global.globalData.order_num || null,
      food_info: JSON.stringify(foodInfo),
      checkout_persion_id: global.globalData.openid,
      checkout_persion_name: global.utils.emojyToChar(userInfo.nickName),
      desk_id: 1,
      desk_number: 1,
      checkout_price: total,
    }
    global.http.addOrder(data).then(res => {
      global.globalData.selectedFoods = this.data.selectedFoodArr;
      global.globalData.orderId = res.data.id || global.globalData.orderId;
      global.globalData.order_num = res.data.order_num || global.globalData.order_num;
    })
  },
  addFood(e) {
    let id = e.target.dataset.food.id;
    let foodArr = global.globalData.selectedFoods;
    foodArr.forEach((v, k) => {
      if (v.id == id) {
        if (v.num >= 10) {
          wx.showToast({
            title: '最多只能添加10个哦',
            icon: 'none',
            duration: 2000
          })
          return;
        }
        global.globalData.selectedFoods[k].num++;
        global.globalData.selectedFoods[k].totalPrice = (v.num * v.price).toFixed(2);
        this.setData({
          selectedFoodArr: global.globalData.selectedFoods
        })
      }
    })
  },
  deleteFood(e) {
    let id = e.target.dataset.food.id;
    let foodArr = global.globalData.selectedFoods;
    foodArr.forEach((v, k) => {
      if (v.id == id) {
        global.globalData.selectedFoods[k].num--;
        global.globalData.selectedFoods[k].totalPrice = (v.num * v.price).toFixed(2);
        if (global.globalData.selectedFoods[k].num <= 0) {
          global.globalData.selectedFoods.splice(k, 1);
        }
        this.setData({
          selectedFoodArr: global.globalData.selectedFoods
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    this.setData({
      selectedFoodArr: global.globalData.selectedFoods,
      makingFood: global.globalData.makingFoods || []
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    global.globalData.makingFoods = this.data.makingFood;
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