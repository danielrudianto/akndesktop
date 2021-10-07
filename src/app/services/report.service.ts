import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as global from '../global';
import { MaterialReportForm, ToolReportForm, WeatherReportForm, WorkerReportForm } from '../interfaces/report';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private http: HttpClient
  ) { }

  submitWeatherReport(weatherReport: WeatherReportForm) {
    return this.http.post(global.url + "/reportWeather", weatherReport);
  }

  submitWorkerReport(workerReport: WorkerReportForm) {
    return this.http.post(global.url + "/reportWorker", workerReport)
  }

  submitToolReport(toolReport: ToolReportForm) {
    return this.http.post(global.url + "/reportTool", toolReport)
  }

  submitMaterialReport(materialReport: MaterialReportForm) {
    return this.http.post(global.url + "/reportMaterial", materialReport)
  }

  submitProgressReport(formData: FormData) {
    return this.http.post(global.url + "/reportStatus", formData, {
      reportProgress: true,
      responseType: 'json'
    });
  }

  submitRFI(formData: FormData) {
    return this.http.post(global.url + "/rfi", formData, {
      reportProgress: true,
      responseType: 'json'
    })
  }

  fetchTodayWorker(projectId: number) {
    return this.http.get(global.url + "/reportWorker/getToday/" + projectId.toString());
  }

  deleteReport(id: number) {
    return this.http.delete(global.url + '/reportFeed/' + id);
  }

  downloadDailyReport(date: Date, projectId: number) {
    return this.http.get(`${global.url}/reportDaily/${projectId}/${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`, {
      responseType:'blob'
    })
  }

  editWorkerReport(workerReport: WorkerReportForm) {
    return this.http.put(global.url + "/reportWorker", workerReport)
  }

  editMaterialReport(materialReport: MaterialReportForm) {
    return this.http.put(global.url + "/reportMaterial", materialReport);
  }

  editToolReport(toolReport: ToolReportForm) {
    return this.http.put(global.url + "/reportTool", toolReport);
  }

  editProgressReport(formData: FormData) {
    return this.http.put(global.url + "/reportStatus", formData);
  }

  editRFI(formData: FormData) {
    return this.http.put(global.url + "/RFI", formData);
  }

  getDailyReportImages(projectId: number, date: Date) {
    return this.http.get<any[]>(global.url + "/reportDaily/getImages/" + projectId + "/" + date.getDate() + "/" + parseInt((date.getMonth() + 1).toString()) + "/" + date.getFullYear());
  }

  submitDailyReport(formData: FormData, projectId: number, date: Date) {
    return this.http.post(`${global.url}/reportDaily/${projectId}/${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`, formData);
  }

  checkDailyReport(projectId: number, date: Date) {
    return this.http.get<any>(global.url + "/reportDaily/check/" + projectId + "/" + date.getDate() + "/" + parseInt((date.getMonth() + 1).toString()) + "/" + date.getFullYear());
  }

  getDailyReportExistingImages(reportId: number) {
    return this.http.get<any[]>(`${global.url}/reportDaily/images/${reportId}`);
  }

  editDailyReport(formData: FormData, reportId: number) {
    return this.http.put(`${global.url}/reportDaily/${reportId}`, formData);
  }
}
