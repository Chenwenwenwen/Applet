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

// 【We统计】事件集合
const weAnalysisObj = {

  // 【商品卡曝光】 / wxdata_expose_goods
  exposeGoods: function (oProduct) {
    if (!oProduct) return false // 商品数据不存在则不往下执行
    const sku_name = weFormatSkuName((oProduct.variants || [])[0])

    wx.reportEvent("wxdata_expose_goods", {
      "spu_id": oProduct.id,
      "spu_name": oProduct.name,
      "sku_id": (oProduct.variants || [])[0].id, // 取第一个sku
      "sku_name": sku_name, // 取第一个sku
      "price_original": oProduct.price_max, // 取最大价格
      "price_current": oProduct.price,
      "spu_catg_first_id": (oProduct.types || [])[0].handle, // 取第一个分类
      "spu_catg_first_name": (oProduct.types || [])[0].name // 取第一个分类
    })
  },

  // 【商品卡点击】 / wxdata_click_goods
  clickGoods: function (oProduct) {
    if (!oProduct) return false // 商品数据不存在则不往下执行
    const self = this
    const sku_name = weFormatSkuName((oProduct.variants || [])[0])

    wx.reportEvent("wxdata_click_goods", {
      "spu_id": oProduct.id,
      "spu_name": oProduct.name,
      "sku_id": (oProduct.variants || [])[0].id, // 取第一个sku
      "sku_name": sku_name, // 取第一个sku
      "price_original": oProduct.price_max, // 取最大价格
      "price_current": oProduct.price,
      "spu_catg_first_id": (oProduct.types || [])[0].handle, // 取第一个分类
      "spu_catg_first_name": (oProduct.types || [])[0].name // 取第一个分类
    })
  },

  // 【商详页游览】 / wxdata_browse_goods
  browseGoods: function (oProduct) {
    if (!oProduct) return false // 商品数据不存在则不往下执行

    const sku_name = weFormatSkuName((oProduct.variants || [])[0])

    wx.reportEvent("wxdata_browse_goods", {
      "spu_id": oProduct.id,
      "spu_name": oProduct.name,
      "sku_id": (oProduct.variants || [])[0].id, // 取第一个sku
      "sku_name": sku_name, // 取第一个sku
      "price_original": oProduct.price_max, // 取最大价格
      "price_current": oProduct.price,
      "spu_catg_first_id": (oProduct.types || [])[0].handle, // 取第一个分类
      "spu_catg_first_name": (oProduct.types || [])[0].name // 取第一个分类
    })
  }
};

module.exports = weAnalysisObj;
