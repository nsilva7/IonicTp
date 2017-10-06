import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../clases/user';
/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  constructor(private af:AngularFireAuth, public http: Http) {
  }

  getUser() {
    return this.af.authState;
  }

  getUserId() {
    return this.af.authState.toPromise();
  }
  guardarUser(user){
    var url = "https://tarea-fe.firebaseio.com/api/usuarios/"+user.id+".json";
    this.http.put(url, user).subscribe(res => console.log(res));
  }
}
