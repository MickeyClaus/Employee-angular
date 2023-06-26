import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  mainApiUrl = environment.mainApiUrl;
  updateEmployee$: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  getEmployeesData(): Observable<any> {
    return this.http.get(
      `${this.mainApiUrl}rubetek/angular-testcase-list/ `
    );
  }
}
