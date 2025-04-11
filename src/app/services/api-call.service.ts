import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RouteResponse } from '../../interfaces';
import { firstValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiCallService {
  private readonly _apiEndpoint = 'https://timetable.search.ch/api';
  constructor(
    private readonly _http: HttpClient
  ){}


  //timetable.search.ch/api/route.fr.json?from=Genève&to=Lausanne&date=4/8/2025&time=7:48&limit=1

  async getRoute(params: {
    from: string,
    to: string,
    date: string,
    time: string,
    }): Promise<RouteResponse | undefined>{
    try {
      const url = `${this._apiEndpoint}/route.fr.json?from=${params.from}&to=${params.to}&date=${params.date}&time=${params.time}&limit=1`;
      const request = this._http.get<RouteResponse>(url);
      const response = await firstValueFrom(request);
      return response
    } catch (error) {
      return undefined;
    }
  }

  async autocomplete(){
    
  }
}
