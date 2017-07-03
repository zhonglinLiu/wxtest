// pages/cart/cart.js
import {Cart} from 'cartModel.js';
var cart = new Cart();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [],
    selectCount: 0,
    selectedPrice: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    this._show();
  },

  _show: function(){
    var items = cart.getItemsFromCache();
    var selectCount = this.getSelectedCount(items);
    var selectedPrice = this.getSelectedTotalPrice(items);
    this.setData({
      items: items,
      selectCount: selectCount,
      selectedPrice: selectedPrice/100,
      isAllSelected: cart.isAllSelected(items)
    });
  },

  getSelectedCount(items){
    var count = 0;
    for(var k in items){
      if (items[k].selectStatus){
        count += items[k].count;
      }
    }
   
    return count;
  },

  getSelectedTotalPrice(items){
    var totalPrice = 0;
    var check = 100;
    for(var k in items){
      if (items[k].selectStatus){
        totalPrice += items[k].price*check*items[k].count;
      }
    }
    return totalPrice;
  },
  /**
   * 商品的选择或取消选择
   */
  selectedProduct(event){
    var id = cart.getDataSet(event,'id');
    var item = cart.hasItem(id, this.data.items);
    var status = item.data.selectStatus ? 0 : 1;
    this.data.items[item.index].selectStatus = status;
    this.resetCartData();
  },
  /**
   * 重置商品的选中状态
   */
  resetCartData(){
    var numAndPrice = cart.getSelectedNumAndPrice(this.data.items);
    this.setData({
      items: this.data.items,
      selectCount: numAndPrice.count,
      selectedPrice: numAndPrice.price / 100,
      isAllSelected: cart.isAllSelected(this.data.items)
    });
    wx.setStorageSync(cart.cartCacheKey, this.data.items);
  },
  /**
   * 全选商品或全取消商品
   */
  toggleSelectAll(ev){
    var status = cart.getDataSet(ev,'status') ? 0 : 1;
    for(var k in this.data.items){
      this.data.items[k].selectStatus = status;
    }

    this.resetCartData();
  },

  /**
   * 增加或减少商品数量
   */
  addOrCutCount(ev){
    var id = cart.getDataSet(ev,'id');
    var typ = cart.getDataSet(ev,'type');
    var item = cart.hasItem(id,this.data.items);
    if(typ == 'add'){
      var newCount = cart.addProductCount(item.data);
    }
    else
    {
      var newCount = cart.cutProductCount(item.data);
    }
    this.data.items[item.index].count = newCount;
    this.resetCartData();
    // console.log(this.data.items[item.index])
  },

  deleteOne(ev){
    var id = cart.getDataSet(ev,'id');
    var items = cart.deletes(id);
    this.data.items = items;
    this.resetCartData();
  },

  goToOrder(){
    var data = cart.getItemsFromCache(true);
    data = JSON.stringify(data);
    // console.log(data);
    wx.navigateTo({
      url: '/pages/order/order?data=' + data + '&totalPrice=' + this.data.selectedPrice,
    });
  }
  
})