import {Base} from 'base.js';
class Address extends Base{
  constructor(){
    super();
  }
  setAddressInfo(addressInfo){
    var address = {
      name: addressInfo.userName || addressInfo.name,
      mobile: addressInfo.telNumber || addressInfo.mobile,
      province: addressInfo.provinceName || addressInfo.province,
      city: addressInfo.cityName || addressInfo.city,
      county: addressInfo.countyName || addressInfo.county
    };
    address.detail = address.province + address.city + address.county + (addressInfo.detailInfo || addressInfo.detail);
    return address;
    
  }

  getAddress(callback){
    this.request({
      url: 'address',
      method: 'GET',
      sCallback: function(res){
        console.log(res);
        callback && callback(res);
      }
    })
  }
}

export {Address}