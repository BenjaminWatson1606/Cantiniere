export interface Meal {
    label: string;
    price: number|null;
    category: string;
    categoryIndex?: number;
    edited?: boolean;
}
