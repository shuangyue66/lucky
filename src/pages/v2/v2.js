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
          content: this.data.box[index].name,
          showCancel: false
        })
        clearTimeout(time)
      }
    }
  },
  // 点击按钮换box数组
  clickchange: function() {
    this.setData({
      hidden: true
    })
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
    if (boxlist.box) { // 判断本地有没有存储选择卡数组
      this.setData({
        box: boxlist.box,
        inputValue: boxlist.box
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
          box: newlist,
          inputValue: newlist
        })
      }
    }
  },
  // 表单提交按钮
  formSubmit: function(e) {
    var inputDatail = e.detail.value
    let emptyjudge = true
    let judgeNum = 0 
    let valuelist = [] 
    for (let i in inputDatail) {
      if (!inputDatail[i]) {
        emptyjudge = false // 值空 为 false
        judgeNum++ // 空值有几个
        inputDatail[i] = "再抽一次"
      } 
      valuelist.push({name: inputDatail[i]})
    }
    if (emptyjudge) { // 判断是否被空)
      this.countWay(valuelist)
    } else {
      let that = this
      wx.showModal({
        title: '提示',
        content: '你有 ' + judgeNum + ' 个选择卡没填\r\n 空的选择卡将以 "再来一次" 来补充\r\n 确定提交吗？',
        success (res) {
          if (res.confirm) {
            that.countWay(valuelist)
          } else if (res.cancel) {
            judgeNum = 0
          }
        }
      })
    }
  },
  countWay: function(e) {
    this.setData({
      box: e,
      inputValue: e,
      hidden: false
    })
    wx.setStorage({
      key: 'box',
      data: {
        box: e
      }
    })
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 1000
    })
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