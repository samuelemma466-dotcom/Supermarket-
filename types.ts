export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

export interface Order {
  id: string;
  customerName: string;
  totalAmount: number;
  status: 'Pending' | 'Completed';
  date: string;
}

export interface Stats {
  totalSales: number;
  activeOrders: number;
  totalProducts: number;
}
