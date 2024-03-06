import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

const BASE_URL = "http://localhost:8081/booking";
const HTTP_OPT = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private http = inject(HttpClient)

  constructor() {}

  getTimes(date:String) {
    return this.http.get(BASE_URL + "/times/" + date);
  }

  getReservations(date:String) {
    return this.http.get(BASE_URL + "/" + date);
  }
  
  postBooking(data: any) {
    return this.http.post(BASE_URL, data, HTTP_OPT);
  }
}
