import { Meal } from "./meal-model";

export interface Menu {
    categories: MenuCategory[];
}

interface MenuCategory{
    label: string;
    meals: Meal[];
}
