import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { LoginGoogleRequest } from '../../models/LoginGoogleRequest';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-google-login',
  standalone: true,
  imports: [],
  template: `
    <div id="google-button"></div>
  `,
  styleUrls: ['./google-login.component.css']
})
export class GoogleLoginComponent implements OnInit {
  private clientId: string = '973932573847-5oncupn4hbm9sbqsgmi1sqka7iaeggf7.apps.googleusercontent.com'; 
  request:LoginGoogleRequest={
    idToken: ''
  };
  registerError: any;
  constructor( private loginService: LoginService, private router:Router){

  }
  ngOnInit(): void {
    this.initializeGoogleSignIn();
    
  }
  handleCredentialResponse(response: any): void {
    console.log('ID Token de Google:', response.credential);
    this.request.idToken = response.credential;
    this.loginService.logingoogle(this.request).subscribe({
       
      error: (errorData) => {
        console.error(errorData);
        this.registerError=errorData;
        
      },
      complete:()=> {
          this.router.navigateByUrl('/home')
      },

    })
  }

  initializeGoogleSignIn(): void {
    // Carga el script de Google Identity Services
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      google.accounts.id.initialize({
        client_id: this.clientId,
        callback: this.handleCredentialResponse.bind(this),
      });

      // Renderiza el botón de Google Sign-In
      google.accounts.id.renderButton(
        document.getElementById('google-button')!,
        { theme: 'outline', size: 'large' } // Configuración del botón
      );

      // Opcional: Solicita el inicio automático de sesión
      google.accounts.id.prompt();
    };
  }

  
}
