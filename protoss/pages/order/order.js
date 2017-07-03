// pages/order/order.js
import {Address} from '../../utils/address.js';
var address = new Address;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders:[],
    totalPrice:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(JSON.parse(options.data));
    // this.data.orders = JSON.parse(options.data);
    // this.data.totalPrice = options.totalPrice;
    this.setData({
      orders: JSON.parse(options.data),
      totalPrice: options.totalPrice
    })
  },

  addAddress: function(){
    var _this = this;
    wx.chooseAddress({
      success: function(res){
        console.log(res);
        var addressInfo = address.setAddressInfo(res)
        _this.__bindAddress(addressInfo);
      }
      
    })

  },

  __bindAddress(addressInfo){
    this.setData({
      addressInfo: addressInfo
    })
  }
})