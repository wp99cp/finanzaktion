import {Component} from '@angular/core';
import {TemplateHeaderComponent} from '../template-header/template-header.component';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.sass']
})
export class MainMenuComponent {


  public closeMenu() {
    TemplateHeaderComponent.showMenu();
  }


}
