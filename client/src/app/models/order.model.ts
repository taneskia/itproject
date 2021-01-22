import { Product } from "./product.model";

export class Order {
  ID?: number;
  OrderState: OrderState;
  ProductOrder: Product[];
}

export enum OrderState {
  Ordered,
  Accepted,
  InProgress,
  Done
}
