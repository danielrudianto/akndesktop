import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskForm, TaskFormGroup } from '../interfaces/project';

@Component({
  selector: 'app-gantt-chart-view',
  templateUrl: './gantt-chart-view.component.html',
  styleUrls: ['./gantt-chart-view.component.css']
})
export class GanttChartViewComponent implements OnInit {
  @Input() data: any[] = []
  tasks: any[] = [];
  maxTimeline: number = 0;
  dateArray: number[] = [];

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.data.filter(x => x.ParentId == 0).forEach((datum, index) => {
      this.tasks.push({
        Id: datum.Id,
        Name: datum.Name,
        Description: datum.Description,
        Tasks: []
      });
    });

    this.data.filter(x => x.ParentId > 0).forEach(datum => {
      this.tasks.filter(y => y.Id == datum.ParentId)[0].Tasks.push({
        Id: datum.Id,
        Name: datum.Name,
        Description: datum.Description,
        Quantity: datum.Quantity,
        Unit: datum.Unit,
        BudgetPrice: datum.BudgetPrice,
        Price: datum.Price,
        Timeline: datum.Timeline,
        EstimatedDuration: datum.EstimatedDuration,
        GroupId: "",
        Color: this.getRandomColor()
      })

      this.tasks.filter(y => y.Id == datum.ParentId)[0].Tasks.sort(function (a: any, b: any) {
        var keyA = a.Timeline,
          keyB = b.Timeline;

        if (keyA! < keyB!) return -1;
        if (keyA! > keyB!) return 1;
        return 0;
      });

      const end = datum.Timeline + datum.EstimatedDuration;
      if (end > this.maxTimeline) {
        this.maxTimeline = end;
      }
    });

    this.dateArray = Array.from(Array(this.maxTimeline), (_, i) => i);
  }

  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + color;
  }

  openDetail(item: TaskForm) {
    this.dialog.open(GanttViewDetailComponent, {
      data: item
    })
  }

  openGroupDetail(item: TaskFormGroup) {
    this.dialog.open(GanttViewDetailGroupComponent, {
      data: item
    })
  }
}

@Component({
  selector: 'gantt-chart-view-group-detail',
  templateUrl: './gantt-chart-view-group-detail.html',
  styleUrls: ['./gantt-chart-view.component.css']
})
export class GanttViewDetailGroupComponent {
  task: TaskFormGroup;
  constructor(
    private dialogRef: MatDialogRef<GanttViewDetailGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskFormGroup
  ) {
    this.task = this.data;
  }
}

@Component({
  selector: 'gantt-chart-view-detail',
  templateUrl: './gantt-chart-view-detail.html',
  styleUrls: ['./gantt-chart-view.component.css']
})
export class GanttViewDetailComponent {
  task: TaskForm;
  constructor(
    private dialogRef: MatDialogRef<GanttViewDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskForm
  ) {
    this.task = this.data;
  }
}
