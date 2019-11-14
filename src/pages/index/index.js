//index.js
//获取应用实例
const app = getApp()
Page({
  data: {

  },
  onclickv1: function(e) {
    wx.navigateTo({
      url: '../v1/v1'
    })
  },
  onclickv2: function (e) {
    wx.navigateTo({
      url: '../v2/v2'
    })
  },
  onclickv3: function (e) {
    wx.navigateTo({
      url: '../v3/v3'
    })
  }
})
