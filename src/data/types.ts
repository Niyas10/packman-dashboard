export interface Category {
  id: string;
  name: string;
  icon: React.ElementType;
}

export interface Product {
  id: string;
  cat: string;
  name: string;
  price: number;
  emoji: string;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  qty: number;
}

export interface CartMap {
  [productId: string]: number;
}
