import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { Order } from 'src/app/interfaces/order';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-pop-up-cart',
  templateUrl: './pop-up-cart.component.html',
  styleUrls: ['./pop-up-cart.component.scss'],
})
export class PopUpCartComponent implements OnInit {
  isAuthenticated: boolean = false;
  userId: number | null = null;
  userOrders: Order[] = [];
  totalOrderPrice: number = 0;
  user: User | null = null;
  currentDay: string | undefined;

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private authService: AuthenticationService,
    private ordersService: OrdersService,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.currentDay = new Date().toLocaleDateString('fr-FR', { weekday: 'long' });

    // Subscribe to authentication status changes
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
      if (isAuthenticated) {
        // If authenticated, fetch user ID and orders
        this.authService.getUserId().subscribe((userId) => {
          this.userId = userId;
          if (userId !== null) {
            this.fetchUserOrders(userId);
            this.usersService.getUserInformations().subscribe(
              (user) => {
                this.user = user ?? null;
              },
              (error) => {
                console.error('Error fetching user information:', error);
              }
            );
          }
        });
      } else {
        this.userId = null;
        this.userOrders = []; // Clear orders when the user is not authenticated
      }
    });
  }

  // Fetch orders for the current user
  fetchUserOrders(userId: number) {
    const ordersObservable = this.ordersService.getOrdersForUser(userId);
    if (ordersObservable) {
      ordersObservable.subscribe(
        (orders) => {
          this.userOrders = orders;
          console.log('User orders:', orders);
          this.calculateTotalOrderPrice();
        },
        (error) => {
          console.error('Error fetching user orders:', error);
          this.presentToast(
            'Failed to fetch orders. Please try again later.',
            'danger'
          );
        }
      );
    } else {
      console.error('Orders service returned undefined.');
      this.presentToast(
        'Failed to fetch orders. Please try again later.',
        'danger'
      );
    }
  }

  // Cancel an order
  async cancelOrder(orderId: number) {
    if (!this.isAuthenticated) {
      const toast = await this.toastController.create({
        message: 'You are not authenticated.',
        duration: 2000,
        position: 'middle',
      });
      toast.present();
      return;
    }

    this.ordersService.cancelOrder(orderId).subscribe(
      () => {
        this.presentToast('Commande annulée avec succès.', 'success');
        // After successful cancellation, refresh the list of orders
        if (this.userId !== null) {
          this.fetchUserOrders(this.userId);
        }
      },
      (error) => {
        console.error('Failed to cancel order:', error);
        this.presentToast('Veuillez réessayer ultérieurement', 'danger');
      }
    );
  }

  async validateOrder() {
    if (!this.isAuthenticated) {
      // Show a toast message indicating that the user is not authenticated
      const toast = await this.toastController.create({
        message: 'You are not authenticated.',
        duration: 2000, // 2 seconds
        position: 'middle',
      });
      toast.present();
    } else {
      // Proceed with order validation logic, use this.userId for user ID
    }
  }

  calculateTotalOrderPrice() {
    this.totalOrderPrice = this.userOrders.reduce(
      (total, order) =>
        total +
        (order.quantity[0]?.meal?.priceDF || 0) *
          (order.quantity[0]?.quantity || 0),
      0
    );
  }

  // Close the cart modal
  closeCartModal() {
    this.modalController.dismiss();
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'middle',
    });
    toast.present();
  }
}
