import {Routes} from '@angular/router';
import {ImageListComponent} from './app/image-list/image-list.component';
import {ImageComponent} from './app/image/image.component';
import {LoginComponent} from './app/login/login.component';
import {NavBarComponent} from './app/nav-bar/nav-bar.component';
import {UploadComponent} from './app/upload/upload.component';
import {SignupComponent} from './app/signup/signup.component';
import {HomeComponent} from './app/home/home.component';
import {OtheruserComponent} from './app/otheruser/otheruser.component';
import {AuthenticationGuard} from './app/services/authentication-guard.service';

export const appRoutes: Routes = [
    { path: 'imagelist/:id', component: ImageListComponent, canActivate: [AuthenticationGuard]},
    { path: 'otheruser/:id', component: OtheruserComponent, canActivate: [AuthenticationGuard]},
    { path: 'upload', component: UploadComponent, canActivate: [AuthenticationGuard]},
    { path: 'image/:id', component: ImageComponent, canActivate: [AuthenticationGuard]},
    { path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard]},
    { path: '', redirectTo: '/imagelist', pathMatch: 'full'},
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignupComponent},
];

