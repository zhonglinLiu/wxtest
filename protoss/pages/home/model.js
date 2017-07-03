
import {Base} from '../../utils/base.js';
class Home extends Base{
  constructor(){
    super();
  }

  getBannerData(id,callback){
    var opts = {
      url:'banner/'+id,
      sCallback:function(res){
        callback && callback(res.items);
      }
    }
    this.request(opts);
  }

  getThemeData(callback){
    var opts = {
      url:'themes',
      sCallback:function(res){
        callback && callback(res);
      }
    }

    this.request(opts);
  }

  getProductsData(callback) {
    var opts = {
      url: 'products/recent',
      sCallback: function(res){
        callback && callback(res);
      }
    }

    this.request(opts);
  }


}

export {Home};