// pages/index/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '个人简历',
    // 页面高度调整相关-start
    checkIpx: true,
    isIpx: app.globalData.isIpx,
    navBarHeight: app.globalData.navBarHeight,
    sysInfo: app.globalData.sysInfo,

    //个人信息
    name:'陈雯静',
    email:'935425887@qq.com',
    phone:'18675601324',
    yuque:'https://www.yuque.com/u1759621?tab=books',
    boke:'https://chenwenwenwen.github.io/',

    // 图片地址
    buttonImg:{
      "src":'https://asset.ibanquan.com/image/6202294b053371002448f2e6/s.png?v=1644308811',
      "width":'158rpx',
      "height":'64rpx',
    },
    buttonImg2:{
      "src":'https://asset.ibanquan.com/image/6202339d053371001548f423/s.png?v=1644311453',
      "width":'64rpx',
      "height":'64rpx',
    },
    yuque_code:["https://asset.ibanquan.com/image/620227c4cf85760024855cab/s.png?v=1644308420"],
    blog_code:["https://asset.ibanquan.com/image/62023487053371001548f43d/s.png?v=1644311687"],

    // 小程序信息
    tryFunID:'wx339755569a8a2929', //春风ID
    JWA:'wx94ed84f0c32b4f88',//JWA ID
    FCW:'wx0b762514116de662',//fcw ID
  },

  //点击拨打电话
  callPhone(){
    wx.makePhoneCall({
      phoneNumber: this.data.phone 
    })
  },
  //点击一键复制
  copyBtn(e) {
    var _data = e.currentTarget.dataset.content;

    wx.setClipboardData({
      //准备复制的数据内容
      data: _data,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
        });
      }
    });
  },

  //跳转到文档
  goOther(e){
    const detail = e.currentTarget.dataset || e
    wx.navigateTo({
      url: `/pages/webView/index?link=${detail.link}`,
    })
  },

  // 点击跳转
  btnClick(e){
    const detail = e.currentTarget.dataset || e
    if(detail.linktype === "navigateTo"){
      wx.navigateTo({
        url: detail.link,
      })
    }
  },

  goApp(e){
    const detail = e.currentTarget.dataset || e
    const _appId = detail.appid
    const _path = detail.path
    console.log("_appID",_appId,_path)
    wx.navigateToMiniProgram({
      appId:  _appId,  //appid
      path: _path,//path
      extraData: {},//参数
      envVersion: 'develop', //开发版develop 开发版 trial   体验版 release 正式版 
      success(res) {
        console.log('成功')
        // 打开成功
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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