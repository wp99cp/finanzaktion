import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map, mergeMap} from 'rxjs/operators';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class DatabaseServiceService {

  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth,
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

  load_participants() {

    return this.auth.user.pipe(mergeMap(user => {

      console.log(user.displayName);

      const collRef = this.db.collection('participants', p =>
        p.where('access.' + user.uid, 'in', ['owner']));

      return collRef.snapshotChanges()
        .pipe(map(docAction => docAction.map(doc => {
          const data: any = doc.payload.doc.data();
          data.id = doc.payload.doc.id;
          return data;
        })));

    }));

  }

  public load_sponsor(sponsorId: string) {

    return this.db.doc('sponsoren/' + sponsorId).snapshotChanges()
      .pipe(map(docRef => docRef.payload.data()));

  }

  public load_route(routeId: string) {

    return this.db.doc('routen/' + routeId).snapshotChanges()
      .pipe(map(docRef => docRef.payload.data()));

  }


  public load_routen(partId: string) {

    const collRef = (partId !== undefined) ?
      this.db.collection('routes', p => p.where('route_of', '==', partId)) :
      this.db.collection('routes');

    return collRef.snapshotChanges()
      .pipe(map(docAction => docAction.map(doc => {
        const data: any = doc.payload.doc.data();
        data.id = doc.payload.doc.id;
        return data;
      })));
  }

  load_sponsoren(partId: string) {

    if (partId === undefined) {
      throw new Error('Undefined partId');
    }

    return this.auth.user.pipe(mergeMap(user => {

      const collRef = this.db.collection('sponsoren', p => p
        .where('sponsor_of', '==', partId)
        .where('access.' + user.uid, 'in', ['owner']));

      return collRef.snapshotChanges()
        .pipe(map(docAction => docAction.map(doc => {
          const data: any = doc.payload.doc.data();
          data.id = doc.payload.doc.id;
          return data;
        })));

    }));

  }

  createDocument(path: string, data: any) {

    return new Promise((resolve, reject) => this.auth.user.subscribe(user => {
      data.access = {[user.uid]: 'owner'};
      this.db.collection(path).add(data).then(r => resolve(r)).catch(err => reject(err));
    }));

  }


  updateDocument(path: string, data: any) {

    return new Promise((resolve, reject) => this.auth.user.subscribe(user => {
      data.access = {[user.uid]: 'owner'};
      return this.db.doc(path).update(data).then(r => resolve(r)).catch(err => reject(err));
    }));

  }

}
