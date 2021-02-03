import { Product } from './product.model';

export class Order {
    orderID?: number;
    orderState: OrderState;
    address: string;
    products: Product[];
}

export enum OrderState {
    Ordered,
    Accepted,
    InProgress,
    Done,
}
