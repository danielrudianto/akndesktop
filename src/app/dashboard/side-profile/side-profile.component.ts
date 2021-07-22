import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import * as global from '../../global';
import * as uuid from 'uuid';
import { UserPosition } from '../../interfaces/user';
import { MatDialog } from '@angular/material/dialog';
import { ProjectUsersComponent } from '../../project-users/project-users.component';

@Component({
  selector: 'app-side-profile',
  templateUrl: './side-profile.component.html',
  styleUrls: ['./side-profile.component.css']
})
export class SideProfileComponent implements OnInit {
  name: string = "";
  email: string = "";
  imageUrl: string | null = null;
  userPositions: UserPosition[] = [];

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.authService.getProfile().subscribe((data: any) => {
      this.name = data.FirstName + " " + data.LastName;
      this.email = data.Email;
      this.imageUrl = (data.ImageUrl == null) ? null : global.url + "/img/" + data.ImageUrl;
    })

    this.authService.getProfile().subscribe((data: any) => {
      this.userPositions = data.UserPosition;
    })
  }

  ngOnInit(): void {
  }

  uploadProfilePicture(event: any) {
    this.userService.updateProfilePicture(event.target.files[0]).subscribe(data => {
    }, error => {
        this.snackBar.open(error.message, "Close");
    });;
  }

  logout() {
    this.authService.logout();
  }

  openProjectUsers() {
    this.dialog.open(ProjectUsersComponent, {
      minWidth: 400
    });
  }

}
