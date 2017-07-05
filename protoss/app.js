import {Token} from './utils/token.js';
var tokenModel = new Token;
App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    var token = wx.getStorageInfoSync('token');
    if(!token){
      tokenModel.getToken();
    }
    else{
      tokenModel.validToken((res)=>{
        console.log(res);
        // if(!res.valid){
        //   tokenModel.getToken();
        // }
      })
    }
  },



})
