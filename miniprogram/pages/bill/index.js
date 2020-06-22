//index.js
Page({
  data: {
   
  },
  open: function (event) {
    wx.navigateTo({
        url: event.currentTarget.dataset.url,
    })
  },

  getUserInfo: function(){
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              
            },
            fail(errMsg){
              console.log(errMsg);
              wx.showToast({
                title: errMsg,
                duration: 2000
              });
            }
          })
        }
      }
    })
  }
})
