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
    newLists: [],
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
    let boxlist = wx.getStorageSync('list')
    let oldlist = this.data.lists
    if (boxlist.list) { // 判断本地有没有存储选择卡数组
      this.setData({
        newLists: boxlist.list
      })
    } else {
      this.setData({
        newLists: oldlist
      })
    }
  },
  onlucky: function(e) {
    let showDefault = this.data.showDefault
    this.setData({
      disabled: true
    })
    var that = this;
    let aa = that.data.newLists.length
    // 随机的数值
    let randomNum = Math.floor(Math.random() * aa + 1)
    // 总旋转次数
    let randomNumTotal = aa * 2 + randomNum
    if (!showDefault) {
      this.getOpenAnimation(aa, randomNum, randomNumTotal)
    }

  },
  // 动画
  getOpenAnimation: function(e, randomNum, randomNumTotal) {
    this.setData({
      showDefault: true
    })
    var page = this
    let animation = wx.createAnimation({
      duration: 300, // 执行一次动画的时间
      timingFunction: 'ease', // 动画的效果，平滑
    })
    let num = 0
    let count = 1
    let loop = setInterval(function () {
      num++
      count++
      if (num > e - 1) {
        // 如果计数值大于数组index，置为0
        num = 0;
      }
      if (count > randomNumTotal) {
        animation.translateY(1).step({
          duration: 300
        });
        page.setData({
          disabled: false
        })
        handleSet(page);
        clearInterval(loop);
      } else {
        animation.translateY(90).step().translateY(-30).step({
          duration: 0
        });
        handleSet(page);
      }

      function handleSet(page) {
        page.setData({
          time: page.data.newLists[num].name,
          animationData1: animation.export()
        })
      }
    }, 400)
    page.setData({
      interval: loop
    })
  },
  onclick: function(e) {
    this.setData({
      showDefault: false,
      hidden: true
    })
    var aaa = this.data.interval
    clearInterval(aaa)
  },
  oldOnlucky: function() {
    let oldList = this.data.lists
    this.setData({
      newLists: oldList
    })
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 1000
    })
  },
  // 增加input
  addInput: function(e) {
    let listsValue = this.data.newLists // lists
    listsValue.push({name: ""})
    this.setData({
      newLists: listsValue
  })
  },
  // 删除input
  delInput: function(e) {
    let nowidx = e.currentTarget.dataset.idx // 当前删除input index值
    let lists = this.data.newLists.length // lists一共有几个
    let listsValue = this.data.newLists // lists
    if (lists > 2) {
      listsValue.splice(nowidx, 1)
      this.setData({
        newLists: listsValue
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
    let inputDatail = e.detail.value
    let valuelist = this.data.newLists
    for (let i in inputDatail) {
      if (!inputDatail[i]) {
        valuelist.splice(i, 1)
      } 
    }
    this.countWay(valuelist)
  },
  countWay: function(e) {
    this.setData({
      newLists: valuelist,
      hidden: false
    })
    wx.setStorage({
      key: 'list',
      data: {
        list: e
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
    let newValuelist = []
    let valuelist = this.data.newLists
    for (let i in valuelist) {
      if (valuelist[i].name) {
        newValuelist.push({name: valuelist[i].name})
      } 
    }
    this.setData({
      newLists: newValuelist,
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