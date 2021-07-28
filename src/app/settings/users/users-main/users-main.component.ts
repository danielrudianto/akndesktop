import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User, UserPosition } from '../../../interfaces/user';
import { SocketService } from '../../../services/socket.service';
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
    private router: Router,
    private dialog: MatDialog,
    private socketService: SocketService
  ) { }

  ngOnInit(): void {
    this.fetchUsers();

    this.socketService.socket.on("userEdit", () => {
      this.fetchUsers();
    });

    this.socketService.socket.on("userDelete", () => {
      this.fetchUsers();
    });
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
    const dialog = this.dialog.open(UsersAddComponent, {
      disableClose: true
    })

    dialog.afterClosed().subscribe(data => {
      if (data != null) {
        this.fetchUsers();
      }
    })
  }

  openEditForm(user: User) {
    this.dialog.open(UsersEditComponent, {
      disableClose: true,
      data: user
    }) 
  }

  openDeleteForm(user: User) {
    this.dialog.open(UsersDeleteComponent, {
      disableClose: false,
      data: user
    })
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
  isSubmitting: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<UsersAddComponent>,
    private usersService: UserService
  ) { }

  usersForm: FormGroup = new FormGroup({
    FirstName: new FormControl("", Validators.required),
    LastName: new FormControl("", Validators.required),
    Email: new FormControl("", [Validators.required, Validators.email]),
    Position: new FormControl("", Validators.required),
  });

  Positions: any[] = [
    {
      Position: 1,
      Name: "Site Engineer"
    },
    {
      Position: 2,
      Name: "Site Manager"
    },
    {
      Position: 3,
      Name: "Project Manager"
    },
    {
      Position: 4,
      Name: "Director"
    },
  ]

  closeDialog() {
    this.dialogRef.close(null);
  }

  onSubmit() {
    this.isSubmitting = true;
    this.usersService.postUser({
      FirstName: this.usersForm.controls.FirstName.value,
      LastName: this.usersForm.controls.LastName.value,
      Position: this.Positions.filter(x => x.Name == this.usersForm.controls.Position.value)[0].Position,
      Email: this.usersForm.controls.Email.value,
      IsActive: true
    }).subscribe(response => {
      this.isSubmitting = false;
      this.dialogRef.close({ error: false });
    }, error => {
        this.isSubmitting = false;
        console.warn(error);
    })
  }
}

@Component({
  selector: 'users-delete',
  templateUrl: 'users-delete.html'
})
export class UsersDeleteComponent {
  confirmation: string = "";
  isSubmitting: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: User,
    private dialogRef: MatDialogRef<UsersDeleteComponent>,
    private userService: UserService
  ) {}

  submit() {
    this.isSubmitting = true;
    this.userService.deleteData(this.data.Id).subscribe(() => {
      this.isSubmitting = false;
      this.dialogRef.close();
    }, error => {
        this.isSubmitting = false;
    })
  }
}

@Component({
  selector: 'users-edit',
  templateUrl: 'users-edit.html'
})
export class UsersEditComponent {
  isSubmitting: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: User,
    private dialogRef: MatDialogRef<UsersEditComponent>,
    private userService: UserService
  ) { }

  usersForm: FormGroup = new FormGroup({
    FirstName: new FormControl(this.data.FirstName, Validators.required),
    LastName: new FormControl(this.data.LastName, Validators.required),
    Email: new FormControl(this.data.Email, [Validators.required, Validators.email]),
  });

  closeDialog() {
    this.dialogRef.close(null);
  }

  onSubmit() {
    this.isSubmitting = true;
    const user = {
      FirstName: this.usersForm.controls.FirstName.value,
      LastName: this.usersForm.controls.LastName.value,
      Email: this.usersForm.controls.Email.value,
      IsActive: true,
      Position: this.data.UserPosition![0].Position,
      Id: this.data.Id
    }
    this.userService.updateData(user).subscribe(() => {
      this.isSubmitting = false;
      this.dialogRef.close();
    }, error => {
       this.isSubmitting = false;
    })
  }
}
