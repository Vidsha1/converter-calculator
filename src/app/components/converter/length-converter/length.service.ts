
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LengthService {
  lengthUnit: any[] = [
    {value: 'Meter', viewValue: 'meter [m]',conversionValue:'1'},
    {value: 'CentiMeter', viewValue: 'centimeter [cm]',conversionValue:'0.01'},
    {value: 'Foot', viewValue: 'foot [ft]',conversionValue:' 0.3048'},
    {value: 'Yard', viewValue: 'yard [yd]',conversionValue:'0.9144'},
    {value: 'Inch', viewValue: 'inch [in]',conversionValue:'0.0254'}, 
    {value: 'Kilometer', viewValue: 'kilometer [km]',conversionValue:'1000'}
  ]
  url:string='/local';
  constructor() { }


}
