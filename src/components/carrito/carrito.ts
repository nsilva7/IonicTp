import { Component } from '@angular/core';
import { Carrito, Item } from '../../clases/carrito';
import { CarritoProvider } from '../../providers/carrito/carrito';
import { UserProvider } from '../../providers/user/user';
/**
 * Generated class for the CarritoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'carrito',
  templateUrl: 'carrito.html'
})
export class CarritoComponent {
  carrito:Carrito;
  uid:string;

  constructor(private carritoService:CarritoProvider,private userService:UserProvider) {
  this.actualizarCarrito();
}

actualizarCarrito() {
  this.userService.getUser().subscribe(user => {
    this.carritoService.getCarrito(user.uid).then(res => {
      for(let key in res){
        this.carrito = res[key];
        break;
      }
  });
});
}
ngOnInit() {
  this.carritoService.agregarProducto$.subscribe(res => {
    this.actualizarCarrito();
    console.log("se actualizo el carrito");
  })
}
}
