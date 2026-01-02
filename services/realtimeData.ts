import { Product, Order, Stats } from '../types';

export const PRODUCTS: Product[] = [
  { id: 1, name: 'Fresh Apples', price: 2.99, category: 'Produce', image: '🍎' },
  { id: 2, name: 'Whole Milk', price: 3.49, category: 'Dairy', image: '🥛' },
  { id: 3, name: 'Sourdough Bread', price: 4.50, category: 'Bakery', image: '🍞' },
  { id: 4, name: 'Free-range Eggs', price: 5.99, category: 'Dairy', image: '🥚' },
  { id: 5, name: 'Bananas', price: 1.29, category: 'Produce', image: '🍌' },
  { id: 6, name: 'Cheddar Cheese', price: 6.99, category: 'Dairy', image: '🧀' },
];

export const RECENT_ORDERS: Order[] = [
  { id: 'ORD-001', customerName: 'Alice Smith', totalAmount: 15.45, status: 'Completed', date: '2023-10-25' },
  { id: 'ORD-002', customerName: 'Bob Jones', totalAmount: 8.99, status: 'Pending', date: '2023-10-26' },
  { id: 'ORD-003', customerName: 'Charlie Day', totalAmount: 45.20, status: 'Completed', date: '2023-10-26' },
  { id: 'ORD-004', customerName: 'Dana Lee', totalAmount: 12.50, status: 'Pending', date: '2023-10-27' },
];

export const STATS: Stats = {
  totalSales: 12540.50,
  activeOrders: 12,
  totalProducts: 450,
};