import { Component } from '@angular/core';
import { UserInfo } from '../../models/UserInfo';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { LoginService } from '../../services/auth/login.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  user: UserInfo = {
    token: '',
    role: '',
    userId: 0,
    userName: '',
    firstName: '',
    lastName: ''
  };
  role: String;
  logeado: boolean;
  constructor(private loginService:LoginService,private router: Router){

  }
  logOut(){
    this.loginService.logout();
    this.router.navigateByUrl("/login");
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Desplazar automáticamente al fragmento si está presente en la URL
      const fragment = this.router.routerState.snapshot.root.fragment;
      if (fragment) {
        document.getElementById(fragment)?.scrollIntoView({ behavior: 'smooth' });
      }
    });
   this.loginService.user.subscribe(data=>{
    this.user=data;
   })
    this.loginService.currentUserRol.subscribe(data => {
      this.role=data;
      console.log(data);
    })
    this.loginService.userLoginOn.subscribe(log=>{
      this.logeado=log;
      
    })

  }
}
