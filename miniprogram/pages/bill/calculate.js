// pages/bill/list.js
Page({

  data: {
    startDate: '',
    endDate: '',
    bills: ''
  },

  // 选择日期
  startDateChange: function (e) {
    this.setData({
      startDate: e.detail.value
    })
  },

  // 选择日期
  endDateChange: function (e) {
    this.setData({
      endDate: e.detail.value
    })
  },

  calculate: function(){
    var startDate = this.data.startDate;
    if('' == startDate){
      wx.showToast({
        title: "请输入开始日期",
        duration: 1000,
        icon: 'none'
      });
      return;
    }

    var endDate = this.data.endDate;
    if('' == endDate){
      wx.showToast({
        title: "请输入结束日期",
        duration: 1000,
        icon: 'none'
      });
      return;
    }
    var _this = this;
    wx.request({
      url: 'http://192.168.1.110:8080/bill/calculate?startDate=' + startDate + '&endDate=' + endDate,
      method: 'GET',
      success: function (res) {
        if (res.data.success) {
          _this.setData({
            bills: res.data.model
          })
        }
      },
    })
  }
})