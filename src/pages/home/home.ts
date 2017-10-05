import { Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { User } from '../../clases/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private user:User;
  constructor(public navCtrl: NavController,private userService:UserProvider) {
    this.user= new User;
  }

  ngOnInit() {
    this.userService.getUser().subscribe(user => this.user.nombre = user.displayName);
 }


}
