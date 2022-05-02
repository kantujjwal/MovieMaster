import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/Services/cart.service';
import { CartItem } from 'src/app/Models/movie.modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from 'src/app/Services/order.service';
import { Order, OrderItem } from 'src/app/Models/order.model';
import { AuthService } from 'src/app/Services/auth.service';
import { TokenStorageService } from 'src/app/Services/token-storage.service';

@Component({
  selector: 'app-moviecart',
  templateUrl: './moviecart.component.html',
  styleUrls: ['./moviecart.component.scss']
})
export class MoviecartComponent implements OnInit {

  addressFormGroup: FormGroup;
  constructor(public cart: CartService, private _formBuilder: FormBuilder,
    private order: OrderService, private token: TokenStorageService) {
    this.addressFormGroup = this._formBuilder.group({
      shippingAddress: ['', Validators.required],
      billingAddress: ['', Validators.required],
      contactNo: ['', Validators.required],
    }); }

  ngOnInit(): void {
  }

  remove(id: string){
    this.cart.remove(id);
  }

  clear(){
    this.cart.clear();
  }

  setDefImg(movie: CartItem){
    movie.posterurl = ["https://media.gettyimages.com/vectors/cinema-poster-with-cola-filmstrip-and-clapper-vector-vector-id1244034031?s=612x612"];
  }
  getTotal(){
    return this.cart.cartItems.reduce((a, b) => a  + (b.rate * b.days), 0);
  }

  submitOrder(){
    const user = this.token.getUser();
    if(user){
    const payload: Order = {OrderDate: new Date(),Amount: this.getTotal() ,PaidAmount: 0, BillingAddress: this.addressFormGroup.value.billingAddress ,DeliveryAddress: this.addressFormGroup.value.shippingAddress, ContactNo: this.addressFormGroup.value.contactNo, Penalty: 0, id:user.id+(new Date()).toISOString() , UserId: user.id , DeliveryStatus: "Pendding" ,PaymentMode: "COD",PaymentStatus:"Pendding", Items: this.cart.cartItems.map((item:CartItem)=> 
      ({
        id: item.id,
        scheduledays: item.days,
        posterurl: item.posterurl,
        title: item.title,
        rate: item.rate
      })
    )};

    this.order.createOrder(payload).subscribe((resp: any)=>
    {
      console.log(resp);
      this.clear();
    });
  }
}
}
