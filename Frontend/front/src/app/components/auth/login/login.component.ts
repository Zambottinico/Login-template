import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoginRequest } from '../../../services/auth/loginRequest';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LoginService } from '../../../services/auth/login.service';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {GoogleLoginComponent} from '../../google-login/google-login.component'
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    RouterLink,
    GoogleLoginComponent
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Input() redirect:boolean=true;
  @Output() loginEvent=new EventEmitter<boolean>();
  loginError:string="";
  loginForm: FormGroup<{ username: FormControl<string>; password: FormControl<string>; }>;
  
  constructor(private formBuilder:FormBuilder, private router:Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username:['',[Validators.required]],
      password: ['',Validators.required],
    })
  }

  get email(){
    return this.loginForm.controls.username;
  }

  get password()
  {
    return this.loginForm.controls.password;
  }

  login(){
    if(this.loginForm.valid){
      this.loginError="";
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        
        error: (errorData) => {
          console.error(errorData);
          this.loginError=errorData;
          
        },
        complete: () => {
          
          if (this.redirect) {
            this.router.navigateByUrl('/home');
          }else{
            this.loginEvent.emit(true);
          }
          this.loginForm.reset();
        }
      })

    }
    else{
      this.loginForm.markAllAsTouched();
      
    }
  }

}
