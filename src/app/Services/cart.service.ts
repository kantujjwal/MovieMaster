import { Injectable } from '@angular/core';
import { CartItem } from '../Models/movie.modal';
const CART_KEY = "MOVIE_CART";
@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  constructor() { 
    let cart = localStorage.getItem(CART_KEY);
    if(cart){
    this.cartItems = JSON.parse(cart);
    }
  }

  add(item: CartItem){
    this.cartItems.push(item);
    localStorage.setItem(CART_KEY, JSON.stringify(this.cartItems));
  }
  
  remove(id: string){
    let foundIdx = this.cartItems.findIndex(x=>x.id === id);
    if(foundIdx>=0){
      this.cartItems.splice(foundIdx, 1);
      localStorage.setItem(CART_KEY, JSON.stringify(this.cartItems));
    }
  }

  clear(){
    this.cartItems = [];
    window.localStorage.removeItem(CART_KEY);
  }
}
