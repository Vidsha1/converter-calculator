import { keyframes } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencyService } from './currency.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit {
  currency_list:any= [];
  currency_list_new:any=[];
  temp_list:any=[];
  temp_list2:any=[];
  rates:any=[];
  allKeys:any=[];
  fromValue:any;
  toValue:any;
  amt:any;
  currencyForm: FormGroup = new FormGroup({});
  result:any;
  basicData: any;
  basicOptions: any;
  baseConvertedValue:any;
  dstConvertedValue:any;
  labels:any;
  allData:any;
  graphData:any=[];
  filterDate=new Date();
  isLoading:boolean=false;
  maxDate=new Date();
  constructor(private fb: FormBuilder,private currencyService:CurrencyService,private datepipe: DatePipe) { }
 
 
  ngOnInit(): void { 

    this.currencyForm = this.fb.group({
      fromUnit: ['', [Validators.required]],
      toUnit: ['', [Validators.required]],
      amount:['',[Validators.required, Validators.min(1)]]
    })
    //getting currency list
    this.currencyService.getAllCurrency().subscribe((data:any)=>
    {
      console.log(data);
      this.rates=data.rates;
      console.log(this.rates);
      this.getKeys(this.rates);  
    }) 
    this.setGraphData();
    }
    //get historical data
    setGraphData()
    {
      
      console.log(this.filterDate);
      this.currencyService.getHistoricalData(this.filterDate).subscribe((data:any)=>
      {
        console.log(data);
        this.allData=data.rates;
        this.labels=Object.keys(data.rates)
        console.log(this.labels)
      
        for(var key in this.allData )
        {
          console.log(this.allData[key]);
          this.graphData.push(this.allData[key])
        }
        console.log(this.graphData)
        this.isLoading=false;
        this.basicData = {
          labels: this.labels,
          datasets: [
              {
                  label: 'Currency Conversion for base Euro',
                  backgroundColor: '#42A5F5',
                  data: this.graphData
              },
          ]
        };
        this.basicOptions = {
          plugins: {
              legend: {
                  labels: {
                      color: '#495057'
                  }
              }
          },
          scales: {
              x: {
                  ticks: {
                      color: '#495057'
                  },
                  grid: {
                      color: '#ebedef'
                  }
              },
              y: {
                  ticks: {
                      color: '#495057'
                  },
                  grid: {
                      color: '#ebedef'
                  }
              }
          }
      };
      })
    }
    get f() {
      return this.currencyForm.controls;
    }
     /* Handle date change of filter Date graph*/
     handleDateChange(event:any)
     {
        this.isLoading=true;
        console.log(event.target.value);
        let fDate =new Date(event.target.value);
        console.log(fDate);
        this.filterDate=fDate;
        this.graphData=[];
         this.setGraphData();
        

     }
   //remove Value selected
   removeValue(e:any)
   {
     console.log("In remove"+e);
      const index=this.temp_list.indexOf(e);
      if(index>-1)
      {
        this.temp_list.splice(index, 1);
      }  

      this.currency_list_new=[...this.temp_list]
   }
   removeValueTo(e:any)
   {
     console.log("In remove"+e);
      const index=this.temp_list2.indexOf(e);
      if(index>-1)
      {
        this.temp_list2.splice(index, 1);
      }  

      this.currency_list=[...this.temp_list2]
   }
  /**getting keys to show case values  */
  getKeys(r:any)
  {
      this.currency_list=Object.keys(r);
      //assigning temp array for removing selected values
      this.temp_list=[...this.currency_list];
      this.temp_list2=[...this.currency_list];
      console.log(this.temp_list)
  }
 
  /**Convert any from unit to base value i.e meter */
  baseConversion()
  {
    console.log(this.currencyForm.value.fromUnit)
    for(var key in this.rates)
    {
      if(this.currencyForm.value.fromUnit == key)
      {
        console.log("Inside base");
        this.baseConvertedValue=this.rates[key];
      }
    }
    
    console.log(this.baseConvertedValue);
  }
   /**Convert basevalueConverted value to required Unit value  */
   destConversion()
   {
      for(var key in this.rates)
      {
        if(this.currencyForm.value.toUnit == key)
        {
          console.log("Inside dest"+this.rates[key]);
          this.dstConvertedValue=this.rates[key]/this.baseConvertedValue;
        }
      }
    
    console.log(this.dstConvertedValue)
   }
   /**Convert destUnit  to final amt */
   finalConversion()
   {
 
      this.baseConversion();
      this.destConversion();
      if(this.baseConvertedValue!='' && this.dstConvertedValue!='')
      this.result=this.currencyForm.value.amount*this.dstConvertedValue;
      console.log(this.result);
      this.amt=this.currencyForm.value.amount;
      this.fromValue=this.currencyForm.value.fromUnit;
      this.toValue=this.currencyForm.value.toUnit;

   }

 


}
