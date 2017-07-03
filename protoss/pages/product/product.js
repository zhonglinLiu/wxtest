// pages/product/product.js
import {Product} from "model.js";
import {Cart} from "../cart/cartModel.js";
var product = new Product;
var cart = new Cart;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    productNumArr: [0,1,2,3,4,5,6,7,8,9],
    productNum:1,
    tabIndex:0,
    product: {},
    cartTotalCount:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.id);
    this.data.id = options.id;
    this.__onLoad();
  },

  __onLoad: function () {
    product.getProductData(this.data.id,(res)=>{
      console.log(cart.getCartTotalCount())
      this.setData({
        product:res,
        cartTotalCount: cart.getCartTotalCount()
      });
    })
  },

  changeProductNum: function(e){
    console.log(e.detail);
    var num = e.detail.value;
    this.setData({
      productNum:num,
    });
  },
  //切换选项卡
  changeTab: function(e){
    var index = product.getDataSet(e,'index');
    this.setData({
      tabIndex: index
    });
  },

  /**
   * 添加到购物车
   */
  onAddingtoTopCart: function(e){
    this.addToCart();

  },

  addToCart(){
    var needs = ['id', 'name', 'price', 'stock','main_img_url'];
    var item = {};
    for(var i=0;i<needs.length;i++){
      if(!!this.data.product[needs[i]]){
        item[needs[i]] = this.data.product[needs[i]];
      }
    }
    cart.addItem(item, this.data.productNum);
    this.setData({
      cartTotalCount: this.data.cartTotalCount + parseInt(this.data.productNum)
    });
    // cart.addToCartAnimate()
  },
  jumpToCart(ev){
    wx.switchTab({
      url: '/pages/cart/cart',
    })
  }
})