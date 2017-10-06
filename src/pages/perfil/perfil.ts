import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { User } from '../../clases/user';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapOptions,
 CameraPosition,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';

/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
  user:User;
  map: GoogleMap;
  mapElement: HTMLElement;
  constructor(public navCtrl: NavController, public navParams: NavParams,private userService:UserProvider,private googleMaps: GoogleMaps) {
    this.user= new User;
  }

  ngOnInit() {
    this.userService.getUser().subscribe(user => this.user.nombre = user.displayName);
  }
  guardarUser(){
    this.userService.getUser().subscribe(user =>{
      this.user.id = user.uid;
      this.userService.guardarUser(this.user);
    });
  }

  ionViewDidLoad() {
  }

  updateSexo(sexo) {
    this.user.sexo=sexo;
  }
}
