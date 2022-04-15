import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  path: any;
  constructor(private route: Router) { }

  ngOnInit(): void {
  }
  conversionCalc(e: string) {
    this.path = e;
    this.route.navigate(['/conversion', e]);
  }
}
