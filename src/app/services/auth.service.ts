import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { pipe, switchMap, tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

//import { User, CreateUserDTO } from '../models/user.mode';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.mode';

import { TokenService } from './token.service';

import { environment } from "../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.API_URL}/api/auth`;
  private user = new BehaviorSubject<User | null>(null);
  user$ = this.user.asObservable();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  login(email: string, password: string){
    return this.http.post<Auth>(`${this.apiUrl}/login`, {email, password})
    .pipe(
      tap(response => {
        this.tokenService.saveToken(response.access_token)
      })
    )
  }

  profile(){
    //const headers = new HttpHeaders();
    //headers.set("Authorization", `Bearer ${token}`);
    return this.http.get<User>(`${this.apiUrl}/profile`,{
      //headers: {
        //Authorization: `Bearer ${token}`,
        //"content-type": "aplication/json"
      //}
    })
    .pipe(
      tap(user => this.user.next(user))
    );
  }

  loginAndGet(email: string, password:string){
    return this.login(email, password)
    .pipe(
      switchMap(() => this.profile())
    )
  }

  logOut(){
    this.tokenService.removeToken();
  }
}
