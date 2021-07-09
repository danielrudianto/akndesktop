import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as global from '../global';
import { Client } from '../interfaces/client';
import { User } from '../interfaces/user';

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

  getUsersAutocomplete(search: string, excludedUsers: User[]) {
    const excludedIds: number[] = [];
    excludedUsers.forEach(excludedUser => {
      excludedIds.push(excludedUser.Id!);
    })
    return this.http.get<User[]>(global.url + "/user",
      {
        params: {
          search: search,
          excludedUser: JSON.stringify(excludedIds)
        }
      })
  }
}
