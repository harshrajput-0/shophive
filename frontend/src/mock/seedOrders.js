import { seedProducts } from './seedProducts';

const imgOf = (id) => seedProducts.find((p) => p._id === id)?.imageUrl;

export const seedOrders = [
  { _id: 'o1', userId: 'u1', items: [{ productId: 'p1', name: 'Raw Wildflower Honey', price: 349, imageUrl: imgOf('p1'), qty: 2 }], totalAmount: 698, address: { fullName: 'Ananya Verma', street: '12 MG Road', city: 'Bengaluru', postalCode: '560001', country: 'India' }, paymentId: 'test_txn_1001', status: 'Delivered', createdAt: '2026-06-14' },
  { _id: 'o2', userId: 'u1', items: [{ productId: 'p12', name: 'Honey Gift Box', price: 1299, imageUrl: imgOf('p12'), qty: 1 }, { productId: 'p7', name: 'Honey Lip Balm', price: 149, imageUrl: imgOf('p7'), qty: 2 }], totalAmount: 1597, address: { fullName: 'Ananya Verma', street: '12 MG Road', city: 'Bengaluru', postalCode: '560001', country: 'India' }, paymentId: 'test_txn_1002', status: 'Shipped', createdAt: '2026-07-22' },
  { _id: 'o3', userId: 'u3', items: [{ productId: 'p4', name: 'Wild Honeycomb', price: 599, imageUrl: imgOf('p4'), qty: 1 }], totalAmount: 599, address: { fullName: 'Rohan Mehta', street: '44 Park Street', city: 'Kolkata', postalCode: '700016', country: 'India' }, paymentId: 'test_txn_1003', status: 'Pending', createdAt: '2026-08-01' },
];
