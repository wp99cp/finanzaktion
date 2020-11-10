import {Component, OnInit} from '@angular/core';
import {DatabaseServiceService} from '../../services/database-service.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-konto-settings',
  templateUrl: './konto-settings.component.html',
  styleUrls: ['./konto-settings.component.sass']
})
export class KontoSettingsComponent implements OnInit {

  public userDataForm: FormGroup;
  public user: Observable<any>;

  constructor(private dbService: DatabaseServiceService, formBuilder: FormBuilder, public fireAuth: AngularFireAuth) {

    this.user = fireAuth.user;

    this.userDataForm = formBuilder.group({
      displayName: '',
      visibility: 'hidden' });


  }

  ngOnInit(): void {


  }

  updateUserData() {

  }

  visibilityChanged(value: string) {

  }
}
