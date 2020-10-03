import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private baseUrl:string=environment.baseUrl;
  private readonly getUrl=this.baseUrl.concat('covid-19/allCountries');
  private readonly csvDownloadUrl=this.baseUrl.concat('covid-19/allCountries/csv');
  constructor(private httpClient:HttpClient) { }

  getAllCountriesData(){
    return this.httpClient.get(this.getUrl)
  }

  downloadCSV(){
    return this.httpClient.post(this.csvDownloadUrl,null,{responseType:'blob' as 'json',observe:'response'});
  }
}
