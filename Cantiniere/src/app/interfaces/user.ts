export interface User {
    
    //Required informations
    id: number;
    name: string;
    firstname: string;
    email: string;
    isLunchLady: boolean;
    wallet: number;
    status: number;

    //Optionnal informations
    sex?: number;
    imageId?: number;
    phone?: string;
    registrationDate?: Date;
    address?: string;
    postalCode?: number;
    town?: string;
}
