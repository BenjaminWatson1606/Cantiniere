import { Component, Input } from '@angular/core';
import { Order } from 'src/app/interfaces/order';
import { OrdersService } from 'src/app/services/orders/orders.service';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss'],
})
export class OrderCardComponent{

  @Input() order!: Order;

  constructor(
    private ordersService: OrdersService,
  ) { }

  //Get order date from ordersService
  getOrderDate(order: Order){
    return this.ordersService.getOrderDate(order);
  }
}
