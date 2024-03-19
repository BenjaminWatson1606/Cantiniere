import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Meal } from 'src/app/interfaces/meal';
import { MealService } from 'src/app/services/meal/meal.service';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-pop-up-order',
  templateUrl: './pop-up-order.component.html',
  styleUrls: ['./pop-up-order.component.scss'],
})
export class PopUpOrderComponent implements OnInit {
  @Input() day: string | undefined;
  dailyMeals: Meal[] = [];
  weekNumber: number | undefined;
  dayNumber: number | undefined;
  mealQuantities: { [key: number]: number } = {};
  userId: number | undefined;

  constructor(
    private modalController: ModalController,
    private mealService: MealService,
    private ordersService: OrdersService,
    private authService: AuthenticationService,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    // Fetch daily meals
    this.weekNumber = this.getCurrentWeek();
    this.dayNumber = this.getCurrentDayNumber();

    if (!this.weekNumber || !this.dayNumber) {
      console.error('Failed to get week number or day number.');
      return;
    }

    this.authService.getUserId().subscribe((userId) => {
      if (userId !== null) {
        this.userId = userId;
      } else {
        console.error('Failed to get user ID.');
      }
    });

    this.dailyMeals =
      (await this.mealService
        .getMealsToday(this.weekNumber, this.dayNumber)
        .toPromise()) || [];

    if (!this.dailyMeals) {
      console.error('Failed to fetch daily meals.');
      return;
    }

    // Initialize meal quantities
    this.dailyMeals.forEach((meal) => {
      this.mealQuantities[meal.id] = 0;
    });
  }

  closeOrderModal() {
    this.modalController.dismiss();
  }

  orderItems() {
    // Calculate total quantity of selected meals
    const totalQuantity = this.dailyMeals
      .filter((meal) => meal.selected)
      .reduce((total, meal) => total + (this.mealQuantities[meal.id] || 0), 0);

    // If total quantity is 0, don't proceed with the order
    if (totalQuantity === 0) {
      this.errorToast('Il faut ajouter au moins un plat ou menu pour commander');
      console.log('No items selected for order.');
      return;
    }

    // Prepare order payload
    const orderPayload = {
      userId: this.userId || 0,
      constraintId: -1,
      quantity: this.dailyMeals
        .filter((meal) => meal.selected)
        .map((meal) => ({
          quantity: this.mealQuantities[meal.id] || 0,
          mealId: meal.id,
          menuId: 0,
        })),
    };

    // Create the order
    this.ordersService.createOrder(orderPayload).subscribe(
      () => {
        console.log('Order created successfully.');
        this.presentToast('Commande validée');
        this.modalController.dismiss();
      },
      (error) => {
        console.error('Failed to create order:', error);
      }
    );
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'success',
      cssClass: 'toast-custom-class',
    });
    toast.present();
  }

  async errorToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'danger',
      cssClass: 'toast-custom-error-class',
    });
    toast.present();
  }

  incrementQuantity(meal: Meal) {
    this.mealQuantities[meal.id]++;
  }

  decrementQuantity(meal: Meal) {
    if (this.mealQuantities[meal.id] > 0) {
      this.mealQuantities[meal.id]--;
    }
  }

  getMealQuantity(mealId: number): number {
    return this.mealQuantities[mealId] || 0;
  }

  getCurrentWeek(): number {
    const now: Date = new Date();
    const onejan: Date = new Date(now.getFullYear(), 0, 1);
    const millisecsInDay: number = 86400000;
    const weekNum: number = Math.ceil(
      ((now.getTime() - onejan.getTime()) / millisecsInDay +
        onejan.getDay() +
        1) /
        7
    );
    return weekNum;
  }

  getCurrentDayNumber(): number | undefined {
    if (!this.day) return undefined;
    const daysMap: { [key: string]: number } = {
      Lundi: 1,
      Mardi: 2,
      Mercredi: 3,
      Jeudi: 4,
      Vendredi: 5,
      Samedi: 6,
      Dimanche: 7,
    };
    return daysMap[this.day];
  }
}
