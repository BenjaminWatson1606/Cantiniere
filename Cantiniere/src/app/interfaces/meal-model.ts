export interface Meal {
    label: string;
    priceDF: number|null;
    category: string;
    id?: number;
    edited?: boolean;
}