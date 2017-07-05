
class Config{
  constructor(){

  }
}
Config.baseRequestUrl = 'http://zerg.com/api/v1/';
Config.vaildTokenUrl = Config.baseRequestUrl + 'user/validToken';
Config.getTokenUrl = Config.baseRequestUrl + 'user/get_token';
Config.H = 'http://';
export {Config};