// var loginBehavior = require('../utils/loginBehavior.js')
// const Component = global.GioComponent;

Component({
  // behaviors: [loginBehavior],
  data: {
    isShow: true,
    selected: 0,
    color: "#000",
    selectedColor: "#FF4858",
    nick_name: '',
    avatar: '',
    customer_info_str: '',
    note_info_str: '',
    // isLogin: false,
    // token: '',
    // customer: {},
    // // 当前的page 登陆后返回需要
    // backPage: 'index',
    list: [
      {
        pagePath: "/pages/index/index",
        iconPath: "/assets/tab/index.png",
        selectedIconPath: "/assets/tab/index_active.png",
        page: 'index',
        text: "首页"
      },
      {
        pagePath: "/pages/mine/index",
        iconPath: "/assets/tab/mine.png",
        selectedIconPath: "/assets/tab/mine_active.png",
        requireAuth: false,
        page: 'mine',
        text: "我的"
      }
    ]
  },

  observers: {
    selected() {
      // this.checkToken()
      this.setCustomerService()
      console.log('选中的序号变化', this.data.selected)
    }
  },
  attached() {
    // console.log('attached')
    // this.checkToken()
  },
  methods: {
    switchTab(e) {
      // this.checkToken()
      const data = e.currentTarget.dataset
      if (!data) return
      const url = data.path
      console.log(e)
      const requireAuth = data.auth
      const page = data.page
      this.setData({
        backPage: page
      })
      if (requireAuth && !this.data.isLogin) {
        return
      }
      if (url === '/pages/services/services') return
      wx.switchTab({ url })
      console.log('当前点击的序号为：', data.index)
      this.setData({
        selected: data.index
      })
    },
    setCustomerService() {
      const wxInfo = wx.getStorageSync('wx_info') || {}
      const account =  wx.getStorageSync('account') || {}
      var customer_info = {
        "description": (wx.getStorageSync('account').id || '').toString(),
      }
      let nick_name = wxInfo.nickName // 客户昵称
      let avatar = wxInfo.avatarUrl || '' // 客户头像
     
      // 去取saas的昵称
      if (!nick_name ) {
        nick_name = account.name || account.real_name || '游客'
      }
      var note_info = {
       
      }
      //转换成字符串
      let customer_info_str = JSON.stringify(customer_info)
      let note_info_str = JSON.stringify(note_info)
  
      this.setData({
        nick_name,
        avatar,
        customer_info_str,
        note_info_str
      })
    },
  },
  pageLifetimes: {
    show: function () {
      // 页面被展示
      console.log('show')
    },
    hide: function () {
      // 页面被隐藏
      console.log('hide')
    },
    resize: function (size) {
      // 页面尺寸变化
    }
  }
})