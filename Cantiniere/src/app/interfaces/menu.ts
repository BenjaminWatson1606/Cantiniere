import { Meal } from "./meal";

export interface Menu {
    id: number;
    label: string;
    status: string;
    imageId?: number;
    priceDF: number;
    meals: Meal[];
}