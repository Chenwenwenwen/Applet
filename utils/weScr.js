// use
// 1 => 在进入页面之后，调用 global.weScr.addListener([{target: '#test',name: '商品一'}])
// target是指要统计元素的id, name是名字。是为了让产品知道当前统计的是那个模块
// 2 => 在页面 onScroll 生命周期里面调用一下 global.weScr.scroll()
// 3 => 离开当前页面的时候，调用一下 global.weScr.reset() 重置一下上报

// 一些特殊情况，比如banner轮播，当手动切换banner的时候，要主动调用一下global.weScr.scroll()

// 【We统计】商品sku名称处理函数
const weFormatSkuName = function (oSku) {
  if (oSku) {
    const _option_1 = oSku.option_2 ? oSku.option_1 + ',' : oSku.option_1
    const _option_2 = oSku.option_3 ? oSku.option_2 + ',' : oSku.option_2
    const _option_3 = oSku.option_3
    return (_option_1 + _option_2 + _option_3) || '无'
  } else {
    return '无'
  }
}


class weScr {
  constructor() {
    console.log('weScr init')
    const systemInfo = wx.getSystemInfoSync()
    // console.log('systemInfo =>', systemInfo)
    this.sr = {} // 有数sdk
    this.objMap = {}
    this.tabHeight = 48
    this.navBarHeight = systemInfo.statusBarHeight + 44
    this.windowHeight = systemInfo.windowHeight - this.tabHeight - this.navBarHeight
    this.screenWidth = systemInfo.screenWidth
    this.timer = null
  }

  // 节流函数
  throttle(fn) {
    const wait = 100
    return () => {
      if(this.timer) return
      this.timer = setTimeout(() => {
        fn()
        this.timer = null
      }, wait)
    }
  }

  scroll() {
    const list = Object.keys(this.objMap)
    if (!list.length) return;
    this.throttle(() => {
        list.forEach(key => {
          this._listenScroll(key)
        })
    })()
  }

  _listenScroll(target) {
    try {
      wx.createSelectorQuery().select(target).boundingClientRect((res) => {
        // res.top是指当前元素距离可视区顶部的距离
        if (!res) return;
        const top = res.top - this.navBarHeight
        if ((top + res.height) >= 0 && top <= this.windowHeight && res.left >= 0 && res.left < this.screenWidth) {
          if (!this.objMap[target].start) {
            const time = new Date().getTime()
            this.objMap[target].start = time
          }
          this.objMap[target].end = ''

          if (top <= this.windowHeight) {
            this._sendData({ ...this.objMap[target] }, target)
            this.objMap[target].hasSet = true // 设置一个标识，每次进入页面只执行一次上报
          }
        } else {
          this.objMap[target].end = new Date().getTime()

          if (this.objMap[target].start && this.objMap[target].end) {
            this._sendData({ ...this.objMap[target] }, target)
            this.objMap[target].hasSet = true // 设置一个标识，每次进入页面只执行一次上报
          }
        }
      }).exec()
    } catch (error) {
      
    }
  }

  // 添加监听
  addListener(list = []) {
    // console.log('add listener =>', list)
    list.forEach(item => {
      this.objMap[item.target] = {
        start: '',
        end: '',
        id:item.id,
        name: item.name || item.target,
        sku: item.sku,
        spu: item.spu,
        price_max:item.price_original,
        price:item.price_current,
        hasSet: false // 是否已上报过
      }
    })
    // if (sr) this.sr = sr
    // this.objMap['#prosList3-3'].hasSet = true
    // 触发一下
    this.scroll()
  }
  // 移除监听
  removeListener(list = []) {
    list.forEach(item => {
      delete this.objMap[item.target]
    })
  }

  // 全部重置
  reset() {
    this.objMap = {}
  }

  // 数据上报
  _sendData(oProduct, key) {
    if (!oProduct) return false // 商品数据不存在则不往下执行
    if (!oProduct.hasSet) {
      const sku_name = weFormatSkuName((oProduct.sku.sku_name || [])[0])
  
      wx.reportEvent("wxdata_expose_goods", {
        "spu_id": oProduct.id,
        "spu_name": oProduct.name,
        "sku_id": oProduct.sku.sku_id, // 取第一个sku
        "sku_name": sku_name, // 取第一个sku
        "price_original": oProduct.price_max, // 取最大价格
        "price_current": oProduct.price,
        "spu_catg_first_id": oProduct.spu.spu_catg_first_id, // 取第一个分类
        "spu_catg_first_name": oProduct.spu.spu_catg_first_name // 取第一个分类
      })
      console.log('---滚动上报结束---')
    }
  }
}

export default weScr