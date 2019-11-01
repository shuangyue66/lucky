// pages/v2/v2.js
const app = getApp()
var time = null;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    locationnumber: 16, // 共有多少个
    locationnow: '', // 旋转的位置
    locationcircle: 3*16, // 旋转的个数 
    luckystate: false, // 抽奖状态
    luckyresult: 0, // 抽奖结果
    circulation: 0, // 循环变量
    circulationtwo: 0, // 第二次循环变量
    box: [],
    hidden: false, // 弹窗显示
    inputValue: [] // 表单input值
  },
  onclick: function() {
    console.log(1)
    var resultnumber = Math.floor(Math.random() * 16)
    if (!this.data.luckystate) { // 判断状态
      this.data.luckyresult = resultnumber
      this.initiate()
    }
  },
  initiate: function() {
    var locationcircle = this.data.locationcircle
    var i = this.data.circulation
    this.setData({
      luckystate: true
    })
    if (i < locationcircle) { // 点击先转3圈
      i++
      this.setData({
        locationnow: i % 16,
        circulation: i
      })
      setTimeout(this.initiate, 100)
    } else {
      var i = this.data.circulationtwo
      if (i < this.data.luckyresult) { // 3圈转完后 转中奖的个数
        i++
        this.setData({
          circulationtwo: i,
          locationnow: i % 16
        })
        setTimeout(this.initiate, 150)
      } else {
        console.log("你好")
        // 清零
        this.setData({
          circulation: 0,
          circulationtwo: 0,
          locationnow: '',
          luckystate: false
        })
        // 抽奖结果提示
        var index = this.data.luckyresult
        wx.showModal({
          title: '',
          content: '今晚吃' + this.data.box[index].name,
          showCancel: false
        })
        clearTimeout(time)
      }
    }
  },
  // 点击按钮换box数组
  clickchange: function() {
    let inputValue = wx.getStorageSync('box')
    if (inputValue.list) {
      this.setData({
        inputValue: inputValue.box,
        hidden: true
      })
    } else {
      this.setData({
        hidden: true
      })
    }
  },
  // 隐藏表单
  hideform: function() {
    this.setData({
      hidden: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let boxlist = wx.getStorageSync('box')
    if (boxlist.box) {
      this.setData({
        box: boxlist.box
      })
    } else {
      // 遍历抽卡数组
      var luckylist = ['麦当劳', '肯德基', '必胜客', '炒菜', '炸鸡']
      var listlength = 16
      // 数组能循环几次
      var listnum = Math.floor(listlength / luckylist.length)
      var newlist = []
      for (var a = 0; a < listnum; a++) {
        luckylist.map(i => {
          newlist.push({name: i})
        })
      }
      if (newlist.length !== 16) {
        newlist.push({name: '再抽一次'})
      }
      if (newlist.length === 16) {
        this.setData({
          box: newlist
        })
      }
    }
  },
  // 表单提交按钮
  formSubmit: function(e) {
    console.log(e.detail.value, '点击')
    var inputDatail = e.detail.value
    let valuelist = [] 
    for (let i in inputDatail) {
      console.log(inputDatail[i], '444')
      if (!inputDatail[i]) {
        inputDatail[i] = "再抽一次"
      } 
      valuelist.push({name: inputDatail[i]})
    }
    // console.log(valuelist, '00')
    if (valuelist) {
      this.setData({
        box: valuelist,
        hidden: false
      })
      wx.setStorage({
        key: 'box',
        data: {
          box: valuelist,
          list: inputDatail
        }
      })
      // try {
      //   wx.setStorageSync()
      // }
    }
  },
  // 表单取消按钮
  formReset: function(e) {
    this.setData({
      hidden: false
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('你好2')
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