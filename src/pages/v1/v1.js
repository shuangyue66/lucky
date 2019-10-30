// pages/v1/v1.js
const app = getApp()
var time = null;
Page({
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
        name: '麦当劳',
        left: '10rpx'
      },
      {
        name: '肯德基',
        top: '0',
        left: '156rpx'
      },
      {
        name: '必胜客',
        top: "0",
        left: '302rpx'
      },
      {
        name: '炒菜',
        top: '0',
        left: '448rpx'
      },
      {
        name: '炸鸡',
        top: '0',
        left: '594rpx'
      },
      {
        name: '麦当劳',
        top: '90rpx',
        left: '594rpx'
      },
      {
        name: '肯德基',
        top: '180rpx',
        left: '594rpx'
      },
      {
        name: '必胜客',
        top: '270rpx',
        left: '594rpx'
      },
      {
        name: '炒菜',
        top: '360rpx',
        left: '594rpx'
      },
      {
        name: '炸鸡',
        top: '360rpx',
        left: '448rpx'
      },
      {
        name: '麦当劳',
        top: '360rpx',
        left: '302rpx'
      },
      {
        name: '肯德基',
        top: '360rpx',
        left: '156rpx'
      },
      {
        name: '必胜客',
        top: '360rpx',
        left: '10rpx'
      },
      {
        name: '炒菜',
        top: '270rpx',
        left: '10rpx'
      },
      {
        name: '炸鸡',
        top: '180rpx',
        left: '10rpx'
      },
      {
        name: '再抽一次',
        top: '90rpx',
        left: '10rpx'
      }
    ]
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
      // setInterval(this.initiate, 100)
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
          content: '今晚吃' + this.data.box[index].name,
          showCancel: false
        })
        clearTimeout(time)
      }
    }
    // for (var i = 0; i < locationcircle; i++) {
    //   var aa = i % 16
    //   console.log(aa, '44')
    //   this.setData({
    //     locationnow: i % 16
    //   }, 4000)
    // }
  },
  // returnclick: function(e) {
  //   wx.navigateBack()
  // },
  //事件处理函数
  onLoad: function () {
    
  }
})