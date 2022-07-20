import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Api service contains methods lik Get, Post, Put, Delete
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  /**
   * Constructor
   * @param httpClient Http client service to Performs HTTP requests
   */
  constructor(private httpClient: HttpClient) { }

  /**
   * Post data
   * @param url Url
   * @param data Data
   * @returns Observable
   */
  post<T>(url: string, data: T): Observable<any> {
    return this.httpClient.post<T>(url, data);
  }

  /**
   * Get data
   * @param url Url
   * @param id Id
   * @returns Observable
   */  get(url: string, id: any): Observable<any> {
    return this.httpClient.get<any>(url, id);
  }

  /**
   * Get all
   * @param url Url
   * @returns Observable
   */
  getAll(url: string): Observable<any> {
    return this.httpClient.get<any>(url);
  }

  /**
   * Put data
   * @param url Url
   * @param id Id
   * @param data Data
   * @returns Observable
   */
  put<T>(url: string, id: any, data: T): Observable<any> {
    return this.httpClient.put<any>(url + '' + id, data);
  }

  /**
   * Delete data
   * @param url Url
   * @param id Id
   * @returns Observable
   */
  delete(url: string, id: any): Observable<any> {
    return this.httpClient.delete(url + '' + id);
  }
}
