import { Producto} from './producto';

export class Carrito {
  id:string;
  items:Item[];
  cantidadItems: number;
  montoTotal: number;
  usuario: string;

  constructor(){
    this.cantidadItems = 0;
    this.items = [];
  }
}

export class Item {
  producto:Producto;
  cantidad: number;
}
