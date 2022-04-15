# ConverterCalculator

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.1.

## Description
1.This project is representation of different currencies and unit conversion.


~ Currency Conversion :
   1. It holds the currencies parameter from "https://exchangeratesapi" API `http://api.exchangeratesapi.io/v1/latest?access_key=${this.key}` here key is your free API         key generated from the website.
   2. It also represents the historical trends for base EUR for selected date which was fetch from API : 
      `http://api.exchangeratesapi.io/v1/${latest}?access_key=${this.key}&symbols=USD,ZAR,INR,AUD,CAD,PLN,MXN&format=1` 
   3. There is a form which helps you to get the conversion value where you select the "FROM" currency , "TO" currency and "AMOUNT" for which you want to reterieve             value.
      eg: 455AMD= 84.45AFN 
      Note: Once From Value is selected it does not appear in To Value for that transaction.
      
~ Length Conversion :
  	1. Here we fetch unit from length service where we have declare an array of units.
    2. It comprise of a form which helps to convert length to different unit in which we need to select 3 parameters: 'FROM','TO','AMOUNT'
        eg: 3KM=3Kilometer= 9,842.52Foot
    3. Here we have a feature to add a new Unit which asks you to enter the new values for which each parameter, and if it exists it shows an error on toast.
    4. Once new value is added it also notifies users with success message, where it helps user to convert with new unit.
       Note: New Unit appears only for that session since backend is not integrated.
      

## Development server
Please run the below steps for setting up code :
  1. npm install
  2. ng add @angular/material
Run `ng serve`/ 'npm start' for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.



