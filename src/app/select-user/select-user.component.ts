import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-select-user',
  templateUrl: './select-user.component.html',
  styleUrls: ['./select-user.component.css']
})
export class SelectUserComponent implements OnInit {
  users: User[] = [];
  obs: Subscription = new Subscription();
  selectUserForm: FormGroup = new FormGroup({
    search: new FormControl()
  });

  constructor(
    private userService: UserService,
    private dialogRef: MatDialogRef<SelectUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User[]
  ) { }

  ngOnInit(): void {
    this.obs = this.selectUserForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe(data => {
        if (data.search != '') {
          this.userService.getUsersAutocomplete(data.search, this.data).subscribe((users: User[]) => {
            this.users = users;
          })
        }
      });
  }

  selectUser(user: User) {
    this.dialogRef.close(user);
  }
}
