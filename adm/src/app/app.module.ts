import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { UpdateHeaderService } from './services/update-header.service';

// Vendor
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LazyLoadImageModule } from 'ng-lazyload-image';
// import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
// import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core'

// pipes
import { ApplicationPipes } from './application.pipes';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SidemenuComponent } from './shared/sidemenu/sidemenu.component';
import { TopmenuComponent } from './shared/topmenu/topmenu.component';
import { BasesComponent } from './bases/bases.component';
import { BaseComponent } from './base/base.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { NotificationComponent } from './notification/notification.component';
import { UsersComponent } from './users/users.component';
import { ProfesionalsComponent } from './profesionals/profesionals.component';
import { WorkServicesComponent } from './work-services/work-services.component';
import { UserComponent } from './user/user.component';
import { ProfesionalComponent } from './profesional/profesional.component';
import { ChatsComponent } from './chats/chats.component';
import { ChatComponent } from './chat/chat.component';
import { PlacesComponent } from './places/places.component';


// import { CKEditorModule } from 'ng2-ckeditor';


const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'profesional/:id', component: ProfesionalComponent },
  { path: 'profesionals', component: ProfesionalsComponent },
  { path: 'user/:id', component: UserComponent },
  { path: 'users', component: UsersComponent },
  { path: 'services', component: WorkServicesComponent },
  { path: 'places', component: PlacesComponent },
  { path: 'chats', component: ChatsComponent },
  { path: 'chat/:id', component: ChatComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    BasesComponent,
    LoginComponent,
    SidemenuComponent,
    TopmenuComponent,
    NotificationsComponent,
    NotificationComponent,
    UsersComponent,
    ProfesionalsComponent,
    WorkServicesComponent,
    UserComponent,
    ProfesionalComponent,
    PlacesComponent,
    ChatsComponent,
    ChatComponent,
  ],
  imports: [
    // CKEditorModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    ApplicationPipes,
    BrowserModule,
    LazyLoadImageModule,
    // AngularFontAwesomeModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyB2i8G0uNcfJOE-OmE4_MYtkWaBUunT9Y4',
    //   language: 'en',
    //   libraries: ['geometry', 'places']
    // }),
    ToastModule.forRoot(),
  ],
  providers: [UpdateHeaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
