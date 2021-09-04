import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';


@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  constructor(
    private angularFireMessaging: AngularFireMessaging,
    private authService: AuthService
  ) { }

  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token: any) => {
        this.authService.sendToken(token).subscribe(data => {
          console.log('Token already sent');
        })
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }

  deleteToken() {
    this.angularFireMessaging.getToken.subscribe(
      (token: any) => {
        this.authService.sendDeleteToken(token).subscribe(data => {
          console.log("Token deleted");
        })
      }
    );
  }

  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload: any) => {
        console.log("new message received. ", payload);
      })
  }
}
