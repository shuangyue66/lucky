// pages/v3/v3.js
const getCookie = require('../../utils/getCookie.js').API
// const app = getApp()

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
    newLists: [], // 真实储存用的数组
    storageLists: [], // 表单显示储存用的数组
    fromLists: [], // 表单显示用的数组
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
    let code = wx.getStorageSync('code')
    console.log(code, 'code')
    let aaaa = {
      url: `/api/miniProgram/login/lucky/${code}`,
      query: false,
      cookie: false,
      code: true

    }
    getCookie.getRequest(aaaa)
    // wx.login({
    //   success (res) {
    //     if (res.code) {
    //       console.log(res, 'res')
    //       wx.request({
    //         url: `${getCookie.HTTP_HOST_API}/api/miniProgram/login/lucky/${res.code}`,
    //         method: 'GET',
    //         success (ress) {
    //           console.log(ress, 'sssss')
    //           console.log(ress.header['set-cookie'], '123')
    //           if (ress.data.code === '0') {
    //             wx.setStorageSync('cookies', ress.header['set-cookie'])
    //               var cookies = ress.header['set-cookie']
    //               let __cookies = [];
    //               (cookies.match(/([\w\-.]*)=([^\s=]+);/g) || []).forEach((str) => {
    //                 console.log(str, 'str')
    //                 if (str !== 'path=/;' && str.indexOf('csrfToken=') !== 0) {
    //                   __cookies.push(str);
    //                 }
    //               });
    //               wx.request({
    //                 url: `${getCookie.HTTP_HOST_API}/api/miniProgram/lucky/getLists`,
    //                 method: 'GET',
    //                 header: {
    //                   'content-type': 'application/json',
    //                   'cookie': `${__cookies}`
    //                 },
    //                 // data: {
    //                 //   'EGG_SESS': aaa
    //                 // },
    //                 success (roll) {
    //                   console.log(roll, 'roll')
    //                 }
    //               })
    //           } else {
    //             wx.showToast({
                  
    //             })
    //           }
    //         }
    //       })
    //     } else {

    //     }
    //   }
    // })
    let boxlist = wx.getStorageSync('list')
    let oldlist = this.data.lists
    if (boxlist.list) { // 判断本地有没有存储选择卡数组
      let newlist = boxlist.list.concat(boxlist.list, boxlist.list)
      this.setData({
        storageLists: [...boxlist.list],
        fromLists: [...boxlist.list],
        newLists: [...boxlist.list],
        rollLists: [...newlist]
      })
    } else {
      let newlist = oldlist.concat(oldlist, oldlist)
      this.setData({
        storageLists: [...oldlist],
        fromLists: [...oldlist],
        newLists: [...oldlist],
        rollLists: [...newlist]
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
    animation.translateY(0).step({
      duration: 0
    })
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
    // let systemInfo = wx.getSystemInfoSync();
    let sumHeight = -((newListsL * 2 - 1) * 60 + randomNum * 60)  //总随机数的高度
    animation.translateY(sumHeight).step({
      duration: 1500
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
  },
  oldOnlucky: function() {
    let oldList = this.data.lists
    let rollList = oldList.concat(oldList, oldList)
    let Empty = this.data.Empty
    if (Empty) {
    } else {
      this.onEmpty()
    }
    this.setData({
      storageLists: [...oldList],
      fromLists: [...oldList],
      newLists: [...oldList],
      rollLists: [...rollList]
    })
    wx.setStorage({
      key: 'list',
      data: {
        list: oldList
      }
    })
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 1000
    })
  },
  bindKeyInput: function(e) {
    let nowidx = e.currentTarget.dataset.idx //表单input的键值
    let fromLists = this.data.fromLists // 表单显示用的数组
    let keyValue =  e.detail.value
    fromLists[nowidx].name = keyValue
    this.setData({
      storageLists: fromLists
    })
  },
  // 增加input
  addInput: function(e) {
    let listsValue = this.data.storageLists // 表单显示存储用的数组
    listsValue.push({name: ""})
    this.setData({
      fromLists: [...listsValue]
    })
  },
  // 删除input
  delInput: function(e) {
    let nowidx = e.currentTarget.dataset.idx // 当前删除input index值
    let lists = this.data.fromLists.length // lists一共有几个
    let listsValue = this.data.fromLists // lists
    if (lists > 2) {
      listsValue.splice(nowidx, 1)
      this.setData({
        storageLists: [...listsValue],
        fromLists: [...listsValue]
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
    let valuelist = []
    for (let i in inputDatail) {
      if (inputDatail[i]) {
        valuelist.push({name: inputDatail[i]})
      }
    }
    this.countWay(valuelist)
  },
  countWay: function(e) {
    let rollList = e.concat(e, e)
    this.setData({
      storageLists: [...e],
      newLists: [...e],
      fromLists: [...e],
      rollLists: [...rollList],
      hidden: false
    })
    let Empty = this.data.Empty
    if (Empty) {
    } else {
      this.onEmpty()
    }
    wx.setStorage({
      key: 'list',
      data: {
        list: [...e]
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
      storageLists: [...newValuelist],
      fromLists: [...newValuelist],
      newLists: [...newValuelist],
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