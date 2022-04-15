import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { LengthService } from './length.service';

@Component({
  selector: 'app-length-converter',
  templateUrl: './length-converter.component.html',
  styleUrls: ['./length-converter.component.scss']
})
export class LengthConverterComponent implements OnInit {

  length_list: any = [];
  newLengthForm: FormGroup = new FormGroup({});
  lengthForm: FormGroup = new FormGroup({});
  result: any;
  newUnit: boolean = false;
  match: boolean = false;
  basicData: any;
  basicOptions: any;
  baseConvertedValue: any;
  dstConvertedValue: any;
  amt: any;
  fromValue: any;
  toValue: any;

  constructor(private fb: FormBuilder, private lengthService: LengthService, private messageService: MessageService) {
    this.lengthForm = fb.group({
      fromUnit: ['', [Validators.required]],
      toUnit: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(1)]]
    })
    this.newLengthForm = fb.group({
      newUnit: ['', [Validators.required]],
      newUnitName: ['', [Validators.required]],
      conversionValue: ['', [Validators.required, Validators.min(1)]]
    })
  }

  ngOnInit(): void {
    this.length_list = this.lengthService.lengthUnit;
  }
  get f() {
    return this.lengthForm.controls;
  }
  get fControl() {
    return this.newLengthForm.controls;
  }
  toggle() {
    this.newUnit = !this.newUnit;

  }

  /**Convert any from unit to base value i.e meter */
  baseConversion() {
    this.length_list.forEach((element: any) => {
      if (this.lengthForm.value.fromUnit.toLowerCase() == element.value.toLowerCase()) {

        this.baseConvertedValue = element.conversionValue;
      }
    });

  }
  /**Convert basevalueConverted value to required Unit value  */
  destConversion() {
    this.length_list.forEach((element: any) => {

      if (this.lengthForm.value.toUnit.toLowerCase() == element.value.toLowerCase()) {
        this.dstConvertedValue = (this.baseConvertedValue) / (element.conversionValue);
      }
    });

  }
  /**Convert destUnit  to final amt */
  finalConversion() {

    this.baseConversion();
    this.destConversion();
    if (this.baseConvertedValue != '' && this.dstConvertedValue != '')
      this.result = this.lengthForm.value.amount * this.dstConvertedValue;
    this.amt = this.lengthForm.value.amount;
    this.fromValue = this.lengthForm.value.fromUnit;
    this.toValue = this.lengthForm.value.toUnit;
  }

  /**Add new unit */
  submitNewUnit() {
    if (this.valueCheck()) {
      this.length_list.push(
        {
          value: this.newLengthForm.value.newUnitName, viewValue: this.newLengthForm.value.newUnit,
          conversionValue: this.newLengthForm.value.conversionValue
        }
      )
      this.messageService.add(
        {
          severity: 'success', summary: 'Success Message', detail: 'New unit is added successfully,now you can do conversion for newly added unit'
        }
      )
      this.newUnit = false;
      this.newLengthForm.reset();
    }
    else {
      this.messageService.add(
        {
          severity: 'info', summary: 'Information Message', detail: 'Kindly Add New Unit as the input given already exist'
        }
      )
    }


  }

  valueCheck() {
    for (var i = 0; i < this.length_list.length; i++) {
      if (this.newLengthForm.value.newUnitName.toLowerCase() == this.length_list[i].value.toLowerCase())
        return false;
    }
    return true;
  }


}
