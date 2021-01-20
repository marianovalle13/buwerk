export class Constants {
  // Global Settings
  public static APP_NAME = 'Buwerk CMS';
  public static APP_VERSION = '0.0.1';
  public static BASE_URL= '';

  public static IS_ADMIN_LOGIN = false;

  public static API_METHOD_ADMINISTRATORS = '/administrators';
  public static API_METHOD_FILES = '/files';
  public static API_METHOD_NOTIFICATIONS = '/notifications'
  public static API_METHOD_SUBSCRIPTIONS = '/subscriptions'

  //
  public static API_METHOD_USERS = '/users'
  public static API_METHOD_PROFESIONALS = '/profesionals'
  public static API_METHOD_SERVICES = '/services'
  public static API_METHOD_COUNTRIES = '/countries'
  public static API_METHOD_PROVINCES = '/provinces'
  public static API_METHOD_CITIES = '/cities'
  public static API_METHOD_CONVERSATIONS = '/conversations'
  public static API_METHOD_MESSAGES = '/messages'


  // push notifications 
  public static PUSH_SERVER_URL = 'http://sd-1060583-h00012.ferozo.net:3050/api/notifications';
  public static PUSH_APP_ID = '5d48975a93c87426fb9ed49e';

  //

  public static sex = ['Masculino', 'Femenino'];
  public static storage = {
    user: "BUWERK_USER"
  }

  // test

  public static AVAILABILITY_REPEAT = 'REPEAT';
  public static AVAILABILITY_NO_REPEAT = 'NO_REPEAT';
};
