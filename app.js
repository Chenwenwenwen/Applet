import API from './common/api.js'
import weAnalysis from './utils/weAnalysis.js'
import weScr from './utils/weScr'

global.weAnalysis = weAnalysis // We统计
const _weScr = new weScr()
global.weScr = _weScr

global.account = {}

App({
  api: new API(),
  // mta: mta,
  // analysis: analysis,
  globalData: {
    isLogin: false,
    sysInfo: {},
    userInfo: {
      oUser: {}, // 用户信息
      isSync: false, // 是否同步服务器最新的数据
      isAuth: false // 是否有授权
    },
    navBarHeight: 20,
    isIpx: false,
  },
  onLaunch(options = {}) {

    // 同步 放 异步 后面
    this.getSystemInfo() // 获取设备信息

    // 获取 Token
    const app_session = (wx.getStorageSync('app_session') || {}).token || '';
    const account = wx.getStorageSync('account')

    if (app_session && account && account.id) {
      global.yhsd.SESSION_TOKEN = app_session
    }

    console.log('app_session => ',wx.getStorageSync('app_session'))
    // global.yhsd.sdk.request.interceptors.response.use(function (response, next) {
    //   // 未登录 弹出登录窗口
    //   if (response.data.code === 212){
    //     const pages = getCurrentPages()
    //     const curPage = pages[pages.length - 1]
    //     curPage.setData({
    //       showLoginModal: true
    //     })
    //   }
    //   next && next(response)
    // })
  },
  onShow(options = {}) {
    // Share 相关一般只能放 onShow，因为可能之前已经 onLaunch 过再开其他人的分享
    console.log('App onShow', options)
    // 检查和强制更新
    this.checkVer()
    this.getUserInfo(options)

    // 上报数据
    const _yhtag = (options.query || {}).yhtag || ''

    if (_yhtag) {
      wx.reportAnalytics('yhtag', {
        yhtag: _yhtag,
      })
    }
  },

  // 检查和强制更新
 checkVer() {
    const upManager = wx.getUpdateManager()
  
   upManager.onUpdateReady(() => {
    wx.showModal({
    title: '小程序版本更新',
    content: '更新已准备好，建议重启以获得更好体验？',
    confirmText: '马上体验',
    cancelText: '取消',
      success: function(oRes) {
        if (oRes.confirm) {
        // 每次发版更新清除登录态，解决有时候在storage增加登录相关的判断字段时，不删除无法用以判断的问题
        wx.removeStorage('app_session')
        wx.removeStorage('account')
        wx.removeStorage('unionid')
        upManager.applyUpdate()
        }
      }
    })
  })
 },
  // 获取设备信息
  getSystemInfo() {
    try {
      const sysInfo = wx.getSystemInfoSync()
      this.globalData.sysInfo = sysInfo
      this.globalData.navBarHeight = sysInfo.statusBarHeight + 44
      const model = sysInfo.model.substring(0, sysInfo.model.indexOf("X")) + "X"
      const iPhone11 = sysInfo.model.search('iPhone 11') //判断是否为11 
      // iphone xs 、xs max 暂时先判断statusBarHeight === 44
      // iphone 12 statusBarHeight === 47
      const list = [44, 47]
      console.log(1233321321321132, model)
      if (model === 'iPhone X' || list.includes(sysInfo.statusBarHeight) || iPhone11 === 0) {
        this.globalData.isIpx = true
      }
    } catch (oErr) {
      // console.log(oErr)
    }
  },
  // 获取用户信息
  getUserInfo(options) {
    const forcelogin = options && options.query.forcelogin
    // global.yhsd.sdk.account.current(data => {
    //   if (data.res.code === 200) {
    //     const customer = data.res.customer
    //     // 登录态失效，清除token
    //     if(!customer){
    //       console.log('登录态失效, SESSION_TOKEN => ', global.yhsd.SESSION_TOKEN)
    //       wx.removeStorageSync('app_session')
    //       wx.removeStorageSync('account')
    //       wx.removeStorageSync('uidData')
    //       global.yhsd.SESSION_TOKEN = ''
    //       global.account = {}
          
    //     } else {
    //       console.log('user info => ', customer)
    //       wx.setStorageSync('account', customer)

    //       try {
    //         const wxName = (customer.social_accounts || []).find( item => item.type === 'weixin' )
    //         if (wxName && wxName.name !== customer.name) {
    //           global.yhsd.sdk.account.save({ name:  wxName.name },  data => {})
    //         }
    //       } catch (error) {
            
    //       }
    //     }
    //   }
    // })
  },
  // 获取当前时间
  getTimestamp() {
    this.api.getCurrDateTime().then(res => {
      if (res.data.code === 200) {
        const server_now = new Date(res.data.current_datetime).getTime()
        const now = new Date().getTime()
        const diff = now - server_now // 当前时间与服务器时间的差值
        global.ts_diff = diff
        console.log('diff:',diff)
      }
    })
  },
})