// pages/tool/tool.js 

import {Base} from '../../utils/base.js';
import { Config } from '../../utils/config.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.base = new Base();
  },

  onLaunch: function(){
    var base = new Base();
    wx.login({
      success: function(res){
        if(res.code){
          console.log(res);
          base.request({
            url: 'wxlogin',
            method: 'POST',
            data: {
              'code':res.code,
            },
            sCallback: function(res){
              console.log(res);
              wx.setStorageSync('token', res.data.token);
            }
          });
        }
      }
    })
  },
  permission: function() {
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.record']) {
          wx.authorize({
            scope: 'scope.record',
            success() {
            }
          })
        }
      }
    })
  },
  onGotUserInfo: function(res) {
   var _this = this
    wx.getUserInfo({
      success: function (res) {
        console.log(res)
        _this.base.request({
          url:'wx/set-userinfo',
          method: 'post',
          data:{
            'encryptedData': res.encryptedData,
            'iv':res.iv
          },
          sCallback: function (res) {
            console.log(res);
          }
        })
      }
    })
  },
  addAddress: function(){
    var token = wx.getStorageSync('token');
    this.base.request({
      url:'address',
      method: 'POST',
      contentType: 'application/json',
      data: {
        name:'刘中林',
        mobile: '17739650739',
        province: '河南',
        city: '信阳',
        country: '中国',
        detail: '罗山县周党镇桂店村易楼组'
      },
      sCallback: function(res){
        console.log(res);
      }
    })
  },

  pay: function(){
    var token = wx.getStorageSync('token');
    var _this = this;
    this.base.request({
      url:'order',
      method: 'POST',
      data: {
        products:[
          {
            product_id: 1, count:1,
          },
          {
            product_id: 2, count: 1,
          }
        ]
      },
      sCallback: function(res){
        console.log(res);
        if(res.pass==true){
          wx.setStorageSync('order_id', res.order_id);
          _this.getProPay();
        }else{
          console.log('订单创建失败');
        }
      }
    });
  },

  getProPay: function(){
    var order_id = wx.getStorageSync('order_id');
    this.base.request({
      url: 'pay/proPay',
      method: 'POST',
      data: {
        'id': order_id
      },
      sCallback: function(res){
        console.log(res);
        wx.requestPayment({
          timeStamp: res.timeStamp,
          nonceStr: res.nonceStr,
          package: res.package,
          signType: 'MD5',
          paySign: res.paySign,
        });
      }
    })
  },

  jumpTo: function(){
    console.log('test');
    wx.navigateTo({
      url: '/pages/home/home',
    })
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