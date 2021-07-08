import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Client } from '../../interfaces/client';
import { SelectClientComponent } from '../../select-client/select-client.component';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  config: any;
  gstcState: any;

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const iterations = 400;
    const rows: any= {};
    for (let i = 0; i < iterations; i++) {
      const withParent = i > 0 && i % 2 === 0;
      const id = i.toString();
      rows[id] = {
        id,
        label: "Room " + i,
        parentId: withParent ? (i - 1).toString() : undefined,
        expanded: false
      };
    }
 
    const dayLen = 24 * 60 * 60 * 1000;

    const items: any = {};
    for (let i = 0; i < iterations; i++) {
      const id = i.toString();
      const start = new Date().getTime();
      items[id] = {
        id,
        label: "User id " + i,
        time: {
          start: start + i * dayLen,
          end: start + (i + 2) * dayLen
        },
        rowId: id
      };
    }

    const columns = {
      percent: 100,
      resizer: {
        inRealTime: true
      },
      data: {
        label: {
          id: "label",
          data: "label",
          expander: true,
          isHtml: true,
          width: 230,
          minWidth: 100,
          header: {
            content: "Room"
          }
        }
      }
    };

    this.config = {
      height: 800,
      list: {
        rows,
        columns
      },
      chart: {
        items
      }
    };
  }

  selectedClient: number = 0;

  generalProjectForm: FormGroup = new FormGroup({
    name: new FormControl("", Validators.required),
    address: new FormControl("", Validators.required),
    client: new FormControl(null, Validators.required)
  })

  openAddClient() {
    const dialog = this.dialog.open(SelectClientComponent);
    dialog.afterClosed().subscribe(data => {
      console.log(data);
      if (data.Id != undefined) {
        this.generalProjectForm.get("client")!.setValue(data.Name);
        this.selectedClient = data.Id;
      }
    })
  }

  onState(state: any) {
    this.gstcState = state;

    // YOU CAN SUBSCRIBE TO CHANGES

    this.gstcState.subscribe("config.list.rows", (rows: any) => {
      console.log("rows changed", rows);
    });

    this.gstcState.subscribe(
      "config.chart.items.:id",
      (bulk: any, eventInfo: any) => {
        if (eventInfo.type === "update" && eventInfo.params.id) {
          const itemId = eventInfo.params.id;
          console.log(
            `item ${itemId} changed`,
            this.gstcState.get("config.chart.items." + itemId)
          );
        }
      },
      { bulk: true }
    );
  }
}
