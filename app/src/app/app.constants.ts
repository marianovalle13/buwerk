export class Constants {
  public static APP_VERSION = '0.0.12';
  
  // public static API_BASE_URL = 'http://localhost:3089/api';
  // public static FILES_BASE_URL = 'http://localhost:3089/files';
  // public static SOCKET_BASE_URL = 'http://localhost:10089';

  // public static API_BASE_URL = 'http://172.20.16.111:3089/api';
  // public static FILES_BASE_URL = 'http://172.20.16.111:3089/files';
  // public static SOCKET_BASE_URL = 'http://172.20.16.111:10089';
  
  public static API_BASE_URL = 'http://vps-1060583-x.dattaweb.com:3089/api';
  public static FILES_BASE_URL = 'http://vps-1060583-x.dattaweb.com:3089/files';
  public static SOCKET_BASE_URL = 'http://vps-1060583-x.dattaweb.com:10089';


  public static API_METHOD_FILE_UPLOAD = '/files/upload';
  public static DEFAULT_AVATAR_NO_IMAGE = "assets/imgs/avatar.png";
  public static DEFAULT_CAR_NO_IMAGE = "assets/imgs/noimage.png";
  public static DEFAULT_SPONSOR_IMAGE = "assets/imgs/header.png";

  public static API_METHOD_ARTICLES = '/articles';
  public static API_METHOD_MP = '/mp';
  public static API_METHOD_SUBSCRIPTIONS = '/subscriptions';
  public static API_METHOD_NOTIFICATIONS = '/notifications';

  //

  public static API_METHOD_USERS = '/users';
  public static API_METHOD_USER = '/users';
  public static API_METHOD_USERPRO = '/userProfesionals';
  public static API_METHOD_PROFESIONAL = '/profesionals';
  public static API_METHOD_SERVICES = '/services';
  public static API_METHOD_CONVERSATIONS = '/conversations';
  public static API_METHOD_MESSAGES = '/messages';

  public static API_METHOD_COUNTRIES = '/countries';
  public static API_METHOD_PROVINCES = '/provinces';
  public static API_METHOD_CITIES = '/cities';

  public static API_METHOD_COMENTS = '/profesionalComents';

  //

  public static API_METHOD_SETTINGS = '/settings';

  public static CATEGORIES = [
  ];
  public static CATEGORY = [
  ];

  public static storage = {
    user: 'buwerk_user',
    action: 'action',
    accessToken: "accessToken",
  };

  // PUSH SERVER ENDPOINTS
  public static PUSH_APP_ID ='5df0f3ae3a0b911154dd31dc';
  public static PUSH_SERVER_URL ='http://sd-1060583-h00012.ferozo.net:3050/api';
  public static PUSH_SERVER_REGISTER_ID ='/users/ensure';
  public static PUSH_GET_MESSAGE='/message/';
  public static PUSH_ICON_COLOR ='#001C6F';
  public static PUSH_ICON_NAME ='ic_stat_notifications';

  //PAYLOAD NOTIFICATIONS
    public static actions = {
    message: 'message',
    user_end_service: 'user_end_service',
    map: 'map',
    // conversation: {
    //   key: 'conversation',
    //   text: 'text',
    //   image: 'image'
    // }
  };
}
