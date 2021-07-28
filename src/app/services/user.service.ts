import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as global from '../global';
import { Client } from '../interfaces/client';
import { User, UserForm, UserPosition } from '../interfaces/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
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

  postUser(user: UserForm) {
    return this.http.post(global.url + "/user", user);
  }

  postUserPosition(userPosition: UserPosition) {
    userPosition.CreatedBy = this.authService.getEmail();
    return this.http.post(global.url + "/userPosition", userPosition);
  }

  getUserPositions(email: string, offset: number, limit: number = 25) {
    return this.http.get<any>(global.url + "/userPosition/" + email, {
      params: {
        offset: offset,
        limit: limit
      }
    });
  }

  deletePosition(id: number) {
    return this.http.delete(global.url + "/userPosition/" + id.toString());
  }

  updateProfilePicture(file: File) {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("createdBy", this.authService.getEmail());

    return this.http.post(global.url + "/user/profilePicture", formData)
  }

  updateData(user: UserForm) {
    return this.http.put(global.url + "/user", user);
  }

  deleteData(id: number) {
    return this.http.delete(global.url + "/user/" + id);
  }

  getProfilePicture(email: string) {
    return this.http.get(global.url + "/user/profilePicture", {
      params: {
        email: email
      }
    })
  }
}
