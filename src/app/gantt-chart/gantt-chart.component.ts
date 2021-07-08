import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task, TaskForm, TaskFormGroup } from '../interfaces/project';
import { v4 } from 'uuid';

@Component({
  selector: 'app-gantt-chart',
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.css']
})
export class GanttChartComponent implements OnInit {
  tasks: TaskFormGroup[] = [];
  maxTimeline: number = 0;
  dateArray: number[] = [];

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem("projectTasks") === null) {
      this.tasks = []
    } else {
      this.tasks = JSON.parse(localStorage.getItem("projectTasks")!.toString());
      this.tasks.forEach(task => {
        task.Tasks.forEach(x => {
          if ((x.Timeline! + x.EstimatedDuration!) > this.maxTimeline) {
            this.maxTimeline = (x.Timeline! + x.EstimatedDuration!);
          }
        })
      })

      this.dateArray = Array.from(Array(this.maxTimeline), (_, i) => i);
    }
  }

  openAddForm() {
    const dialog = this.dialog.open(GanttAddGroupComponent, {
      disableClose: true
    })

    dialog.afterClosed().subscribe(data => {
      if (data != null) {
        this.tasks.push(data as TaskFormGroup);
        localStorage.setItem("projectTasks", JSON.stringify(this.tasks));
      }
    })
  }

  openAddTask(groupId: string) {
    const dialog = this.dialog.open(GanttAddComponent, {
      disableClose: true,
      panelClass: "darkDialog",
      data: groupId
    })

    dialog.afterClosed().subscribe(data => {
      if (data != null || data != undefined) {
        this.tasks[this.tasks.findIndex(x => x.Id == groupId)].Tasks.push(data as TaskForm);
        localStorage.setItem("projectTasks", JSON.stringify(this.tasks));

        if (parseInt(data.Timeline) + parseInt(data.EstimatedDuration) > this.maxTimeline) {
          this.maxTimeline = parseInt(data.Timeline) + parseInt(data.EstimatedDuration);
        }

        this.dateArray = Array.from(Array(this.maxTimeline), (_, i) => i);
      }
    })
  }

  openEditTask(task: TaskForm) {
    const dialog = this.dialog.open(GanttEditComponent, {
      disableClose: true,
      data: task
    })

    dialog.afterClosed().subscribe((data: TaskForm) => {
      if (data != null) {
        const groupIndex = this.tasks.findIndex(x => x.Id == data.GroupId);
        const taskIndex = this.tasks[groupIndex].Tasks.findIndex(x => x.Id == data.Id);

        this.tasks[groupIndex].Tasks[taskIndex] = data;

        this.tasks.forEach(task => {
          task.Tasks.forEach(x => {
            if ((x.Timeline! + x.EstimatedDuration!) > this.maxTimeline) {
              this.maxTimeline = (x.Timeline! + x.EstimatedDuration!);
            }
          })
        })

        this.dateArray = Array.from(Array(this.maxTimeline), (_, i) => i);
        localStorage.setItem("projectTasks", JSON.stringify(this.tasks));
      }
    })
  }

  deleteTask(task: TaskForm) {
    const groupIndex = this.tasks.findIndex(x => x.Id == task.GroupId);
    const taskIndex = this.tasks[groupIndex].Tasks.findIndex(x => x.Id == task.Id);

    this.tasks[groupIndex].Tasks.splice(taskIndex, 1);

    this.maxTimeline = 0;
    this.tasks.forEach(task => {
      task.Tasks.forEach(x => {
        if ((x.Timeline! + x.EstimatedDuration!) > this.maxTimeline) {
          this.maxTimeline = (x.Timeline! + x.EstimatedDuration!);
        }
      })
    })

    this.dateArray = Array.from(Array(this.maxTimeline), (_, i) => i);
    localStorage.setItem("projectTasks", JSON.stringify(this.tasks));
  }

  openDetail(task: TaskForm) {
    this.dialog.open(GanttDetailComponent, {
      data: task
    })
  }

  openEditGroup(task: TaskFormGroup) {
    const dialog = this.dialog.open(GanttEditGroupComponent, {
      disableClose: true,
      data: task
    })

    dialog.afterClosed().subscribe(data => {
      if (data != null) {
        const index = this.tasks.findIndex(x => x.Id == task.Id);
        this.tasks[index].Name = data.Name;
        this.tasks[index].Description = data.Description;
      }
    })
  }

  deleteGroup(task: TaskFormGroup) {
    const groupIndex = this.tasks.findIndex(x => x.Id == task.Id);
    this.tasks.splice(groupIndex, 1);
    this.maxTimeline = 0;
    this.tasks.forEach(task => {
      task.Tasks.forEach(x => {
        if ((x.Timeline! + x.EstimatedDuration!) > this.maxTimeline) {
          this.maxTimeline = (x.Timeline! + x.EstimatedDuration!);
        }
      })
    })

    this.dateArray = Array.from(Array(this.maxTimeline), (_, i) => i);
    localStorage.setItem("projectTasks", JSON.stringify(this.tasks));
  }

  openGroupDetail(task: TaskFormGroup) {
    this.dialog.open(GanttDetailGroupComponent, {
      data: task
    })
  }
}

@Component({
  selector: 'gantt-chart-group-add',
  templateUrl: './gantt-chart-group-add.html'
})

export class GanttAddGroupComponent {
  constructor(
    private dialogRef: MatDialogRef<GanttAddGroupComponent>
  ) { }

