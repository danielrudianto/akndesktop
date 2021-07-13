import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../../interfaces/user';
import { SelectUserComponent } from '../../../select-user/select-user.component';
import { EditProjectService } from '../../../services/edit-project.service';

@Component({
  selector: 'app-edit-project-user',
  templateUrl: './edit-project-user.component.html',
  styleUrls: ['./edit-project-user.component.css']
})
export class EditProjectUserComponent implements OnInit {
  users: User[] = [];
  isSubmitting: boolean = false;

  constructor(
    private editProjectService: EditProjectService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const projectUsers = this.editProjectService.codeProject.CodeProjectUser;
    projectUsers.forEach(projectUser => {
      this.users.push(projectUser.User!);
    })
  }

  openAddUser() {
    const dialog = this.dialog.open(SelectUserComponent, {
      data: this.users
    })

    dialog.afterClosed().subscribe(data => {
      if (data != null) {
        this.users.push(data);
      }
    })
  }

  deleteUser(user: User) {
    this.users.splice(this.users.findIndex(x => x.Id == user.Id), 1);
  }

  submitForm() {
    this.isSubmitting = true;
    this.editProjectService.editUserProject({
      users: this.users,
      projectId: this.editProjectService.codeProject.Id
    }).subscribe(data => {
      this.isSubmitting = false;
      this.editProjectService.codeProject.CodeProjectUser = data;
    }, error => {
        this.isSubmitting = false;
        this.snackBar.open(error.message, "Close");
    })
  }

}
