import {Component, OnInit} from '@angular/core';
// @ts-ignore
import info from '../../../../package.json';


@Component({
  selector: 'app-template-footer',
  templateUrl: './template-footer.component.html',
  styleUrls: ['./template-footer.component.sass']
})
export class TemplateFooterComponent implements OnInit {

  public version: string = info.version;
  public copyrights: string = info.copyrights;

  constructor() {
  }

  ngOnInit() {
  }

}
