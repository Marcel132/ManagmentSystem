import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { MainComponent } from './components/main/main.component';
import { SettingsComponent } from './components/common/settings/settings.component';
import { HomeComponent } from './components/common/home/home.component';
import { ResourcesComponent } from './components/common/resources/resources.component';
import { AdminComponent } from './components/admin/admin.component';

export const routes: Routes = [
  {path: '', redirectTo: 'signup', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'home', component: MainComponent, children: [
    {path: '', component: HomeComponent},
    {path: 'resources', component: ResourcesComponent},
  ]},
  {path: 'settings', component: MainComponent, children: [
    {path: '', component: SettingsComponent}
  ]},
  {path: 'admin', component: AdminComponent, children: [
    {path: '', component: AdminComponent},
  ]},
];
