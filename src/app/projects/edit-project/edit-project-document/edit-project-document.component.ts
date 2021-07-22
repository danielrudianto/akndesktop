import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileSaverService } from 'ngx-filesaver';
import { CodeProjectDocument } from '../../../interfaces/project';
import { RenameFileComponent } from '../../../rename-file/rename-file.component';
import { AuthService } from '../../../services/auth.service';
import { EditProjectService } from '../../../services/edit-project.service';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-edit-project-document',
  templateUrl: './edit-project-document.component.html',
  styleUrls: ['./edit-project-document.component.css']
})

export class EditProjectDocumentComponent implements OnInit {
  newDocuments: File[] = [];
  documents: CodeProjectDocument[] = [];
  isSubmitting: boolean = false;

  isDeleting: boolean = false;
  isDownloading: boolean = false;

  constructor(
    private editProjectService: EditProjectService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private projectService: ProjectService,
    private _FileSaverService: FileSaverService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.documents = this.editProjectService.codeProject.CodeProjectDocument;
  }

  addNewFile(event: any) {
    if (event.target.files.length > 0) {
      this.newDocuments.push(event.target.files[0] as File);
      console.log(this.newDocuments);
    }
  }

  deleteNewDocument(i: number) {
    this.newDocuments.splice(i, 1);
  }

  uploadDocuments() {
    this.isSubmitting = true;
    const formData = new FormData();
    formData.append("projectId", this.editProjectService.codeProject.Id!.toString());
    let i = 0;
    this.newDocuments.forEach(document => {
      formData.append("file[" + i + "]", document, document.name);
    })

    formData.append("fileLength", this.newDocuments.length.toString());
    formData.append("createdBy", this.authService.getEmail());
    this.editProjectService.uploadDocuments(formData).subscribe((data: any) => {
      this.isSubmitting = false;
      this.newDocuments = [];
      this.fetchDocuments();
    }, error => {
        this.isSubmitting = false;
        this.snackBar.open(error.message, "Close");
    })
  }

  fetchDocuments() {
    this.projectService.getDocuments(this.editProjectService.codeProject.Id!).subscribe((data: any) => {
      this.documents = data;
    })
  }

  deleteDocument(i: number) {
    this.isDeleting = true;
    this.projectService.deleteDocument(this.documents[i].Id!).subscribe(data => {
      this.documents.splice(i, 1);
      this.isDeleting = false;
    }, error => {
        this.snackBar.open(error.message, "Close");
        this.isDeleting = false;
    })
  }

  downloadDocument(i: number) {
    this.isDownloading = true;
    this.projectService.downloadDocument(this.documents[i].Url).subscribe(data => {
      this._FileSaverService.save((<any>data), this.documents[i].Name);
      this.isDownloading = false;
    }, error => {
        console.log(error);
        this.snackBar.open(error.message, "Close");
        this.isDownloading = false;
    })
  }

  renameDocument(i: number) {
    const dialog = this.dialog.open(RenameFileComponent, {
      data: {
        Id: this.documents[i].Id,
        Name: this.documents[i].Name
      }
    });
  }
}
