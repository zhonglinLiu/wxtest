// pages/home/home.js
import {Home} from './model.js';
var home = new Home;
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
    this._onLoad();
  },

  _onLoad: function(){
    var id = 1;
   
    home.getBannerData(id,(res)=>{
      this.setData({
        'bannerArr':res,
      });
    });

    home.getThemeData((res)=>{
      this.setData({
        'themesArr':res
      });
    });

    home.getProductsData((res)=>{
      this.setData({
        'productsArr':res
      })
    });

  },
  //跳转到商品详情页
  getProductData: function(event){
    var id = home.getDataSet(event,'id');
    wx.navigateTo({
      url: '/pages/product/product?id='+id,
    })
  },
  //跳转到主题页
  getThemeData: function(event){
    var id = home.getDataSet(event, 'id');
    var name = home.getDataSet(event, 'name');
    wx.navigateTo({
      url: '/pages/theme/theme?id='+id+'&name='+name,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '零食商贩',
    })
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