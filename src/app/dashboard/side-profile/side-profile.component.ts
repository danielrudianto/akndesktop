import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import * as global from '../../global';
import * as uuid from 'uuid';

@Component({
  selector: 'app-side-profile',
  templateUrl: './side-profile.component.html',
  styleUrls: ['./side-profile.component.css']
})
export class SideProfileComponent implements OnInit {
  name: string = "";
  email: string = "";
  imageUrl: string = null;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.authService.getProfile().subscribe((data: any) => {
      this.name = data.FirstName + " " + data.LastName;
      this.email = data.Email;
      this.imageUrl = global.url + "/img/" + data.ImageUrl;
    })
  }

  ngOnInit(): void {
  }

  uploadProfilePicture(event: any) {
    const fileName = event.target.files[0].name;
    
    console.log(event.target.files[0].name = uuid.v1());
    //this.userService.updateProfilePicture(event.target.files[0]).subscribe(data => {
    //}, error => {
    //    this.snackBar.open(error.message, "Close");
    //});;
  }

}
