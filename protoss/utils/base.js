import {Config} from './config.js';
import { Token } from './token.js';
var token = new Token;
class Base{
  constructor(){
    this.baseResquestUrl = Config.baseRequestUrl;
  }

  request(opts, hasRepect){
    var url = this.baseResquestUrl+opts.url;
    var _this = this;
    if(!opts.method)
      opts.method = 'GET';
    wx.request({
      url: url,
      method: opts.method,
      data: opts.data,
      header: {
        'content-type': opts.contentType ? opts.contentType :  'application/x-www-form-urlencoded'
        // 'Authorization': wx.getStorageSync('token')
      },
      success: function(res){
        // console.log(res);
        var code = res.statusCode.toString();
        if(code.charAt(0)==2){
          opts.sCallback && opts.sCallback(res.data);          
        }
        else{
          if (hasRepect){
            _this.refetch(opts);
          }
        }
      },
      fail: function(){
        opts.fCallback && opts.fCallback();
      }
    })
  }

  refetch(opts){
    console.log('bad request');
    token.getToken((t)=>{
      this.request(opts,true);
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