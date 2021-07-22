import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as global from '../global';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getFeeds(projectId: number, offset: number, limit: number = 10) {
    return this.http.get<any[]>(global.url + "/reportFeed/" + projectId.toString(), {
      params: {
        offset: offset,
        limit: limit
      }
    })
  }

  getFeed(feedId: number) {
    return this.http.get<any>(global.url + "/reportFeed/getById/" + feedId.toString());
  }

  getFeedsProjectDetail(projectId: number) {
    return this.http.get<any[]>(global.url + "/reportFeed/getDetailByProjectId/" + projectId);
  }

  getFeedsProjectDetailType(projectId: number, type: number, offset: number = 0, limit: number = 10) {
    return this.http.get<any[]>(global.url + "/reportFeed/getDetailByProjectIdType", {
      params: {
        projectId: projectId,
        type: type,
        offset: offset,
        limit: limit
      }
    })
  }

  getFeedsByUser() {
    return this.http.get<any[]>(global.url + "/reportFeed", {
      params: {
        Email: this.authService.getEmail()
      }
    })
  }
}
