// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeCate: '',
    cateArr: [],
    foodArr: [],
    showTaste: false,
    foodInfo: {}
  },
  // 子传父 
  onCb(e){
    console.log(123456)
  },
  // 根据分类获取菜品
  getFoodByCate(e){
    this.setData({
      activeCate: e.target.dataset.item.id
    })
    global.http.queryFoodByPage({
      categories: e.target.dataset.item.id,
      status: 1,
      page: 1,
      pageSize: 10000
    }).then(res => {
      res.data.tableData.forEach(v => {
        global.globalData.selectedFoods.forEach(v1 => {
          if (v1.id == v.id) {
            v.selectedNum = v1.num;
          }
        })
      })
      this.setData({
        foodArr: res.data.tableData || []
      })
    })
  },
  // 选规格
  selectSpec(e){
    let info = e.target.dataset.foodinfo;
    info.tasteArr = info.taste ? info.taste.split(','):[];
    info.num = 1;
    info.defaultTaste = info.tasteArr.length == 0 ? '' : info.tasteArr[0];
    global.globalData.selectedFoods.forEach(v=>{
      if(v.id == info.id){
        info.num = v.num;
        info.defaultTaste = v.defaultTaste;
      }
    })
    this.setData({
      foodInfo: info,
      showTaste: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    global.http.queryAllCateByPage({
      status: 1,
      page: 1,
      pageSize: 10000
    }).then(res => {
      let data = [];
      data.push({id: '', name: '全部'});
      data.push(...res.data.tableData)
      this.setData({
        cateArr: data
      })
    })
    global.http.queryFoodByPage({
      status: 1,
      page: 1,
      pageSize: 10000
    }).then(res => {
      res.data.tableData.forEach(v => {
        global.globalData.selectedFoods.forEach(v1=>{
          if(v1.id == v.id){
            v.selectedNum = v1.num;
          }else{
            v.selectedNum = null;
          }
        })
      })
      this.setData({
        foodArr: res.data.tableData || []
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})