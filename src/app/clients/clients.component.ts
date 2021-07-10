import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Client } from '../interfaces/client';
import { AuthService } from '../services/auth.service';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  records: number = 0;
  pageNumber: number = 1;
  clients: Client[] = [];
  isFetching: boolean = false;

  constructor(
    private clientService: ClientService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.fetchClients();
  }

  fetchClients() {
    this.isFetching = true;
    this.clientService.getClients((this.pageNumber - 1) * 25).subscribe((responseData: any) => {
      this.records = responseData.count;
      this.clients = responseData.data;
      this.isFetching = false;
    }, (error: any) => {
        this.snackBar.open("Close", error.message, {
          duration: 2000
        });
        this.isFetching = false;
    })
  }

  updatePage(event: any)
  {
    this.pageNumber = event.pageIndex + 1;
    this.fetchClients();
  }

  openAddClient() {
    const dialog = this.dialog.open(ClientsAddComponent, {
      disableClose: true
    })

    dialog.afterClosed().subscribe(data => {
      if (data != null && data.error) {
        this.snackBar.open(data.message, "Close", {
          duration: 2000
        });
      } else if (data != null && !data.error) {
        this.fetchClients();
      }
    });
  }

  openEditForm(client: Client) {
    const dialog = this.dialog.open(ClientsEditComponent, {
      disableClose: true,
      data: client
    })

    dialog.afterClosed().subscribe(data => {
      if (data != null && data.error) {
        this.snackBar.open(data.message, "Close", {
          duration: 2000
        });
      } else if (data != null && !data.error) {
        this.fetchClients();
      }
    });
  }

  openDeleteForm(client: Client) {
    const dialog = this.dialog.open(ClientsDeleteComponent, {
      data: client
    })

    dialog.afterClosed().subscribe(data => {
      if (data != null && data.error) {
        this.snackBar.open(data.message, "Close", {
          duration: 2000
        });
      } else if (data != null && !data.error) {
        this.fetchClients();
      }
    })
  }

}

@Component({
  selector: 'clients-add',
  templateUrl: 'clients-add.html'
})

export class ClientsAddComponent {
  isSubmitting: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<ClientsAddComponent>,
    private clientService: ClientService,
    private authService: AuthService
  ) { }

  clientForm: FormGroup = new FormGroup({
    name: new FormControl("", Validators.required),
    address: new FormControl(""),
    city: new FormControl(""),
    phoneNumber: new FormControl(""),
    taxIdentificationNumber: new FormControl("")
  })

  onSubmit() {
    if (this.clientForm.valid) {
      this.isSubmitting = true;
      this.clientService.postClient({
        Name: this.clientForm.controls.name.value,
        Address: this.clientForm.controls.address.value,
        City: this.clientForm.controls.city.value,
        PhoneNumber: this.clientForm.controls.phoneNumber.value,
        TaxIdentificationNumber: (this.clientForm.controls.taxIdentificationNumber.value.length < 15) ? null : this.clientForm.controls.taxIdentificationNumber.value.length,
        CreatedBy: this.authService.getEmail()
      }).subscribe(responseData => {
        this.dialogRef.close({ error: false });
        this.isSubmitting = false;
      }, error => {
          this.dialogRef.close({ error: true, message: error.message });
          this.isSubmitting = false;
      })
    }
  }

  closeDialog() {
    this.dialogRef.close(null);
  }
}

@Component({
  selector: 'clients-edit',
  templateUrl: 'clients-edit.html'
})

export class ClientsEditComponent {
  isSubmitting: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<ClientsAddComponent>,
    private clientService: ClientService,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: Client
  ) { }

  clientForm: FormGroup = new FormGroup({
    name: new FormControl(this.data.Name, Validators.required),
    address: new FormControl(this.data.Address),
    city: new FormControl(this.data.City),
    phoneNumber: new FormControl(this.data.PhoneNumber),
    taxIdentificationNumber: new FormControl(this.data.TaxIdentificationNumber)
  })

  onSubmit() {
    if (this.clientForm.valid) {
      this.isSubmitting = true;
      this.clientService.putClient({
        Id: this.data.Id,
        Name: this.clientForm.controls.name.value,
        Address: this.clientForm.controls.address.value,
        City: this.clientForm.controls.city.value,
        PhoneNumber: this.clientForm.controls.phoneNumber.value,
        TaxIdentificationNumber: (this.clientForm.controls.taxIdentificationNumber.value.length < 15) ? null : this.clientForm.controls.taxIdentificationNumber.value.length,
        CreatedBy: this.authService.getEmail()
      }).subscribe(responseData => {
        this.dialogRef.close({ error: false });
        this.isSubmitting = false;
      }, error => {
          this.dialogRef.close({ error: true, message: error.message });
          this.isSubmitting = false;
      })
    }
  }

  closeDialog() {
    this.dialogRef.close(null);
  }
}

@Component({
  selector: 'clients-delete',
  templateUrl: 'clients-delete.html'
})
export class ClientsDeleteComponent {
  constructor(
    private dialogRef: MatDialogRef<ClientsDeleteComponent>,
    private clientService: ClientService,
    @Inject(MAT_DIALOG_DATA) public data: Client
  ) { }

  isSubmitting: boolean = false;
  confirmation: string = "";

  submit() {
    this.isSubmitting = true;
    this.clientService.deleteClient(this.data.Id!).subscribe(response => {
      this.isSubmitting = false;
      this.dialogRef.close({ error: false });
    }, error => {
        this.isSubmitting = false;
        this.dialogRef.close({ error: true, message: error.message });
    })
  }
}

