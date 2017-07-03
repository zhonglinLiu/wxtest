
import {Base} from "../../utils/base.js";

class Theme extends Base{
  constructor(){
    super();
  }

  getThemeData(id,callback){
    this.request({
      url:'themes/'+id,
      methos: 'POST',
      sCallback: function(res){
        callback && callback(res);
      }
    })
  }
}

export {Theme}