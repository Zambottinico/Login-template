import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterUserComponent } from './components/auth/register-user/register-user.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {path:"login", component:LoginComponent},
    {path:"register", component:RegisterUserComponent},
    {path:"home",component:HomeComponent},
];
