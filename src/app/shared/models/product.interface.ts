export interface Rating {
  rate: number;
  count: number;
}
export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  qty: number;
  subTotal: number;
  rating: Rating;
}
