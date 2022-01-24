import Request from './request.js'

class API {
  constructor() {
    this._request = new Request()
    this._request.setErrorHandler(this.errorHander)

    this._token = (wx.getStorageSync('app_session') || {}).token || ''
    this._defaultHeader = {
      'token': this._token
    }
  }

}
export default API