import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.sass']
})
export class StartPageComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  check_date() {
    const now = new Date().getTime();
    const before = new Date(2023, 6, 19).getTime();
    return (before - now) < 0;
  }

}
