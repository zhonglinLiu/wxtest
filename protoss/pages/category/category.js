// pages/category/category.js
import {Category} from './model.js';
var CategoryModel = new Category;
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
    this._load();
  },

  _load: function(){
    CategoryModel.getCategorys((cates)=>{
      this.setData({
        categorys: cates,
      });

      var cid = cates[0].id;
      CategoryModel.getProductsByCid(cid,(res)=>{
        var pData = {
          title: cates[0].name,
          topImgUrl: cates[0].img.url,
          procucts:res,
        }
        this.setData({
          products: pData,
          selectedId: cates[0].id
        });

        this.setProductsToCache(cid,res);
      })

    });
  },
  /**
   * 通过id获取category
   */
  getCategory: function(event){
    var id = CategoryModel.getDataSet(event,'id');
    var name = CategoryModel.getDataSet(event, 'name');
    var image = CategoryModel.getDataSet(event,'image');
    var productsData = this.getProductsFromCache(id);
    // console.log(productsData);
    if (productsData){
      var pData = {
        title: name,
        topImgUrl: image,
        procucts: productsData,
      }

      this.setData({
        products: pData,
        selectedId: id,
      });
    }
    else
    {
      CategoryModel.getProductsByCid(id, (res) => {
        // console.log(res);
        this.setProductsToCache(id,res);
        var pData = {
          title: name,
          topImgUrl: image,
          procucts: res,
        }

        this.setData({
          products: pData,
          selectedId: id,
        });
      });
    }
    
  },

  /**
   * 点击商品跳转到商品详情页
   */
  onProductsItemTap: function(ev){
    // console.log(ev);
    var id = CategoryModel.getDataSet(ev,'id');
    wx.navigateTo({
      url: '/pages/product/product?id='+id,
    });
  },

  /**
   * 从缓存中获取products
   */
  getProductsFromCache(id){
    var data = wx.getStorageSync(id+'');
    if ((new Date).getTime()-data['time'] < 1800000){
      return data['products'];
    }
    wx.removeStorageSync(id+'');
    return false;
  },

  setProductsToCache(id,products){
    if(wx.getStorageSync(id+'')){
      return true;
    }
    var data = {
      products: products,
      time: (new Date).getTime()
    };
    wx.setStorageSync(id+'', data );
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