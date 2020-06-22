// pages/bill/list.js
Page({

  data: {
    bills: ''
  },

  onLoad: function(options) {
    var _this = this;
    wx.request({
      url: 'http://192.168.1.110:8080/bill/list',
      method: 'GET',
      success: function (res) {
        if (res.data.success) {
          _this.setData({
            bills: res.data.model
          })
        }
      },
    })
  },
})