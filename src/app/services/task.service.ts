import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as global from '../global';
import { ProjectTask, TaskForm } from '../interfaces/project';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http: HttpClient
  ) { }

  getTasks() {
    return this.http.get<ProjectTask[]>(global.url + "/projectTask")
  }

  addTask(task: ProjectTask) {
    return this.http.post(global.url + "/projectTask", task);
  }
}
