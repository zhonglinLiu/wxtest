import {Base} from "../../utils/base.js";

class Category extends Base{
  constructor(){
    super();
  }

  getCategorys(callback){
    this.request({
      url:'category/all',
      method: 'GET',
      sCallback: function(res){
        callback && callback(res);
      }
    })
  }

  getProductsByCid(cid,callback){
    this.request({
      url:'products/by_category?id='+cid,
      method: 'GET',
      sCallback: function(res){
        callback && callback(res);
      }
    });
  }

 
}


export {Category}