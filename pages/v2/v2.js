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
    box: [
      {
        name: '麦当劳'
      },
      {
        name: '肯德基'
      },
      {
        name: '必胜客'
      },
      {
        name: '炒菜'
      },
      {
        name: '炸鸡'
      },
      {
        name: '麦当劳'
      },
      {
        name: '肯德基'
      },
      {
        name: '必胜客'
      },
      {
        name: '炒菜'
      },
      {
        name: '炸鸡'
      },
      {
        name: '麦当劳'
      },
      {
        name: '肯德基'
      },
      {
        name: '必胜客'
      },
      {
        name: '炒菜'
      },
      {
        name: '炸鸡'
      },
      {
        name: '再抽一次'
      }
    ]
  },
  onclick: function() {
    console.log(1)
    var resultnumber = Math.floor(Math.random() * 16)
    if (!this.data.luckystate) { // 判断状态
      this.data.luckyresult = resultnumber
      this.initiate()
    }
    console.log(resultnumber, '11111')
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('你好')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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