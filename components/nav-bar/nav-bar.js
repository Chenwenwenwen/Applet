// components/nav-bar/nav-bar.js
const app = getApp()
// const Component = global.GioComponent;

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    navBarHeight: {
      type: [Number, String],
      value: ''
    },
    title: {
      type: String
    },
    navigateBack: {
      type: [Boolean, String],
      value: false
    },
    backgroundColor: {
      type: String,
      value: '#000000'
    },
    //  默认中间使用LOGO，改为true就用标题title
    useTitle: {
      type: [Boolean, String],
      value: true
    }
  },

  options: {
    multipleSlots: true
  },

  /**
   * 组件的初始数据
   */
  data: {
    screenWidth: app.globalData.sysInfo.screenWidth,
    statusBarHeight: 0,
    show: false,
    isBackIcon: true // 是否使用返回的图标，false则使用home的图标
  },

  pageLifetimes: {
    show: function () {
      // 判断是使用back还是home图标
      const pages = getCurrentPages()
      console.log('顶部导航-页面切换', pages, pages.length)
      let _isBackIcon = true
      if (pages.length === 1) {
        _isBackIcon = false
      }
      this.setData({
        isBackIcon: _isBackIcon
      })
    }
  },

  ready() {
    try {
      var res = wx.getSystemInfoSync()
      this.setData({
        statusBarHeight: res.statusBarHeight,
        navBarHeight: res.statusBarHeight + 44
        // navBarHeight: res.statusBarHeight + this.data.screenWidth / 750 * 134 // 需要把导航栏调成134rpx再用这个
      })
    } catch (e) {
      // Do something when catch error
    }

    this.setData({
      show: true
    })
  },

  /**
   * 组件的方法列表
   */
  methods: { 
    back: function() {
      const pages = getCurrentPages()
      if (pages.length === 1) {
        wx.switchTab({
          url: '../index/index'
        })
      } else {
        wx.navigateBack({
          delta: 1,
        })
      }
    }
  }
})