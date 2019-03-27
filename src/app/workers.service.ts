
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Worker } from './worker';

@Injectable({
  providedIn: 'root'
})
export class WorkersService {
  url = 'http://localhost:51549/Api';
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };

  constructor(private http: HttpClient) { }

  getAllWorkers(): Observable<Worker[]> {
    return this.http.get<Worker[]>(this.url + '/Workers');
  }

  getWorkerById(WorkerId: string): Observable<Worker> {
    return this.http.get<Worker>(this.url + '/Workers/' + WorkerId);
  }

  createWorker(worker: Worker): Observable<Worker> {
    return this.http.post<Worker>(this.url + '/Workers/', worker, this.httpOptions);
  }

  updateWorker(worker: Worker): Observable<Worker> {
    return this.http.put<Worker>(this.url + '/Workers/' + worker.Id, worker, this.httpOptions);
  }

  deleteWorkerById(workerId: string): Observable<number> {
    return this.http.delete<number>(this.url + '/Workers/' + workerId, this.httpOptions);
  }
}
