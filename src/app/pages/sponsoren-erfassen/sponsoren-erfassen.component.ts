import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
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

  public partId: any;
  public group = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    amount: new FormControl('', {validators: [Validators.pattern(/^(\d){1,4}(\.\d{1,2})?$/)]}),
    ZIPCode: new FormControl('', {validators: [Validators.pattern(/^\d\d\d\d$/)]}),
    city: new FormControl(''),
    donation_type: new FormControl('per_km'),
    deliveryMethod: new FormControl('mail'),
    notes: new FormControl(''),
    email: new FormControl('', {validators: [Validators.email]}),
    address: new FormControl(''),
  });
  private sponsor: Observable<any>;
  private sponsorId = '';
  private routeSub: Subscription;

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

          this.group.setValue({
            email: spon.email,
            notes: spon.notes,
            deliveryMethod: spon.delivery_method,
            isFixedAmount: spon.is_fixed_amount,
            city: spon.address_city,
            ZIPCode: spon.address_plz,
            amount: spon.amount,
            address: spon.address_street,
            lastName: spon.last_name,
            firstName: spon.first_name,
          });

        });

      }

    });

  }


  getErrorMessageMail() {
    return this.group.get('email').hasError('email') ? 'Not a valid email' : '';
  }

  saveSponsor() {

    const data = {
      first_name: this.group.get('firstName').value,
      last_name: this.group.get('lastName').value,
      is_fixed_amount: this.group.get('isFixedAmount').value,
      amount: this.group.get('amount').value,
      email: this.group.get('email').value,
      address_street: this.group.get('address').value,
      address_plz: this.group.get('ZIPCode').value,
      address_city: this.group.get('city').value,
      delivery_method: this.group.get('deliveryMethod').value,
      sponsor_of: this.partId,
      notes: this.group.get('notes').value,

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
