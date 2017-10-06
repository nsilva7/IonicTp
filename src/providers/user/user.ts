import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  constructor(private af:AngularFireAuth) {
  }

  getUser() {
    return this.af.authState;
  }

  getUserId() {
    return this.af.authState.toPromise();
  }
}
