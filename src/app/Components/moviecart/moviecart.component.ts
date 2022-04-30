import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/Services/cart.service';
import { CartItem } from 'src/app/Models/movie.modal';

@Component({
  selector: 'app-moviecart',
  templateUrl: './moviecart.component.html',
  styleUrls: ['./moviecart.component.scss']
})
export class MoviecartComponent implements OnInit {

  constructor(public cart: CartService) { }

  ngOnInit(): void {
  }

  remove(id: string){
    this.cart.remove(id);
  }

  order(){
    this.clear()
  }

  clear(){
    this.cart.clear();
  }

  setDefImg(movie: CartItem){
    movie.posterurl = ["https://media.gettyimages.com/vectors/cinema-poster-with-cola-filmstrip-and-clapper-vector-vector-id1244034031?s=612x612"];
  }
}
