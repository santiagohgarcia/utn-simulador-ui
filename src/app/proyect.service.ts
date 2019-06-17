import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ProyectService {

  constructor(private http: HttpClient) { }

  getStatus() {
    return this.http.get(`${environment.proyectServiceHost}/api/proyecto/stat`);
  }

}
