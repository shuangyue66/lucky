
const HTTP_HOST_API = 'http://isshiki.esther.mobi'

function newLogin() {
  // wx.login({
  //   success: res => {
      
  //   }
  // })
  let sss = '1'
}

function wxLogin(params) {
  console.log(params, 'params')
}

function wxrequest(params) {
  console.log(params, 'dddd')

  const {
    url,
    method = 'GET',
    data = {},
    header = {
      'Content-Type': 'application/json'
    },
    success,
    fail,
    complete
  } = params 

  console.log(url, 'url')
  console.log(params.cookie, 'cookie')
  if (params.cookie) {
    console.log('123')
    header = {
      'Content-Type': 'application/json',
      'cookie': wx.getStorageSync('cookie')
    }
  }
  console.log(params, 'params')
  // console.log(header, 'header')
  wx.request({
    url: HTTP_HOST_API + url,
    method,
    data,
    header,
    success: (res) => {
      console.log(res, 'res')
      if (res.code === '0') {

      } else {
        wxLogin(params)
      }
    },
  })
}


const API = {
  getRequest: (data) => wxrequest(data),
};

module.exports = { 
  API: API

}
