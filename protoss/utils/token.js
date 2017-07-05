import {Config} from 'config.js';
class Token{

  constructor(){
    this.vaildTokenUrl = Config.vaildTokenUrl;
    this.getTokenUrl = Config.getTokenUrl;
  }

  validToken(callback){
    var t = wx.getStorageSync('token');
    wx.request({
      url: this.vaildTokenUrl,
      method:'POST',
      data:{
        'token':t,
      },
      sCallback: function(res){
        callback && callback(res);
      }
    })
  }

  getToken(callback){
    var _this = this;
    wx.login({
      success: function (res) {
        console.log(res);
        if (res.code) {
          wx.request({
            url: _this.getTokenUrl,
            method: 'POST',
            data: {
              'code': res.code,
            },
            
            success: function(d){
              // console.log(d);
              wx.setStorageSync('token', d.data.token);
              callback && callback(d.data.token);
            }
            
          });
        }
      }
    })
  }

}
export { Token } ; 