  taskForm: FormGroup = new FormGroup({
    Name: new FormControl("", Validators.required),
    Description: new FormControl("", Validators.required)
  })

  close() {
    this.dialogRef.close(null);
  }

  onSubmit() {
    this.dialogRef.close({
      Id: v4(),
      Name: this.taskForm.controls.Name.value,
      Description: this.taskForm.controls.Description.value,
      Tasks: []
    })
  }
}

@Component({
  selector: 'gantt-chart-group-edit',
  templateUrl: './gantt-chart-group-edit.html'
})
export class GanttEditGroupComponent {
  constructor(
    private dialogRef: MatDialogRef<GanttAddGroupComponent>
  ) { }

  taskForm: FormGroup = new FormGroup({
    Name: new FormControl("", Validators.required),
    Description: new FormControl("", Validators.required)
  })

  close() {
    this.dialogRef.close(null);
  }

  onSubmit() {
    this.dialogRef.close({
      Id: v4(),
      Name: this.taskForm.controls.Name.value,
      Description: this.taskForm.controls.Description.value,
      Tasks: []
    })
  }
}


@Component({
  selector: 'gantt-chart-add',
  templateUrl: './gantt-chart-add.html',
  styleUrls: ['./gantt-chart.component.css']
})
export class GanttAddComponent {
  taskForm: FormGroup = new FormGroup({
    Name: new FormControl("", Validators.required),
    Description: new FormControl("", Validators.required),
    BudgetPrice: new FormControl(0, [Validators.required, Validators.min(0)]),
    Price: new FormControl(0, [Validators.required, Validators.min(0)]),
    Quantity: new FormControl(0, [Validators.required, Validators.min(0.1)]),
    Duration: new FormControl(0, [Validators.required, Validators.min(1)]),
    Timeline: new FormControl(0, [Validators.required, Validators.min(0)]),
    Unit: new FormControl("", Validators.required),
    Color: new FormControl(this.getRandomColor())
  })
  constructor(
    private dialogRef: MatDialogRef<GanttAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  onSubmit() {
    const task: TaskForm = {
      Id: v4(),
      Name: this.taskForm.controls.Name.value,
      Description: this.taskForm.controls.Description.value,
      BudgetPrice: this.taskForm.controls.BudgetPrice.value,
      Price: this.taskForm.controls.Price.value,
      Quantity: this.taskForm.controls.Quantity.value,
      EstimatedDuration: parseInt(this.taskForm.controls.Duration.value.toString()),
      Timeline: parseInt(this.taskForm.controls.Timeline.value.toString()),
      Unit: this.taskForm.controls.Unit.value,
      GroupId: this.data,
      Color: this.taskForm.controls.Color.value
    }
    this.dialogRef.close(task);
  }

  close() {
    this.dialogRef.close(null);
  }

  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + color;
  }
}

@Component({
  selector: 'gantt-chart-edit',
  templateUrl: './gantt-chart-edit.html',
  styleUrls: ['./gantt-chart.component.css']
})
export class GanttEditComponent {
  constructor(
    private dialogRef: MatDialogRef<GanttAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskForm
  ) { }

  taskForm: FormGroup = new FormGroup({
    Name: new FormControl(this.data.Name, Validators.required),
    Description: new FormControl(this.data.Description, Validators.required),
    BudgetPrice: new FormControl(this.data.BudgetPrice, [Validators.required, Validators.min(0)]),
    Price: new FormControl(this.data.Price, [Validators.required, Validators.min(0)]),
    Quantity: new FormControl(this.data.Quantity, [Validators.required, Validators.min(0.1)]),
    Duration: new FormControl(this.data.EstimatedDuration, [Validators.required, Validators.min(1)]),
    Timeline: new FormControl(this.data.Timeline, [Validators.required, Validators.min(0)]),
    Unit: new FormControl(this.data.Unit, Validators.required),
    Color: new FormControl(this.data.Color)
  })

  onSubmit() {
    const task: TaskForm = {
      Id: this.data.Id,
      Name: this.taskForm.controls.Name.value,
      Description: this.taskForm.controls.Description.value,
      BudgetPrice: this.taskForm.controls.BudgetPrice.value,
      Price: this.taskForm.controls.Price.value,
      Quantity: this.taskForm.controls.Quantity.value,
      EstimatedDuration: this.taskForm.controls.Duration.value,
      Timeline: this.taskForm.controls.Timeline.value,
      Unit: this.taskForm.controls.Unit.value,
      GroupId: this.data.GroupId,
      Color: this.taskForm.controls.Color.value
    }
    this.dialogRef.close(task);
  }

  close() {
    this.dialogRef.close(null);
  }
}

@Component({
  selector: 'gantt-chart-detail',
  templateUrl: './gantt-chart-detail.html',
  styleUrls: ['./gantt-chart.component.css']
})
export class GanttDetailComponent {
  task: TaskForm;
  constructor(
    private dialogRef: MatDialogRef<GanttDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskForm
  ) {
    this.task = this.data;
  }
}

@Component({
  selector: 'gantt-chart-group-detail',
  templateUrl: './gantt-chart-group-detail.html',
  styleUrls: ['./gantt-chart.component.css']
})
export class GanttDetailGroupComponent {
  task: TaskFormGroup;
  constructor(
    private dialogRef: MatDialogRef<GanttDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskFormGroup
  ) {
    this.task = this.data;
  }
}


