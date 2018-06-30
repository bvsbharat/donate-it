import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { environment } from './../environments/environment';
import { MomentModule } from 'angular2-moment';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { SignupComponent } from './pages/signup/signup.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AuthGuard } from './shared/guards/auth-guard.service';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { WidgetContainerComponent } from './shared/widget-container/widget-container.component';
import { NewPostComponent } from './shared/new-post/new-post.component';
import { PostCardComponent } from './shared/post-card/post-card.component';
import { MyProfileCardComponent } from './shared/my-profile-card/my-profile-card.component';
import { ProfileWidgetContainerComponent } from './shared/profile-widget-container/profile-widget-container.component';

import { CommonService } from './services/common.service';
import { UserService } from './services/user.service';
import { PostService } from './services/post.service';

import {KeysPipe,ReversePipe,TruncatePipe} from './pipes/pipe';
import { PostDetailsComponent } from './pages/post-details/post-details.component';
import { EditDetailsComponent } from './pages/edit-details/edit-details.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    DashboardComponent,
    WidgetContainerComponent,
    NewPostComponent,
    PostCardComponent,
    MyProfileCardComponent,
    ProfileWidgetContainerComponent,
    KeysPipe,
    ReversePipe,
    TruncatePipe,
    PostDetailsComponent,
    EditDetailsComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    RouterModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    MomentModule
  ],
  providers: [
    AuthGuard,
    CommonService,
    UserService,
    PostService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
