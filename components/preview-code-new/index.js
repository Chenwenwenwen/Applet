// pages/index/components/product-item/index.js
const app = getApp()


Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: []
    },
    img: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    sysInfo: app.globalData.sysInfo,
    // imgalist:['https://asset.ibanquan.com/image/60dd579336be620024cdf013/s.png?v=1625118611'],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //企业微信二维码
    previewCode(e){
      var current=e.target.dataset.src;
      // console.log("this.properties.imgalist",this.properties.item,current)
      wx.previewImage({
          current: current, // 当前显示图片的http链接
          urls: this.properties.item // 需要预览的图片http链接列表
      })
    }
  }
})
