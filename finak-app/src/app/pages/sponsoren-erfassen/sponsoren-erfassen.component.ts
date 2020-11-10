import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {DatabaseServiceService} from '../../services/database-service.service';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-sponsoren-erfassen',
  templateUrl: './sponsoren-erfassen.component.html',
  styleUrls: ['./sponsoren-erfassen.component.sass']
})
export class SponsorenErfassenComponent implements OnInit, OnDestroy {

  public firstName: FormControl = new FormControl('');
  public lastName: FormControl = new FormControl('');
  public amount: FormControl = new FormControl('');
  public ZIPCode: FormControl = new FormControl('');
  public city: FormControl = new FormControl('');
  public isFixedAmount: FormControl = new FormControl('');
  public deliveryMethod: FormControl = new FormControl('');
  public notes: FormControl = new FormControl('');
  public email: FormControl = new FormControl('', [Validators.email]);
  public address: FormControl = new FormControl('');

  private sponsor: Observable<any>;
  private sponsorId = '';
  private routeSub: Subscription;
  public partId: any;


  constructor(private dbService: DatabaseServiceService, private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.routeSub = this.route.params.subscribe(params => {

      this.sponsorId = params.id; // log the value of id
      this.partId = params.partId; // log the value of id

      if (this.sponsorId) {

        console.log('Load Values: ' + this.sponsorId);

        this.sponsor = this.dbService
          .load_sponsor(this.sponsorId).pipe(take(1));

        this.sponsor.subscribe(spon => {

          this.email.setValue(spon.email);
          this.notes.setValue(spon.notes);
          this.deliveryMethod.setValue(spon.delivery_method);
          this.isFixedAmount.setValue(spon.is_fixed_amount);
          this.city.setValue(spon.address_city);
          this.ZIPCode.setValue(spon.address_plz);
          this.amount.setValue(spon.amount);
          this.address.setValue(spon.address_street);
          this.lastName.setValue(spon.last_name);
          this.firstName.setValue(spon.first_name);
          this.notes.setValue(spon.notes);

        });

      }

    });

  }


  getErrorMessageMail() {
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  saveSponsor() {

    const data = {
      first_name: this.firstName.value,
      last_name: this.lastName.value,
      is_fixed_amount: this.isFixedAmount.value,
      amount: this.amount.value,
      email: this.email.value,
      address_street: this.address.value,
      address_plz: this.ZIPCode.value,
      address_city: this.city.value,
      delivery_method: this.deliveryMethod.value,
      sponsor_of: this.partId,
      notes: this.notes.value,

    };

    if (this.sponsorId === undefined) {
      this.dbService.createDocument('sponsoren', data).then(r => console.log(r));
    } else {
      this.dbService.updateDocument('sponsoren/' + this.sponsorId, data).then(r => console.log(r));
    }

  }


  ngOnDestroy() {

    this.routeSub.unsubscribe();


  }

}
