Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    foodInfo: {
      type: Object,
      value: {
        img: "",
        tasteArr: []
      }
    },
    isShow: {
      type: Boolean,
      value: false
    }
  },
  data: {
    num: 1,
  },
  methods: {
    getTaste(e) {
      let foodInfo = this.data.foodInfo;
      foodInfo.defaultTaste = e.target.dataset.item
      this.setData({
        foodInfo: foodInfo
      })
    },
    sliderChange(e){
      let foodInfo = this.data.foodInfo;
      foodInfo.num = e.detail.value;
      this.setData({
        foodInfo: foodInfo
      })
    },
    close(){
      this.setData({
        isShow: false
      })
    },
    confirm(){
      this.triggerEvent('myevent', '123');
      let foodInfo = {
        id: this.data.foodInfo.id,
        name: this.data.foodInfo.name,
        price: this.data.foodInfo.price,
        img: this.data.foodInfo.img,
        num: this.data.foodInfo.num,
        totalPrice: (this.data.foodInfo.num * this.data.foodInfo.price).toFixed(2),
        defaultTaste: this.data.foodInfo.defaultTaste
      }
      let flag = true;
      let index = 0;
      for (let i = 0; i < global.globalData.selectedFoods.length; i++) {
        if (global.globalData.selectedFoods[i].id == foodInfo.id) {
          flag = false;
          index = i;
        }
      }
      if (flag){
        global.globalData.selectedFoods.push(foodInfo)
      }else{
        global.globalData.selectedFoods[index] = foodInfo;
      }
      this.close();
    }
  }
})