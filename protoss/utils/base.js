import {Config} from './config.js';
class Base{
  constructor(){
    this.baseResquestUrl = Config.baseRequestUrl;
  }

  request(opts){
    var url = this.baseResquestUrl+opts.url;
    if(!opts.method)
      opts.method = 'GET';
    wx.request({
      url: url,
      method: opts.method,
      data: opts.data,
      header: {
        'content-type':'application/json',
        'token': wx.getStorageSync('token')
      },
      success: function(res){
        opts.sCallback && opts.sCallback(res.data);
      },
      fail: function(){
        opts.fCallback && opts.fCallback();
      }
    })
  }

  getDataSet(e,k){
    return e.currentTarget.dataset[k];
  }

  getCacheByKey(key){
    var data = {};
    data = wx.getStorageSync(key);
    return data;
  }
}

export {Base};