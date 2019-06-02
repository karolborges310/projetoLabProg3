import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  register(form) {
    console.log('at register.page.ts registering user '+ form.name)
    this.authService.register(form);
  }

}
