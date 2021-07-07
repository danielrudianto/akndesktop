import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as global from '../global';
import { Client } from '../interfaces/client';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getUsers(offset: number, limit: number = 25) {
    return this.http.get(global.url + "/user");
  }
}
