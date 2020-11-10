import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {DatabaseServiceService} from '../../services/database-service.service';
import {Observable} from "rxjs";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-register-participant',
  templateUrl: './register-participant.component.html',
  styleUrls: ['./register-participant.component.sass']
})
export class RegisterParticipantComponent implements OnInit {
  lastName: FormControl = new FormControl('');
  firstName: FormControl = new FormControl('');
  ceviName: FormControl = new FormControl('');

  public  participants: Observable<any[]>;

  constructor(private dbService: DatabaseServiceService,     public userService: UserService,) {
  }

  ngOnInit(): void {

    this.participants = this.dbService.load_participants();
    this.participants.subscribe(console.log)

  }

  registerPart() {

    this.firstName.setValue('');
    this.lastName.setValue('');
    this.ceviName.setValue('');

    const data = {
      first_name: this.firstName.value,
      last_name: this.lastName.value,
      cevi_name: this.ceviName.value,
      stufe: 'unknwon',
    };

    this.dbService.createDocument('participants', data)
      .then(r => console.log(r));


  }

  setPart(id: string) {
    this.userService.partId = id;
  }

}
