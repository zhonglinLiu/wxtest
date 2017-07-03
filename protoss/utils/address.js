import {Base} from 'base.js';
class Address extends Base{
  constructor(){
    super();
  }
  setAddressInfo(addressInfo){
    var address = {
      name: addressInfo.userName,
      mobile: addressInfo.telNumber,
      province: addressInfo.provinceName,
      city: addressInfo.cityName,
      county: addressInfo.countyName
    };
    address.detail = address.province + address.city + address.county + addressInfo.detailInfo;
    return address;
  }
}

export {Address}