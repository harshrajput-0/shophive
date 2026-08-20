// In-memory "database" standing in for a real backend. Every service file
// (src/services/*.js) reads and writes through the functions below instead
// of touching these arrays directly, so the arrays are the ONLY thing that
// needs deleting once a real API exists — see each service file's header
// comment for the exact request it should be replaced with.
import { seedProducts } from './seedProducts';
import { seedUsers } from './seedUsers';
import { seedOrders } from './seedOrders';

let products = [...seedProducts];
let users = [...seedUsers];
let orders = [...seedOrders];

const uid = (prefix) => prefix + Date.now();

// ---- products ----
export const dbGetProducts = () => products;
export const dbGetProductById = (id) => products.find((p) => p._id === id);
export const dbInsertProduct = (data) => {
  const product = { _id: uid('p'), ...data };
  products = [...products, product];
  return product;
};
export const dbUpdateProduct = (id, data) => {
  products = products.map((p) => (p._id === id ? { ...p, ...data } : p));
  return dbGetProductById(id);
};
export const dbDeleteProduct = (id) => {
  products = products.filter((p) => p._id !== id);
};

// ---- users ----
export const dbGetUsers = () => users;
export const dbGetUserById = (id) => users.find((u) => u._id === id);
export const dbFindByCredentials = (email, password) =>
  users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
export const dbFindByEmail = (email) => users.find((u) => u.email.toLowerCase() === email.toLowerCase());
export const dbInsertUser = (data) => {
  const user = { _id: uid('u'), role: 'user', createdAt: new Date().toISOString().slice(0, 10), ...data };
  users = [...users, user];
  return user;
};
export const dbUpdateUserRole = (id, role) => {
  users = users.map((u) =>
    u._id === id
      ? {
          ...u,
          role,
          avatar: role === 'vendor' ? u.avatar || `https://picsum.photos/seed/vendor-${u._id}/200/200` : u.avatar,
          description: role === 'vendor' ? u.description || `${u.name} is a Shophive vendor selling honey and honey-based goods.` : u.description,
        }
      : u
  );
  return dbGetUserById(id);
};

// ---- orders ----
export const dbGetOrders = () => orders;
export const dbGetOrdersByUser = (userId) => orders.filter((o) => o.userId === userId);
export const dbInsertOrder = (data) => {
  const order = { _id: uid('o'), paymentId: uid('test_txn_'), status: 'Pending', createdAt: new Date().toISOString().slice(0, 10), ...data };
  orders = [...orders, order];
  return order;
};
export const dbUpdateOrderStatus = (id, status) => {
  orders = orders.map((o) => (o._id === id ? { ...o, status } : o));
  return orders.find((o) => o._id === id);
};
