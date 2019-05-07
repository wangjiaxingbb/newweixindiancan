//app.js
let request = require('./config/request.js')
import http from './config/request.js';
import utils from './utils/util.js'
App({
  onLaunch: function() {
    global.globalData = {
      openid: null,
      userInfo: null,
      selectedFoods: []
    }
    global.http = http,
      global.utils = utils
  }
})