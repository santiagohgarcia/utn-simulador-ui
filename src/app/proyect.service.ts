import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ProyectService {

  constructor(private http: HttpClient) { }

  getStatus() {
    return this.http.get(`${environment.proyectServiceHost}/api/estado/actual`);
  }

  simulate(status) {
    return this.http.post(`${environment.proyectServiceHost}/api/estado`, status);
  }

}
