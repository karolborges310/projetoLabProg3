import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
 
const TOKEN_KEY = 'auth-token';
 
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
 
  authenticationState = new BehaviorSubject(false);
 
  constructor(private storage: Storage, private plt: Platform, private httpClient: HttpClient) { 
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }
 
  checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(false);
      }
    })
  }
 
  login(form) {
    this.httpClient.post('http://localhost:3000/users/login',{
    email: form.email,
    password: form.password
})
  .subscribe(
    res=>{
      console.log('Login OK')
      console.log(res);
      return this.storage.set(TOKEN_KEY, 'Bearer 1234567').then(() => {
        this.authenticationState.next(true);
      });
    },
    err=>{
      console.log(err)
      this.authenticationState.next(false);
      console.log('Error ocurred at login')
    }
  );

    /*return this.storage.set(TOKEN_KEY, 'Bearer 1234567').then(() => {
      this.authenticationState.next(true);
    });*/
  }
 
  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  register(form){

    console.log('at authentication.service.ts registering user '+ form.name)
    this.httpClient.post('http://localhost:3000/users/register',{
    name: form.name,
    email: form.email,
    password: form.password
})
  .subscribe(
    res=>{console.log(res);},
    err=>{
      console.log('Error ocurred at register')
    }
  );

  return this.storage.set(TOKEN_KEY, 'Bearer 1234567').then(() => {
    this.authenticationState.next(true);
  });

  }
 
  isAuthenticated() {
    return this.authenticationState.value;
  }
 
}
