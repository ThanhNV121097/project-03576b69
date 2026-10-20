/** The shape of a product row in src/data/products.json. */
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  unit: string;
  summary: string;
  details: string;
  image: string;
  featured: boolean;
  available: boolean;
  stock: number;
  specs: { label: string; value: string }[];
}

/** The shape of a category row in src/data/categories.json. */
export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

/** The shape of a review row in src/data/reviews.json. */
export interface Review {
  id: string;
  name: string;
  from: string;
  quote: string;
  rating: number;
  product: string;
}

/** The shape of a question in src/data/faq.json. */
export interface Question {
  id: string;
  question: string;
  answer: string;
}

/** The shape of a past order in src/data/orders.json. */
export interface OrderRow {
  id: string;
  placed: string;
  status: string;
  total: number;
  items: string;
}
