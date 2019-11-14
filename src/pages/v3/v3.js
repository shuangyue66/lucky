// pages/v3/v3.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists: [
      {
        name: '麦当劳'
      },
      {
        name: '肯德基'
      },
      {
        name: '汉堡王'
      },
      {
        name: '炒菜'
      },
      {
        name: '炸鸡'
      }
    ],
    disabled: false, // 更换禁止
    showDefault: false,
    animationData1: {}, // 动画
    time: "",
    interval: '',
    num: 1,
    hidden: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onlucky: function(e) {
    console.log(2)
    this.setData({
      showDefault: true,
      disabled: true
    })
    var that = this;
    let aa = that.data.lists.length
    console.log(aa, '12')
    // 随机的数值
    let randomNum = Math.floor(Math.random() * aa + 1)
    console.log(randomNum, '13')
    // 总旋转次数
    let randomNumTotal = aa * 2 + randomNum
    this.getOpenAnimation(aa, randomNum, randomNumTotal)

  },
  // 动画
  getOpenAnimation: function(e, a, s) {
    console.log(e, 'e')
    console.log(a, 'a')
    console.log(s, 's')
    var page = this
    let animation = wx.createAnimation({
      duration: 300, // 执行一次动画的时间
      timingFunction: 'ease', // 动画的效果，平滑
    })
    console.log(11)
    let num = 0
    let count = 1
    let loop = setInterval(function () {
      num++
      count++
      if (num > e - 1) {
        // 如果计数值大于数组index，置为0
        num = 0;
      }
      if (count > s) {
        animation.translateY(1).step({
          duration: 300
        });
        page.setData({
          disabled: false
        })
        handleSet(page);
        clearInterval(loop);
      } else {
        animation.translateY(60).step().translateY(-20).step({
          duration: 0
        });
        handleSet(page);
      }

      function handleSet(page) {
        page.setData({
          time: page.data.lists[num].name,
          animationData1: animation.export()
        })
      }
    }, 200)
    page.setData({
      interval: loop
    })
  },
  onclick: function(e) {
    console.log(1)
    this.setData({
      showDefault: false,
      hidden: true
    })
    var aaa = this.data.interval
    clearInterval(aaa)
  },
  // 增加input
  addInput: function(e) {
    let listsValue = this.data.lists // lists
    listsValue.push({name: ""})
    this.setData({
      lists: listsValue
  })
  },
  // 删除input
  delInput: function(e) {
    console.log(e.currentTarget.dataset.idx, 'idx')
    let nowidx = e.currentTarget.dataset.idx // 当前删除input index值
    let lists = this.data.lists.length // lists一共有几个
    let listsValue = this.data.lists // lists
    if (lists > 2) {
      listsValue.splice(nowidx, 1)
      this.setData({
        lists: listsValue
      })
    } else {
      wx.showModal({
        title: '提示！',
        content: "选择卡不能少于2个！",
        showCancel: false
      })
    }
  },
  // 表单确定按钮
  formSubmit: function(e) {
    console.log(e.detail.value, 'value')
    this.setData({
      hidden: false
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