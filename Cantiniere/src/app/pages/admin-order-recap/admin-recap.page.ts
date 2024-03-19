import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { Order } from 'src/app/interfaces/order';
import { User } from 'src/app/interfaces/user';
import { ToastController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-recap',
  templateUrl: './admin-recap.page.html',
  styleUrls: ['./admin-recap.page.scss'],
})
export class AdminRecapPage implements OnInit {
  orders: Order[] = [];
  user: User | null = null;
  sortingOrders: { [key: string]: 'asc' | 'desc' } = {}; // Object to track sorting order for each column

  constructor(
    private ordersService: OrdersService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.getAllOrders();
  }

  getAllOrders() {
    this.ordersService.getAllOrders()?.subscribe(
      (orders: Order[]) => {
        this.orders = orders;
        console.log(this.orders);
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  cancelOrder(orderId: number) {
    this.ordersService.cancelOrder(orderId).subscribe(
      () => {
        console.log('Order canceled successfully');
        // After cancelling the order successfully, fetch updated orders
        this.getAllOrders();
      },
      (error) => {
        console.error('Error canceling order:', error);
      }
    );
  }

  async deliverAndPay(orderId: number) {
    try {
      await this.ordersService.deliverAndPay(orderId).toPromise();
      this.presentToast('Commande acceptée', 'success');
      // After delivering and paying the order successfully, fetch updated orders
      this.getAllOrders();
    } catch (error: any) {
      let errorMessage = 'Error delivering and paying order';
      if (error.error && error.error.exceptionMessage) {
        errorMessage = error.error.exceptionMessage;
      }
      this.presentToast(errorMessage, 'danger');
    }
  }
  

  translateStatus(status: string | undefined): string {
    if (!status) return '';
    switch (status) {
      case 'CANCELED':
        return 'ANNULÉ';
      case 'CREATED':
        return 'EN COURS';
      case 'DELIVERED':
        return 'ACCOMPLIE';
      default:
        return status;
    }
  }

  // Method to toggle sorting order
  toggleSortingOrder(column: string) {
    this.sortingOrders[column] =
      this.sortingOrders[column] === 'asc' ? 'desc' : 'asc';
  }

  // Method to sort orders by specified column
  sortByColumn(column: string) {
    this.orders.sort((a, b) => {
      const valueA = this.extractColumnValue(a, column);
      const valueB = this.extractColumnValue(b, column);
      if (valueA < valueB) {
        return this.sortingOrders[column] === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return this.sortingOrders[column] === 'asc' ? 1 : -1;
      }
      return 0;
    });

    // Toggle sorting order for next click
    this.toggleSortingOrder(column);
  }

  // Helper method to extract column value from order
  extractColumnValue(order: Order, column: string): any {
    switch (column) {
      case 'client':
        return `${order.user?.firstname} ${order.user?.name}`;
      case 'commande':
        return (
          order.quantity[0]?.meal?.label || order.quantity[0]?.menu?.label || ''
        );
      case 'prix':
        return (
          order.quantity[0]?.meal?.priceDF ||
          order.quantity[0]?.menu?.priceDF ||
          0
        );
      case 'cagnotte':
        return order.user?.wallet || 0;
      case 'status':
        return order.status || '';
      default:
        return '';
    }
  }

  async presentToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastController.create({
      message: message,
      color: color,
      duration: 2000 // Display for 2 seconds
    });
    toast.present();
  }
  
}
