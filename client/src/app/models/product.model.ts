import {Market} from './market.model';

export class Product {
  ID?: number;
  Name: string;
  Price: number;
  Amount: number;
  Image: string;
  Market: Market;
}
