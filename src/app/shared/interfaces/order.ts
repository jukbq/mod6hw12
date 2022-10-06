export interface OrderRequest {
    login: string
    email: string;
    phone: number;
    order: {
        name: string;
        count: number;
        price: number; 
        images: string;
    }
}

export interface OrderResponse extends OrderRequest {
       id: number;
}