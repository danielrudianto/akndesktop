import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserContact } from '../../../../interfaces/user';
import { UserContactService } from '../../../../services/user-contact.service';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  @Input() email: string = "";

  contacts: UserContact[] = [];
  isFetching: boolean = false;
  pageNumber: number = 1;
  records: number = 0;

  constructor(
    private userContactService: UserContactService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.fetchContact();
  }

  fetchContact() {
    this.userContactService.getContacts(this.email, (this.pageNumber - 1 ) * 25).subscribe((responseData: any) => {
      this.contacts = responseData.data;
      this.records = responseData.count;
    })
  }

  openAddContact() {
    const dialog = this.dialog.open(ContactAddComponent, {
      disableClose: true,
      data: this.email
    })

    dialog.afterClosed().subscribe(data => {
      if (data != null && !data.error) {
        this.fetchContact();
      } else if (data != null && data.error) {
        this.snackBar.open(data.message, "Close", {
          duration: 2000
        })
      }
    })
  }

  openDeleteContact(userContact: UserContact) {
    const dialog = this.dialog.open(ContactDeleteComponent, {
      data: userContact
    })

    dialog.afterClosed().subscribe(data => {
      if (data != null && !data.error) {
        this.fetchContact();
      } else if (data != null && data.error) {
        this.snackBar.open(data.message, "Close", {
          duration: 2000
        })
      }
    })
  }

  openEditContact(userContact: UserContact) {
    const dialog = this.dialog.open(ContactEditComponent, {
      disableClose: true,
      data: userContact
    })

    dialog.afterClosed().subscribe(data => {
      if (data != null && !data.error) {
        this.fetchContact();
      } else if (data != null && data.error) {
        this.snackBar.open(data.message, "Close", {
          duration: 2000
        })
      }
    })
  }

  updatePage(event: any) {
    this.pageNumber = event.pageIndex + 1;
    this.fetchContact();
  }

}

@Component({
  selector: 'contact-add',
  templateUrl: 'contact-add.html'
})

export class ContactAddComponent {
  isSubmitting: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<ContactAddComponent>,
    private userContactService: UserContactService,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) { }

  contactForm: FormGroup = new FormGroup({
    phoneNumber: new FormControl("", Validators.required),
    whatsappAvailable: new FormControl()
  })
  onSubmit() {
    this.isSubmitting = true;
    this.userContactService.postContact({
      PhoneNumber: this.contactForm.controls.phoneNumber.value,
      WhatsappAvailable: (this.contactForm.controls.whatsappAvailable.value) ? true : false,
      UserEmail: this.data
    }).subscribe(data => {
      this.dialogRef.close({ error: false });
    }, error => {
        this.dialogRef.close({ error: true, message: error.message})
    })
  }

  closeDialog() {
    this.dialogRef.close(null);
  }
}

@Component({
  selector: 'contact-edit',
  templateUrl: 'contact-edit.html'
})

export class ContactEditComponent {
  isSubmitting: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<ContactEditComponent>,
    private userContactService: UserContactService,
    @Inject(MAT_DIALOG_DATA) public data: UserContact
  ) { }

  contactForm: FormGroup = new FormGroup({
    phoneNumber: new FormControl(this.data.PhoneNumber, Validators.required),
    whatsappAvailable: new FormControl(this.data.WhatsappAvailable)
  })

  onSubmit() {
    this.isSubmitting = true;
    this.userContactService.postContact({
      PhoneNumber: this.contactForm.controls.phoneNumber.value,
      WhatsappAvailable: (this.contactForm.controls.whatsappAvailable.value) ? true : false,
      UserEmail: this.data
    }).subscribe(data => {
      this.dialogRef.close({ error: false });
    }, error => {
      this.dialogRef.close({ error: true, message: error.message })
    })
  }

  closeDialog() {
    this.dialogRef.close(null);
  }
}

@Component({
  selector: 'contact-delete',
  templateUrl: 'contact-delete.html'
})

export class ContactDeleteComponent {
  constructor(
    private dialogRef: MatDialogRef<ContactAddComponent>,
    private userContactService: UserContactService,
    @Inject(MAT_DIALOG_DATA) public data: UserContact
  ) { }

  isSubmitting: boolean = false;
  confirmation: string = "";

  onSubmit() {
    this.isSubmitting = true;
    this.userContactService.deleteContact(this.data.Id!).subscribe(data => {
      this.dialogRef.close({ error: false });
    }, error => {
      this.dialogRef.close({ error: true, message: error.message })
    })
  }
}
