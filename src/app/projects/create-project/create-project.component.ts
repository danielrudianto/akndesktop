import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CodeProjectForm, TaskForm, TaskFormGroup } from '../../interfaces/project';
import { User } from '../../interfaces/user';
import { SelectClientComponent } from '../../select-client/select-client.component';
import { SelectUserComponent } from '../../select-user/select-user.component';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  tasks: TaskFormGroup[] = [];
  users: User[] = [];
  documents: File[] = [];
  selectedClient: number = 0;
  isSubmitting: boolean = false;

  generalProjectForm: FormGroup = new FormGroup({
    name: new FormControl("", Validators.required),
    address: new FormControl("", Validators.required),
    client: new FormControl(null, Validators.required),
    contractDocument: new FormControl()
  })

  constructor(
    private dialog: MatDialog,
    private projectService: ProjectService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem("projectUsers") != undefined) {
      this.users = JSON.parse(localStorage.getItem("projectUsers")!)
    }

    if (localStorage.getItem("projectGeneral") != undefined) {
      const data = JSON.parse(localStorage.getItem("projectGeneral")!);
      this.generalProjectForm.setValue({
        name: data.name,
        address: data.address,
        client: data.client,
        contractDocument: data.contractDocument
      })
    }

    if (localStorage.getItem("projectClient") != undefined) {
      this.selectedClient = parseInt(localStorage.getItem("projectClient")!.toString());
    }

    this.generalProjectForm.valueChanges.subscribe(data => {
      localStorage.setItem("projectGeneral", JSON.stringify(data));
    })
  }

  openAddClient() {
    const dialog = this.dialog.open(SelectClientComponent);
    dialog.afterClosed().subscribe(data => {
      if (data != undefined) {
        this.generalProjectForm.get("client")!.setValue(data.Name);
        this.selectedClient = data.Id;
        localStorage.setItem("projectClient", this.selectedClient.toString());
      }
    })
  }

  updateTask(event: any) {
    this.tasks = event as TaskFormGroup[]
  }

  openAddUser() {
    const dialog = this.dialog.open(SelectUserComponent, {
      disableClose: false,
      data: this.users
    })

    dialog.afterClosed().subscribe(data => {
      if (data != undefined) {
        this.users.push(data as User);
        localStorage.setItem("projectUsers", JSON.stringify(this.users));
      }
    })
  }

  deleteUser(user: User) {
    this.users.splice(this.users.findIndex(x => x.Id == user.Id), 1);
    localStorage.setItem("projectUsers", JSON.stringify(this.users));
  }

  deleteDocument(file: File) {
    this.documents.splice(this.documents.findIndex(x => x == file), 1);
  }

  addFile(event: any) {
    if (event.target.files.length > 0) {
      this.documents.push(event.target.files[0] as File);
    }
  }

  submitProject() {
    const project: CodeProjectForm = {
      Name: this.generalProjectForm.controls.name.value,
      Address: this.generalProjectForm.controls.address.value,
      ClientId: this.selectedClient,
      DocumentName: this.generalProjectForm.controls.contractDocument.value.toString(),
      IsCompleted: false,
      IsDelete: false,
      Tasks: this.tasks,
      Users: []
    }

    this.users.forEach(user => {
      project.Users.push({
        UserId: user.Id!,
      })
    })

    this.isSubmitting = true;

    this.projectService.submitProject(project).subscribe((data: any) => {
      const projectId = data.Id;
      if (this.documents.length > 0) {
        this.projectService.uploadDocuments(this.documents, projectId).subscribe(() => {
          this.isSubmitting = false;
        }, error => {
          this.snackBar.open(error.message, "Close")
        })
      } else {
        this.isSubmitting = false;
      }

      localStorage.removeItem("projectGeneral");
      localStorage.removeItem("projectTasks");
      localStorage.removeItem("projectUsers");
      localStorage.removeItem("projectClient");

      this.router.navigate(["/Projects"]);

    }, error => {
      this.snackBar.open(error.message, "Close");
    })
  }
}
