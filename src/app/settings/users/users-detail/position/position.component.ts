import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserPosition } from '../../../../interfaces/user';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {
  @Input() email: string = "";

  isFetching: boolean = false;
  pageNumber: number = 1;
  records: number = 0;
  positions: UserPosition[] = [];

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.fetchPositions();
  }

  openAddPosition() {
    const dialog = this.dialog.open(PositionAddComponent, {
      disableClose: true,
      data: this.email
    })

    dialog.afterClosed().subscribe(data => {
      if (data != null) {
        this.fetchPositions();
      }
    })
  }

  openPositionInfo(position: UserPosition) {
    this.dialog.open(PositionDetailComponent, {
      data: position
    });
  }

  openDeletePosition(position: UserPosition) {
    const dialog = this.dialog.open(PositionDeleteComponent, {
      data: position
    });

    dialog.afterClosed().subscribe(data => {
      if (data != null) {
        this.fetchPositions();
      }
    })
  }

  updatePage(event: any) {
    this.pageNumber = event.pageIndex + 1;
    this.fetchPositions();
  }

  fetchPositions() {
    this.isFetching = true;
    this.userService.getUserPositions(this.email, (this.pageNumber - 1) * 25).subscribe(responseData => {
      this.records = responseData.count;
      this.positions = responseData.data;
      this.isFetching = false;
    }, error => {
        this.snackBar.open(error.message, "Close");
        this.isFetching = false;
    })
  }

}

@Component({
  selector: 'position-add',
  templateUrl: 'position-add.html'
})

export class PositionAddComponent {
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
  isSubmitting: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<PositionAddComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) { }

  usersForm: FormGroup = new FormGroup({
    Position: new FormControl("", Validators.required)
  })

  closeDialog() {
    this.dialogRef.close(null);
  }

  onSubmit() {
    this.isSubmitting = true;
    this.userService.postUserPosition({
      Position: this.Positions.filter(x => x.Name == this.usersForm.controls.Position.value)[0].Position,
      EffectiveDate: new Date(),
      UserEmail: this.data,
      CreatedDate: new Date()
    }).subscribe(response => {
      this.dialogRef.close({ error: false})
    }, error => {
        console.warn(error);
        this.isSubmitting = false;
    })
  }
}

@Component({
  selector: 'position-delete',
  templateUrl: 'position-delete.html'
})

export class PositionDeleteComponent {
  isSubmitting: boolean = false;
  confirmation: string = "";
  confirmationText: string = Math.floor(Math.random() * 9).toString() + Math.floor(Math.random() * 9).toString() + Math.floor(Math.random() * 9).toString() + Math.floor(Math.random() * 9).toString();

  constructor(
    private userService: UserService,
    private dialogRef: MatDialogRef<PositionDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserPosition
  ) { }

  onSubmit() {
    this.isSubmitting = true;
    this.userService.deletePosition(this.data.Id!).subscribe(responseData => {
      this.dialogRef.close({ message: "User position deleted" });
    }, error => {
      console.warn(error);
      this.isSubmitting = false;
    });
  }
}

@Component({
  selector: 'position-detail',
  templateUrl: 'position-detail.html'
})
export class PositionDetailComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(this.data);
  }
}
