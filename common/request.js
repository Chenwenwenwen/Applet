
class Request {
  constructor() {
    this._header = {}
  }

  /**
   * 设置统一的异常处理
   */
  setErrorHandler(handler) {
    this._errorHandler = handler;
  }

  /**
   * GET类型的网络请求
   */
  _get(url, data, header = this._header) {
    return this.requestAll(url, data, header, 'GET')
  }
  _get1(url, data, header) {
    return this.requestAll(url, data, header, 'GET')
  }

  /**
   * DELETE类型的网络请求
   */
  _delete(url, data, header = this._header) {
    return this.requestAll(url, data, header, 'DELETE')
  }

  /**
   * PUT类型的网络请求
   */
  _put(url, data, header = this._header) {
    return this.requestAll(url, data, header, 'PUT')
  }

  /**
   * POST类型的网络请求
   */
  _post(url, data, header = this._header) {
    return this.requestAll(url, data, header, 'POST')
  }

  /**
   * 网络请求
   */
  requestAll(url, data, header, method) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        data: data,
        header: header,
        method: method,
        success: (oRes => {
          // console.log(oRes)
          if (oRes.statusCode === 200 && !oRes.data.errmsg) {
            resolve(oRes)
          } else {
            if (this._errorHandler) {
              this._errorHandler(oRes)
            }
            reject(oRes)
          }
        }),
        fail: (oRes => {
          if (this._errorHandler) {
            this._errorHandler(oRes)
          }
          reject(oRes)
        })
      })
    })
  }
}

export default Request
