import { Meal } from "./meal";
import { Menu } from "./menu";
import { User } from "./user";

export interface Order {
    id: number;
    quantity: OrderItem[];
    creationDate: string;
    creationTime: string;
    meal?: Meal;
    menu?: Menu;
    user?: User;
    status?: string;
}

interface OrderItem{
    quantity: number;
    meal?: Meal;
    menu?: Menu;
    user?: User;
} 