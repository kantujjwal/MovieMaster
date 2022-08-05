import { Injectable } from '@angular/core';
import { CartItem } from '../Models/movie.modal';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  CART_KEY = "MOVIE_CART"
  cartItems: CartItem[] = [];
  constructor() { 
    this.loadCart();
  }
  
  loadCart(){
    let cart = localStorage.getItem(this.CART_KEY);
    if(cart){
    this.cartItems = JSON.parse(cart);
    }
  }

  add(item: CartItem){
    this.cartItems.push(item);
    localStorage.setItem(this.CART_KEY, JSON.stringify(this.cartItems));
  }
  
  remove(id: string){
    let foundIdx = this.cartItems.findIndex(x=>x.id === id);
    if(foundIdx>=0){
      this.cartItems.splice(foundIdx, 1);
      localStorage.setItem(this.CART_KEY, JSON.stringify(this.cartItems));
    }
  }

  clear(){
    this.cartItems = [];
    window.localStorage.removeItem(this.CART_KEY);
  }
}
