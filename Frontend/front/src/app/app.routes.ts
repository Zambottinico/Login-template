import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterUserComponent } from './components/auth/register-user/register-user.component';
import { HomeComponent } from './components/home/home.component';
import { validatorLoginGuard } from './guards/validator-login.guard';
import { validatorLoginOn } from './guards/validator-login-on.guard';

export const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    {path:"login", component:LoginComponent, canActivate:[validatorLoginOn]},
    {path:"register", component:RegisterUserComponent, canActivate:[validatorLoginOn]},
    {path:"home",component:HomeComponent,canActivate:[validatorLoginGuard]},
];
