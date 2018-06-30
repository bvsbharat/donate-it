import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './shared/guards/auth-guard.service';

import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PostDetailsComponent } from './pages/post-details/post-details.component';
import { EditDetailsComponent } from './pages/edit-details/edit-details.component';


const routes: Routes = [
  { path: 'login', component: SignupComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent,canActivate: [AuthGuard]}, // canActivate: [AuthGuard] 
  { path: 'postDetails/:id', component: PostDetailsComponent,canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent,canActivate: [AuthGuard] },
  { path: 'PostDetails', component: PostDetailsComponent,canActivate: [AuthGuard] },
  { path: 'editDetails/:id', component: EditDetailsComponent,canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full',canActivate: [AuthGuard]},
  { path: '**', redirectTo: 'dashboard',}];


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
export const appRouting: NgModule = RouterModule.forRoot(routes);
