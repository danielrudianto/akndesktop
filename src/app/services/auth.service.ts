import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import * as global from '../global';
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(email: string, password: string) {
    return this.http.post(global.url + '/auth/login', {
      "Email": email,
      "Password": password
    });
  }

  register(email: string, password: string) {
    return this.http.post(global.url + '/auth/register', {
      "Email": email,
      "Password": password
    })
  }

  setSession(authResult: any) {
    const expiresAt = moment().add(authResult.expiration, 'second');
    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  updateToken(token: string) {
    localStorage.setItem('id_token', token);
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");

    this.router.navigate(["/Login"])
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration: any = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  getToken() {
    return localStorage.getItem("id_token");
  }

  getEmail() {
    const decoded: any = jwt_decode(localStorage.getItem("id_token")!.toString());
    return decoded.Email;
  }

  getInfo(token: string = localStorage.getItem("id_token")!.toString()) {
    const decoded: any = jwt_decode(token);
    return {
      Name: decoded.FirstName + " " + decoded.LastName,
      Position: decoded.Position.Position,
      ImageUrl: decoded.ImageUrl,
      ThumbnailUrl: decoded.ThumbnailUrl
    }
  }

  getProfile() {
    return this.http.get(global.url + "/user/profile");
  }

  getUpdatedToken() {
    return this.http.get(global.url + "/auth");
  }

  sendToken(token: string) {
    return this.http.post(global.url + "/auth/sendCloudToken", {
      token: token
    });
  }

  sendDeleteToken(token: string) {
    return this.http.delete(global.url + "/auth/sendCloudToken", {
      params: {
        token: token
      }
    });
  }
}
