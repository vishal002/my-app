import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  api: any = environment + '';

  constructor(private http: HttpClient) {
    this.api = environment + '';
  }
  getData() {
    // return this.http.get(this.api);
    return this.http.get('/assets/mocks/dummyData.json');
  }
  postData(requestBody) {
    return this.http.post(this.api, requestBody);
  }
}
