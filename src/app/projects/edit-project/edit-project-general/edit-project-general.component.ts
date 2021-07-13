import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../../../interfaces/client';
import { SelectClientComponent } from '../../../select-client/select-client.component';
import { EditProjectService } from '../../../services/edit-project.service';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-edit-project-general',
  templateUrl: './edit-project-general.component.html',
  styleUrls: ['./edit-project-general.component.css']
})
export class EditProjectGeneralComponent implements OnInit {
  selectedClient: Client = null;
  isSubmitting: boolean = false;

  generalProjectForm: FormGroup = new FormGroup({
    name: new FormControl("", Validators.required),
    address: new FormControl("", Validators.required),
    client: new FormControl("", Validators.required),
    contractDocument: new FormControl("", Validators.required)
  })

  constructor(
    private editProjectService: EditProjectService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,

  ) { }

  ngOnInit(): void {
    this.generalProjectForm.setValue({
      name: this.editProjectService.codeProject.Name,
      address: this.editProjectService.codeProject.Address,
      client: this.editProjectService.codeProject.Client.Name,
      contractDocument: this.editProjectService.codeProject.DocumentName
    })

    this.selectedClient = this.editProjectService.codeProject.Client;
  }

  openAddClient() {
    const dialog = this.dialog.open(SelectClientComponent, {
      disableClose: true
    })

    dialog.afterClosed().subscribe(data => {
      if (data != null) {
        this.selectedClient = data.Id;
        this.generalProjectForm.patchValue({
          client: data.Name
        })
      }
    })
  }

  submitProject() {
    this.isSubmitting = true;
    this.editProjectService.editGeneralProject({
      Name: this.generalProjectForm.controls.name.value,
      Address: this.generalProjectForm.controls.address.value,
      Document: this.generalProjectForm.controls.contractDocument.value,
      Client: this.selectedClient.Id,
      ProjectId: this.editProjectService.codeProject.Id
    }).subscribe(data => {
      this.isSubmitting = false;
      this.editProjectService.codeProject.Address = this.generalProjectForm.controls.address.value;
      this.editProjectService.codeProject.Name = this.generalProjectForm.controls.address.value;
      this.editProjectService.codeProject.Client = this.selectedClient;
      this.editProjectService.codeProject.DocumentName = this.generalProjectForm.controls.contractDocument.value;

    }, error => {
        this.isSubmitting = false;
        this.snackBar.open(error.message, "Close");
    })
  }

}
