import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StatCard } from '../../components/ui/StatCard';
import { selectProducts } from '../../store/slices/productsSlice.js';
import { fetchAllOrders, selectOrders } from '../../store/slices/ordersSlice.js';
import { fetchUsers, selectUsers } from '../../store/slices/usersSlice.js';
import { inr } from '../../utils/formatCurrency.js';

export default function AdminDashboardPage() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const orders = useSelector(selectOrders);
  const users = useSelector(selectUsers);

  useEffect(() => {
    dispatch(fetchAllOrders());
    dispatch(fetchUsers());
  }, [dispatch]);

  const revenue = orders.reduce((a, o) => a + o.totalAmount, 0);

  return (
    <div>
      <h1 className="mb-8.5 font-display text-[clamp(2rem,4vw,2.6rem)] text-text">Admin Dashboard</h1>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4.5">
        <StatCard label="Total Revenue" value={inr(revenue)} />
        <StatCard label="Total Orders" value={orders.length} />
        <StatCard label="Total Products" value={products.length} />
        <StatCard label="Total Users" value={users.length} />
      </div>
    </div>
  );
}
