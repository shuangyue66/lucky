//index.js
//获取应用实例
const app = getApp()
Page({
  data: {

  },
  onclickv1: function(e) {
    console.log(1)
    wx.navigateTo({
      url: '../v1/v1'
    })
  },
  onclickv2: function (e) {
    console.log(2)
    wx.navigateTo({
      url: '../v2/v2'
    })
  }
})
