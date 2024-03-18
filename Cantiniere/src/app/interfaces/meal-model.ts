export interface Meal {
    id: number;
    label: string;
    priceDF: number|null;
    category: string;
    edited?: boolean;
    selected?: boolean;
}