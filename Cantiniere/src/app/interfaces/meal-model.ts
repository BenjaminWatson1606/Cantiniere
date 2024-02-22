export interface Meal {
    label: string;
    price: number|null;
    category: string;
    id?: number;
    edited?: boolean;
}