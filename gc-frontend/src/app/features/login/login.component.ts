import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { ElementRef } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  router: Router = new Router();

  authService = inject(AuthService);
  elementRef = inject(ElementRef);
  loginService = inject(LoginService);

  emailAddress = signal('');
  password = signal('');
  elementId = this.elementRef.nativeElement.id;

  showLoginAlert = signal(false);

  async login() {
    try {
      await this.authService.login(this.emailAddress(), this.password());
      this.showLoginAlert.set(true);
    } catch (error) {
      console.error('Error during login: ' + error);
    }

    // try {
    //   await this.loginService.checkCredentials(this.emailAddress(), this.password())
    //   if(this.authService.isAuthenticated()){
    //     this.router.navigateByUrl('/counters');
    //   }
    //   else{
    //     const loginAlert = document.getElementById("loginAlert")
    //     loginAlert!.style.display = "unset"
    //   }
    // } catch (error) {
    //   console.error("Error during login: " + error)
    // }
  }
}
