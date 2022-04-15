import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  key=environment.key;
  sdate=new Date();
 
  constructor(private httpClient: HttpClient,private datePipe:DatePipe) { }

  getAllCurrency()
  {
    return this.httpClient.get(
      `http://api.exchangeratesapi.io/v1/latest?access_key=${this.key}`
    );
  }

  getHistoricalData(date:Date)
  {
    console.log(date);
    let latest=this.datePipe.transform(date, 'yyyy-MM-dd');
    return this.httpClient.get(
      `http://api.exchangeratesapi.io/v1/${latest}?access_key=${this.key}&symbols=USD,ZAR,INR,AUD,CAD,PLN,MXN&format=1`
    );
  }
}
