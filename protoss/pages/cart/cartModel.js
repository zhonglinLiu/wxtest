
import {Base} from '../../utils/base.js';

class Cart extends Base{
  constructor(){
    super();
    this.cartCacheKey = 'cart';
  }

  addItem(item,count){
    var cacheItems = this.getItemsFromCache(item.id);
    var hasInfo = this.hasItem(item.id, cacheItems);
    if (hasInfo.index!=-1){
      cacheItems[hasInfo.index].count+=parseInt(count);
    }
    else{
      item.count = count;
      item.selectStatus = 1;
      // console.log(item);
      cacheItems.push(item);
    }
    wx.setStorageSync(this.cartCacheKey, cacheItems);
  }

  /**
   * 获取购物车中的商品
   */
  getItemsFromCache(flog){
    var res = this.getCacheByKey(this.cartCacheKey);
    if(!!flog){
      var arr = [];
      for(var k in res){
        if (res[k].selectStatus == 1){
          arr.push(res[k]);
        }
      }
      return arr;
    }
    if(res){
      return res;
    }
    return [];
  }

  /**
   * 判断商品是否在购物中
   * return 商品信息及index索引
   */
  hasItem(id,CacheItems){
    var res = {index:-1};
    for (var k in CacheItems){
      if (id == CacheItems[k].id){
        var res = {
          index: k,
          data: CacheItems[k],
        };
        return res;
      }
    }
    return res;
  }
  /**
   * 判断是否所有商品都被选中
   */
  isAllSelected(items){
    for(var k in items){
      if (!items[k].selectStatus){
        return 0
      }
    }
    return 1;
  }
  /**
   * 计算选中的商品数量和价格之和
   */
  getSelectedNumAndPrice(items){
    var data = {
      count:0,
      price:0
    };
    var check = 100;
    for(var k in items){
      if (items[k].selectStatus){
        data.count += parseInt(items[k].count);
        data.price += items[k].price*100*items[k].count;
      }
    }

    return data;

  }

  /**
   * 计算购物车商品数
   */
  getCartTotalCount(){
    var items = this.getCacheByKey(this.cartCacheKey);
    var count = 0;
    for(var k in items){
      count += parseInt(items[k].count);
    }
    return count;
  }

  _changeProductCount(item,count){
    var newCount = item.count + count;
    if(newCount<1){
      return item.count;
    }
    return newCount;
  }
  cutProductCount(item){
    return this._changeProductCount(item,-1);
  }
  addProductCount(item){
    return this._changeProductCount(item,1);
  }
  /**
   * 删除购物车的商品
   */
  deletes(ids){
    if(! (ids instanceof Array) ){
      var ids = [ids];
    }
    var items = wx.getStorageSync(this.cartCacheKey);
    for(var i=0;i<ids.length;i++){
      var item = this.hasItem(ids[i],items);
      console.log(item);
      if(item.index!=-1){
        items.splice(item.index,1);
      }
    }
    // wx.setStorageSync(this.cartCacheKey, items);
    return items;
  }
  /**
   * 购物车添加动画
   */
  addToCartAnimate(){
    
  }

}

export {Cart};