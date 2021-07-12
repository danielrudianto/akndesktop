import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProjectTask } from '../../interfaces/project';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: ProjectTask[] = [];

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks() {
    this.taskService.getTasks().subscribe(data => {
      this.tasks = data;
    })
  }

  openAddTaskGroup() {
    console.log("Daniel");
    const dialog = this.dialog.open(TasksAddGroupComponent, {
      disableClose: true
    })

    dialog.afterClosed().subscribe(data => {
      if (data != null) {
        if (!data.error) {
          this.tasks.push(data.data);
        }
      }
    })
  }

  viewDetails(task: ProjectTask) {

  }

}

@Component({
  selector: 'tasks-add-group',
  templateUrl: 'tasks-add-group.html'
})

export class TasksAddGroupComponent {
  isSubmitting: boolean = false;

  constructor(
    private taskService: TaskService,
    private dialogRef: MatDialogRef<TasksAddGroupComponent>
  ) { }

  tasksAddForm: FormGroup = new FormGroup({
    Name: new FormControl("", Validators.required),
    Description: new FormControl("", Validators.required)
  })

  onSubmit() {
    this.isSubmitting = true;
    this.taskService.addTask({
      Name: this.tasksAddForm.controls.Name.value,
      Description: this.tasksAddForm.controls.Description.value,
      ParentId: 0
    }).subscribe(data => {
      console.log(data);
      this.dialogRef.close(data);
      this.isSubmitting = false;
    }, error => {
        this.isSubmitting = false;
    })
  }

  onClose() {
    this.dialogRef.close(null);
  }
}
