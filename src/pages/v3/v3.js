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
    rollLists: [], // 滚动用的数组
    disabled: false, // 更换禁止
    showDefault: false,
    animationData1: {}, // 动画
    interval: '',
    num: 1,
    hidden: false,
    showsurface: false,
    Empty: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let boxlist = wx.getStorageSync('list')
    let oldlist = this.data.lists
    if (boxlist.list) { // 判断本地有没有存储选择卡数组
      let newlist = boxlist.list.concat(boxlist.list, boxlist.list)
      this.setData({
        newLists: boxlist.list,
        rollLists: newlist
      })
    } else {
      let newlist = oldlist.concat(oldlist, oldlist)
      this.setData({
        newLists: oldlist,
        rollLists: newlist
      })
    }
  },
  // 抽奖
  onlucky: function(e) {
    let showDefault = this.data.showDefault
    this.setData({
      disabled: true
    })
    var that = this;
    let newListsL = that.data.newLists.length // new长度
    let rollListsL = that.data.rollLists.length // 总长度
    // 随机的数值
    let randomNum = Math.floor(Math.random() * newListsL + 1)
    // 总旋转次数
    if (!showDefault) {
      this.getOpenAnimation(newListsL, rollListsL, randomNum)
    }

  },
  // 重置
  onEmpty: function(e) {
    let animation = wx.createAnimation({
      duration: 300, // 执行一次动画的时间
      timingFunction: 'ease', // 动画的效果，平滑
    })
    animation.translateY(0).step()
    this.setData({
      Empty: true,
      animationData1: animation.export()
    })
  },
  // 动画
  getOpenAnimation: function(newListsL, e, randomNum) {
    this.setData({
      showDefault: true
    })
    var page = this
    let animation = wx.createAnimation({
      duration: 300, // 执行一次动画的时间
      timingFunction: 'ease', // 动画的效果，平滑
    })
    let systemInfo = wx.getSystemInfoSync();
    let aaaa = (e - 1) * 120 // 总长度
    let bbbb = randomNum // 随机的数
    let cccc = (newListsL * 2 - 1) * 120 + bbbb * 120  //随机数的高度
    let dddd = -aaaa + (aaaa - cccc) // 总移动的数
    animation.translateY(dddd / 750 * systemInfo.windowWidth).step({
      duration: 300
    })
    handleSet(page)
    function handleSet(page) {
      page.setData({
        Empty: false,
        disabled: false,
        showDefault: false,
        animationData1: animation.export()
      })
    }
  },
  onclick: function(e) {
    this.setData({
      showDefault: false,
      hidden: true
    })
    // var aaa = this.data.interval
    // clearInterval(aaa)
  },
  oldOnlucky: function() {
    let oldList = this.data.lists
    let rollList = oldList.concat(oldList, oldList)
    this.setData({
      newLists: oldList,
      rollLists: rollList
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
      let rollList = listsValue.concat(listsValue, listsValue)
      this.setData({
        newLists: listsValue,
        rollLists: rollList
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
    let rollList = e.concat(e, e)
    this.setData({
      newLists: e,
      rollLists: rollList,
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