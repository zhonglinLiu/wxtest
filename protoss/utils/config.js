
class Config{
  constructor(){

  }
}
Config.baseRequestUrl = 'http://localhost:9013/';
// Config.baseRequestUrl = 'https://mango.wehere.top/api/v1/';
Config.vaildTokenUrl = Config.baseRequestUrl + 'user/validToken';
// Config.getTokenUrl = Config.baseRequestUrl + 'user/get_token';
Config.getTokenUrl = Config.baseRequestUrl + 'login';
Config.H = 'http://';
export {Config};