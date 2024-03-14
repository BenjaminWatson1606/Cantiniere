import { Meal } from "./meal-model";

export interface Order {
    id: number;
    quantity: OrderItem[];
    creationDate: string;
    creationTime: string;
}

interface OrderItem{
    quantity: number;
    meal?: Meal;
} 