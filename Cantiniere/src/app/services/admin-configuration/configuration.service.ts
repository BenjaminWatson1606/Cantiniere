import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { Configuration } from 'src/app/interfaces/configuration';
import { AuthenticationService } from '../auth/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService,
  ) { }

  /**
   * Get all configuration constraints from the database
   * @returns Return an observable to get an array with the configurations in the database
   */
  getAllConfiguration(): Observable<Configuration[]>{
    const url = 'http://localhost:8080/stone.lunchtime/constraint/findall';
    return this.http.get<any[]>(url)
      .pipe(map(response => response.map(res => (res as Configuration))));
  }

  /**
   * Get a configuration from the database by id
   * @param configurationId The configuration's id to get configuration from
   * @returns Returns an observable to get the configuration at given index in the database
   */
  getConfigurationById(configurationId: number): Observable<Configuration>{
    const url = `http://localhost:8080/stone.lunchtime/constraint/find/${configurationId}`;
    return this.http.get(url)
      .pipe(map(res => res as Configuration));
  }

  /**
   * Update configuration properties into the database
   * @param configuration The updated configuration object
   * @returns Returns a responding observable to get the updated configuration or undefined
   */
  updateConfiguration(configuration:Configuration): Observable<Configuration> | undefined{
    const token = this.auth.getUserToken();
    if(!token) return undefined;
    
    const url = `http://localhost:8080/stone.lunchtime/constraint/update/${configuration.id}`;
    const body = JSON.stringify(configuration);
    const headers = this.auth.getHttpHeader(token);
    return this.http.patch(url, body, { headers: headers })
      .pipe(map(res => res as Configuration));
  }

  /**
   * Add a configuration to the database
   * @param configuration The configuration object to add to the database
   * @returns Returns a responding observable to get the new configuration or undefined
   */
  addConfiguration(configuration: any): Observable<any>{
    const url = `http://localhost:8080/stone.lunchtime/constraint/add`;
    const body = {};
    const headers = {};

    return this.http.put(url, body, headers);
  }

  /**
   * Delete a configuration from the database by id
   * @param configurationId The configuration's id to delete
   * @returns 
   */
  deleteConfiguration(configurationId: number): Observable<any>{
    const url = `http://localhost:8080/stone.lunchtime/constraint/delete/${configurationId}`;
    return this.http.delete(url);
  }
}
