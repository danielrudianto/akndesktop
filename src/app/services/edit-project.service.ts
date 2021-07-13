import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CodeProject, CodeProjectDocument, CodeProjectUser } from '../interfaces/project';
import * as global from '../global';

@Injectable({
  providedIn: 'root'
})
export class EditProjectService {
  codeProject: CodeProject = null;

  constructor(
    private http: HttpClient
  ) { }

  editGeneralProject(project: any) {
    return this.http.put(global.url + "/Project/edit/general", project);
  }

  editUserProject(projectUser: any) {
    return this.http.put<CodeProjectUser[]>(global.url + "/Project/edit/user", projectUser);
  }

  uploadDocuments(formData: FormData) {
    return this.http.post<CodeProjectDocument[]>(global.url + "/projectDocument", formData);
  }
}
