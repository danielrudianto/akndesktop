import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../../../interfaces/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-users-main',
  templateUrl: './users-main.component.html',
  styleUrls: ['./users-main.component.css']
})
export class UsersMainComponent implements OnInit {
  isFetching: boolean = false;
  users: User[] = [];
  records: number = 0;
  pageNumber: number = 1;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.isFetching = true;
    this.userService.getUsers((this.pageNumber - 1) * 25).subscribe((responseData: any) => {
      this.records = responseData.count;
      this.users = responseData.data;
      this.isFetching = false;
    }, (error: any) => {
      this.snackBar.open("Close", error.message, {
        duration: 2000
      });
      this.isFetching = false;
    })
  }

  openAddUser() {

  }

  openEditForm(user: User) {

  }

  openDeleteForm(user: User) {

  }

  openContact(user: User) {
    this.router.navigate(["Settings/Users/" + user.Email])
  }

  updatePage(event: any) {
    this.pageNumber = event.pageIndex + 1;
    this.fetchUsers();
  }

}

@Component({
  selector: 'users-add',
  templateUrl: 'users-add.html'
})
export class UsersAddComponent {
  constructor(
  ) { }
}

@Component({
  selector: 'users-delete',
  templateUrl: 'users-delete.html'
})
export class UsersDeleteComponent {
  constructor(
  ) { }
}

@Component({
  selector: 'users-edit',
  templateUrl: 'users-edit.html'
})
export class UsersEditComponent {
  constructor(
  ) { }
}
