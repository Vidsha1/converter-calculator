import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {
  //active tab value
  active: number = 0;
  id: any

  constructor(private route: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.paramMap.get('id');


    if (this.id == 'length') {
      this.active = 1;
    }
    else {
      this.active = 0;
    }

  }
  onTabClick(e: any) {

    if (e.tab.textLabel.toLowerCase() == 'length converter') {

      this.route.navigate(['/conversion', 'length']);
    }
    else {

      this.route.navigate(['/conversion', 'currency']);
    }
  }
}
