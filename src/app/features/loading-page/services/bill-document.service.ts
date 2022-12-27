import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment.prod';
import { BillDocumentModel } from './../models/bill-document.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BillDocumentService {
  constructor(private http: HttpClient) {}
  addBillDocument(
    billDocument: BillDocumentModel
  ): Observable<BillDocumentModel> {
    return this.http.post<BillDocumentModel>(
      environment.API_URL + '/bill-document',
      billDocument
    );
  }
  findAll(): Observable<BillDocumentModel[]> {
    return this.http.get<BillDocumentModel[]>(
      environment.API_URL + '/bill-document'
    );
  }
  findByDate(
    startDate: string,
    endDate: string
  ): Observable<BillDocumentModel[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('startDate', startDate);
    queryParams = queryParams.append('endDate', endDate);

    return this.http.get<BillDocumentModel[]>(
      environment.API_URL + '/bill-document/filter',
      { params: queryParams }
    );
  }
}
