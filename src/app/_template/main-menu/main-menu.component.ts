import {Component} from '@angular/core';
import {TemplateHeaderComponent} from '../template-header/template-header.component';
import {UserService} from '../../services/user.service';
import {AngularFireAuth} from '@angular/fire/compat/auth';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.sass']
})
export class MainMenuComponent {


  constructor(
    public fireAuth: AngularFireAuth,
    public userService: UserService,
  ) {


  }


  public closeMenu() {
    TemplateHeaderComponent.showMenu();
  }

  /**
   * signOut the current user
   */
  signOut() {

    console.log('User signed out started!');

    this.fireAuth.signOut()
      .then(() => console.log('User signed out!'));

  }


}
