import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as global from '../global';
import { Client } from '../interfaces/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private http: HttpClient
  ) { }

  getClients(offset: number, limit: number = 25) {
    return this.http.get(global.url + "/client", {
      params: {
        offset: offset,
        limit: limit
      }
    })
  }

  postClient(client: Client) {
    return this.http.post(global.url + "/client", client);
  }

  putClient(client: Client) {
    return this.http.put(global.url + "/client", client);
  }

  deleteClient(client: number) {
    return this.http.delete(global.url + "/client/" + client.toString());
  }
}
