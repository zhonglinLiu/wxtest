
import {Base} from '../../utils/base.js';

class Product extends Base{
  constructor(){
    super();
  }

  getProductData(id,callback){
    this.request({
      url:'products/'+id,
      method: 'GET',
      sCallback: function(res){
        callback && callback(res);
      }
    })
  }
}

export {Product};