import { Component, OnInit } from '@angular/core';
import { Order, OrderItem } from 'src/app/Models/order.model';
import { OrderService } from 'src/app/Services/order.service';
import { TokenStorageService } from 'src/app/Services/token-storage.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  orders: any[] = [];
  isAdmin = false;
  constructor(private order: OrderService,
    private token: TokenStorageService) { }

  ngOnInit(): void {
    const user = this.token.getUser();
    this.isAdmin = !!user?.roles.includes("ADMIN") ;
    this.order.getOrders().subscribe((data: any) => {
      this.orders = this.isAdmin ? data : data.filter((x: any) => x.UserId === user?.id);
      this.orders.forEach((item)=>{
            item.opened = false;
        });
    });
  }

  remove(id: string){
    // this.cart.remove(id);
  }

  setDefImg(movie: OrderItem){
    movie.posterurl = ["https://media.gettyimages.com/vectors/cinema-poster-with-cola-filmstrip-and-clapper-vector-vector-id1244034031?s=612x612"];
  }

  getTotal(order: any){
    return order.Items.reduce((a:any, b:any) => a  + (b.rate * b.scheduledays), 0);
  }


}
