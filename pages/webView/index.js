const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '首页',
    url: '',
    sysInfo: app.globalData.sysInfo
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options){
      console.log(options,"options")
      this.setData({
        url:options.link
      })
    }
  },
  
 onScroll(){

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
    if(this.data.sysInfo.platform !== "ios"){
      wx.hideTabBar()
      if (typeof this.getTabBar === 'function' && this.getTabBar()) {
        this.getTabBar().setData({
          isShow: false
        })
      }
    }
    const app_session = (wx.getStorageSync('app_session') || {}).token || '';
    if(app_session){
      this.setData({
        url: this.data.url
      })
    }
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