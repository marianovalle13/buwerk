# Push Notification Ionic 3
## Definición de variables de entorno en constants
```ts
  // PUSH SERVER ENDPOINTS
  public static PUSH_APP_ID ='5cb76e58ab5af1207ea405bb';
  public static PUSH_SERVER_URL ='http://sd-1060583-h00012.ferozo.net:3050/api';
  public static PUSH_SERVER_REGISTER_ID ='/users/ensure';
  public static PUSH_GET_MESSAGE='/message/';
  public static PUSH_ICON_COLOR ='#001C6F';
  public static PUSH_ICON_NAME ='ic_stat_notifications';
```

## Implementación general en Home (solo si está logueado) y Login
```js
    const user = {
      userApp: Constants.ID_USUARIO
      };
    this.notificationProvider.enablePN(user);
```
## Implentación de Foreground notification en App.component
```js
    constructor(public events: Events)
    
    //Show Foreground Notification
    this.events.subscribe('foregroundNotification', (notification) => {
      console.log(notification.title + " - " + notification.message)
      const toast = this.toastCtrl.create({
        message: notification.title + ': ' + notification.message,
        duration: 3000,
        position: 'top'
      });
      toast.onDidDismiss(() => {
        console.log('Cancelar Notificación');
      });
      toast.present();
    });
  }
```
## Configuración del Icono en Android

1) Generar iconos con la plataforma:
http://romannurik.github.io/AndroidAssetStudio/icons-notification.html
2) Poner el nombre del icono que corresponda, debe empezar con ic_stat... (Ej: ic_stat_notifications)
3) Desacargar
4) Pegar en la carpeta res/drawables en las que corresponda según resolución
5) Definir nombre y color en las opciones de push de la siguiente manera:
```js
      android: {
        icon: "ic_stat_notifications",
        iconColor: "#001C6F"
      }
```