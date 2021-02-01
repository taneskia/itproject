import { Product } from './product.model';

export class Order {
    ID?: number;
    OrderState: OrderState;
    ProductOrder: Product[];
    Address: string;
}

export enum OrderState {
    Ordered,
    Accepted,
    InProgress,
    Done,
}
