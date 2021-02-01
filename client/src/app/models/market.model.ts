import { Product } from './product.model';
import { User } from './user.model';

export class Market extends User {
  image: String;
  products?: Product[];
}
