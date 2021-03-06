import { Injectable } from '@angular/core';
import { CodeProject, CodeProjectForm } from '../interfaces/project';
import * as global from '../global';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  submitProject(project: CodeProjectForm) {
    return this.http.post(global.url + "/project", project);
  }

  uploadDocuments(files: File[], projectId: number) {
    let formData = new FormData();
    for (var i = 0; i < files.length; i++) {
      formData.append("file[" + i + "]", files[i], files[i].name);
    }

    formData.append("createdBy", this.authService.getEmail());
    formData.append("projectId", projectId.toString());
    formData.append("fileLength", files.length.toString());

    return this.http.post(global.url + "/projectDocument", formData);
  }

  downloadDocument(url: string) {
    return this.http.get(global.url + "/download/" + url, {
      responseType:'blob'
    });
  }

  deleteDocument(id: number) {
    return this.http.delete(global.url + "/projectDocument/" + id);
  }

  getActiveProjects(offset: number, limit: number = 25) {
    return this.http.get(global.url + "/project/active", {
      params: {
        offset: offset,
        limit: limit
      }
    })
  }

  getProjectById(projectId: number) {
    return this.http.get < CodeProject>(global.url + "/project/" + projectId);
  }

  getProjectsByUser() {
    return this.http.get<CodeProject[]>(global.url + "/project?email=" + this.authService.getEmail());
  }

  confirmProject(id: number) {
    return this.http.post(global.url + '/project/confirm', {
      id: id
    })
  }

  deleteProject(id: number) {
    return this.http.delete(global.url + '/project/' + id);
  }

  getDocuments(id: number) {
    return this.http.get(global.url + '/projectDocument/' + id);
  }

  renameDocument(id: number, name: string) {
    return this.http.post("/projectDocument/Rename", {
      Id: id,
      Name: name
    })
  }
}
