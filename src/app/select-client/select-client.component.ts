import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { debounceTime } from "rxjs/operators";
import { Client } from '../interfaces/client';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'select-client',
  templateUrl: './select-client.component.html',
  styleUrls:['./select-client.component.css']
})

export class SelectClientComponent {
  obs: Subscription = new Subscription();
  selectClientForm: FormGroup = new FormGroup({
    search: new FormControl()
  });

  clients: Client[] = [];

  constructor(
    private dialogRef: MatDialogRef<SelectClientComponent>,
    private clientService: ClientService
  ) {
    this.obs = this.selectClientForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe(data => {
        if (data.search != '') {
          this.clientService.getClientsAutocomplete(data.search).subscribe((clients: Client[]) => {
            this.clients = clients;
          })
        }
      });
  }

  selectClient(client: Client) {
    this.dialogRef.close(client);
  }
}
