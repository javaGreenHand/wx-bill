//index.js
Page({
  data: {
    id: '',
    images: [],
    imageNames: [],
    users: [],
    occurDate: '',
    payer: '',
    money: '',
    remark: '',
    array3: ['王球', '李三凤', '郑阳结', '查小玲'],
    items: [{
        name: '王球',
        value: '王球'
      },
      {
        name: '郑阳结',
        value: '郑阳结'
      },
      {
        name: '查小玲',
        value: '查小玲'
      },
      {
        name: '李三凤',
        value: '李三凤'
      },
    ],
    userDialog: false,
    userTemp: [],
    gallery: false,
    src: '',
  },

  onLoad: function (options) {
    var _this = this;
    var id = options.id;
    if (null == id || '' == id) {
      return;
    }

    wx.request({
      url: 'http://192.168.1.111:8080/bill/getById?id=' + id,
      method: 'GET',
      success: function (res) {
        var model = res.data.model;
        if (res.data.success) {
          _this.setData({
            occurDate: model.occurDate,
            payer: model.payer,
            money: model.money,
            users: model.users,
            remark: model.remark,
            images: model.images,
            imageNames: model.imageNames,
            id: id
          })
        }
      },
    })
  },

  // 表单提交
  formSubmit: function (e) {
    var _this = this;
    wx.getUserInfo({
      success: function (res) {
        var bill = {
          money: _this.data.money,
          payer: _this.data.payer,
          users: _this.data.users,
          remark: _this.data.remark,
          occurDate: _this.data.occurDate,
          imageNames: _this.data.imageNames,
          createUser: res.userInfo.nickName
        }
        var url;
        if ('' != _this.data.id) {
          url = 'http://192.168.1.111:8080/bill/updateById/' + _this.data.id;
        } else {
          url = 'http://192.168.1.111:8080/bill/add';
        }
        // 上传数据
        wx.request({
          url: url,
          data: bill,
          method: 'POST',
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            if (res.data.success) {
              wx.showToast({
                title: "保存成功",
                duration: 1000,
                icon: 'success'
              });
              wx.navigateTo({
                url: "index"
              })
            } else {
              wx.showToast({
                title: res.data.errorMsg,
                duration: 1000,
                icon: 'none'
              });
            }
          },
        })
      },
      fail: function (e) {
        wx.showToast({
          title: '请先授权！！！',
          duration: 1000,
          icon: 'none'
        });
      }
    })
  },

  // 选择图片
  chooseMoneyFile: function (e) {
    var _this = this;
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: 'http://192.168.1.111:8080/file/upload',
          filePath: tempFilePaths[0],
          name: 'file',
          success(res) {
            var obj = JSON.parse(res.data);
            if (obj.success) {
              _this.data.imageNames.push(obj.model);
              _this.setData({
                images: _this.data.images.concat(tempFilePaths)
              })
            } else {
              wx.showToast({
                title: '图片上传失败',
                duration: 2000
              });
            }
          }
        })
      }
    })
  },

  // 选择使用人
  usersChange: function (e) {
    this.setData({
      userTemp: e.detail.value
    })
  },

  setUsers: function (e) {
    this.setData({
      users: this.data.userTemp
    })
    this.closeUserDialog();
  },

  // 选择付款人
  payerChange: function (e) {
    this.setData({
      payer: this.data.array3[e.detail.value]
    })
  },

  // 选择日期
  occurDateChange: function (e) {
    this.setData({
      occurDate: e.detail.value
    })
  },

  openUserDialog: function () {
    this.setData({
      userDialog: true
    });
  },

  closeUserDialog: function () {
    this.setData({
      userDialog: false,
    })
  },

  remarkInput: function (e) {
    this.setData({
      remark: e.detail.value
    })
  },

  moneyInput: function (e) {
    this.setData({
      money: e.detail.value
    })
  },

  closeGallery: function () {
    this.setData({
      gallery: false
    });
  },
  openGallery: function (event) {
    console.log(event.currentTarget.dataset.src);
    this.setData({
      gallery: true,
      src: event.currentTarget.dataset.src
    });
  },

})