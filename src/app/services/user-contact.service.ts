import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as global from '../global';
import { UserContact } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserContactService {

  constructor(
    private http: HttpClient
  ) { }

  getContacts(email: string, offset: number, limit: number = 25) {
    return this.http.get(global.url + "/userContact", {
      params: {
        email: email,
        offset: offset,
        limit: limit
      }
    })
  }

  postContact(userContact: any) {
    return this.http.post(global.url + "/userContact", userContact);
  }

  deleteContact(userContact: number) {
    return this.http.delete(global.url + "/userContact/" + userContact);
  }
}
