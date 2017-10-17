import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule} from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { ImageListComponent } from './image-list/image-list.component';
import { ImageComponent } from './image/image.component';
import { UploadComponent } from './upload/upload.component';

import { ImageService } from './services/image.service';
import { appRoutes} from '../routes';
import { AuthenticationGuard } from './services/authentication-guard.service';
import {AuthenticationService} from './services/authentication.service';

import {environment} from '../environments/environment';
import {UploadService} from './services/upload.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
<<<<<<< HEAD
import { MatButtonModule, MatMenuModule, MatToolbarModule, MatIconModule, MatCardModule, MatButtonToggleModule } from '@angular/material';
||||||| merged common ancestors
import { MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MatIconModule, MatCardModule, MatButtonToggleModule } from '@angular/material';
=======
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatButtonToggleModule } from '@angular/material';
>>>>>>> 7c29e23fe64c0be1f6e99294ddd6cd57bc5c01ed

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NavBarComponent,
    HomeComponent,
    UserprofileComponent,
    ImageListComponent,
    ImageComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonToggleModule
  ],

  providers: [AuthenticationService,
    AuthenticationGuard,
    ImageService,
    UploadService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
