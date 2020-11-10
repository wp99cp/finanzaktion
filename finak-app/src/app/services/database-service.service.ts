import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatabaseServiceService {

  constructor(
    private db: AngularFirestore
  ) {


  }

  public load_user(userId: string) {

    return this.db.doc('users/' + userId).snapshotChanges()
      .pipe(map(docRef => docRef.payload.data()));

  }

  public load_participant(partId: string) {

    return this.db.doc('participants/' + partId).snapshotChanges()
      .pipe(map(docRef => docRef.payload.data()));

  }

  public load_sponsor(sponsorId: string) {

    return this.db.doc('sponsoren/' + sponsorId,).snapshotChanges()
      .pipe(map(docRef => docRef.payload.data()));

  }

  public load_route(routeId: string) {

    return this.db.doc('routen/' + routeId).snapshotChanges()
      .pipe(map(docRef => docRef.payload.data()));

  }


  load_sponsoren(partId: string) {

    const collRef = (partId !== undefined) ?
      this.db.collection('sponsoren', p => p.where('sponsor_of', '==', partId)) :
      this.db.collection('sponsoren');

    return collRef.snapshotChanges()
      .pipe(map(docAction => docAction.map(doc => doc.payload.doc.data())));

  }

  createDocument(path: string, data: {}) {
    return this.db.collection(path).add(data);
  }


  updateDocument(path: string, data: {}) {
    return this.db.doc(path).update(data);

  }

}
