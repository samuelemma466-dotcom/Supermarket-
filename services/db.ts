import { db } from '../firebase';
import { collection, getDocs, doc, writeBatch } from 'firebase/firestore';
import { PRODUCTS, RECENT_ORDERS } from './realtimeData';
import { Product, Order, Stats } from '../types';

// Helper to seed data if empty
const seedDataIfEmpty = async (collectionName: string, data: any[]) => {
  const colRef = collection(db, collectionName);
  const snapshot = await getDocs(colRef);
  
  if (snapshot.empty && data.length > 0) {
    console.log(`Seeding ${collectionName}...`);
    const batch = writeBatch(db);
    data.forEach((item) => {
      // Use string ID for orders, auto-ID for products if ID is number
      const docRef = doc(colRef, item.id ? String(item.id) : undefined);
      batch.set(docRef, item);
    });
    await batch.commit();
    console.log(`${collectionName} seeded.`);
    // Return the seed data immediately so we don't have to fetch again
    return data;
  }
  
  return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as any[];
};

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const data = await seedDataIfEmpty('products', PRODUCTS);
    // Ensure IDs are handled correctly (convert to number if your app expects numbers)
    return data.map((p: any) => ({ ...p, id: Number(p.id) || p.id }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return PRODUCTS; // Fallback to static
  }
};

export const fetchOrders = async (): Promise<Order[]> => {
  try {
    return await seedDataIfEmpty('orders', RECENT_ORDERS);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return RECENT_ORDERS;
  }
};

export const fetchStats = async (): Promise<Stats> => {
    // In a real app, this might be a separate doc or calculated via aggregation queries.
    // For now, we calculate it from the orders and products we have.
    const orders = await fetchOrders();
    const products = await fetchProducts();

    const totalSales = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const activeOrders = orders.filter(o => o.status === 'Pending').length;
    
    return {
        totalSales,
        activeOrders,
        totalProducts: products.length
    };
};
