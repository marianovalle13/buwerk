import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { IonicStorageModule } from '@ionic/storage';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { Device } from '@ionic-native/device';
import { Push } from '@ionic-native/push';
import { Geolocation } from '@ionic-native/geolocation';

import { NotificationsPage } from '../pages/notifications/notifications';
import { ProfilePage } from '../pages/profile/profile';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ArticlePage } from '../pages/article/article';
import { BasePage } from '../pages/base/base';
import { WelcomePage } from '../pages/welcome/welcome';
import { MessagesPage } from '../pages/messages/messages';
import { PopoverPage } from "../pages/popover/popover";
import { RegisterUserPage } from '../pages/register-user/register-user';
import { UserSelectPage } from '../pages/user-select/user-select';
import { RegisterProfessionalPage } from '../pages/register-professional/register-professional';
import { ServicesPage } from '../pages/services/services';
import { ServicePage } from '../pages/service/service';
import { LocationsPage } from '../pages/locations/locations';
import { LocationPage } from '../pages/location/location';
import { RequestPage } from '../pages/request/request';
import { RequestsPage } from '../pages/requests/requests';
import { RequestInfoPage } from '../pages/request-info/request-info';
import { WorkPage } from '../pages/work/work';
import { WorkStatusPage } from '../pages/work-status/work-status';
import { ChatPage } from '../pages/chat/chat';
import { ServicesMapPage } from '../pages/services-map/services-map';
import { TermsComponent } from '../components/terms/terms';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { FilterPopoverComponent } from '../components/filter-popover/filter-popover';
import { ProvidersSettingsProvider } from '../providers/providers-settings/providers-settings';
import { ServicesProvider } from '../providers/services/services';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

import { CountriesProvider } from '../providers/countries/countries';
import { ProvincesProvider } from '../providers/provinces/provinces';
import { CitiesProvider } from '../providers/cities/cities';
import { UserProfesionalProvider } from '../providers/user-profesional/user-profesional';

import { HTTP } from '@ionic-native/http';
import { Constants } from './app.constants';

// ----- SOCKET IO -----
import { ConversationsProvider } from '../providers/conversations/conversations';
import { MessagesProvider } from '../providers/messages/messages';

import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { ComentsProvider } from '../providers/coments/coments';
import { ActionsProvider } from '../providers/actions/actions';
const config: SocketIoConfig = { url: Constants.SOCKET_BASE_URL, options: {} };

@NgModule({
  declarations: [
    MyApp,
    NotificationsPage,
    ProfilePage,
    HomePage,
    TabsPage,
    LoginPage,
    ServicesPage,
    UserSelectPage,
    RegisterPage,
    RegisterProfessionalPage,
    MessagesPage,
    RegisterUserPage,
    LocationsPage,
    LocationPage,
    RequestsPage,
    WorkStatusPage,
    WorkPage,
    RequestPage,
    RequestInfoPage,
    ArticlePage,
    ServicePage,
    ChatPage,
    BasePage,
    ServicesMapPage,
    WelcomePage,
    PopoverPage,
    FilterPopoverComponent,
    TermsComponent
  ],
  imports: [
    HttpClientModule,
    IonicStorageModule.forRoot(),
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true,
      platforms: {
        ios: {
          backButtonText: ''
        }
      }
    }),
    SocketIoModule.forRoot(config),

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NotificationsPage,
    ProfilePage,
    HomePage,
    TabsPage,
    LoginPage,
    UserSelectPage,
    RegisterPage,
    ServicesPage,
    LocationsPage,
    WorkPage,
    WorkStatusPage,
    ServicePage,
    RequestsPage,
    RequestPage,
    ChatPage,
    ServicesMapPage,
    RequestInfoPage,
    ArticlePage,
    RegisterProfessionalPage,
    RegisterUserPage,
    MessagesPage,
    LocationPage,
    BasePage,
    WelcomePage,
    PopoverPage,
    FilterPopoverComponent,
    TermsComponent
  ],
  providers: [
    Geolocation,
    HTTP,
    InAppBrowser,
    YoutubeVideoPlayer,
    StatusBar,
    SplashScreen,
    Device,
    Push,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProvidersSettingsProvider,
    ServicesProvider,
    File,
    FileTransfer,
    FilePath,
    Camera,
    CountriesProvider,
    ProvincesProvider,
    CitiesProvider,
    UserProfesionalProvider,
    ConversationsProvider,
    MessagesProvider,
    ComentsProvider,
    ActionsProvider
  ]
})
export class AppModule {}
