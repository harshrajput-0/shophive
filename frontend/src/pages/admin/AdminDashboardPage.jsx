import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Package, ClipboardList, Users } from "lucide-react";
import { StatCard } from "../../components/ui/StatCard";
import { selectProducts } from "../../store/slices/productsSlice.js";
import { fetchAllOrders, selectOrders } from "../../store/slices/ordersSlice.js";
import { fetchUsers, selectUsers } from "../../store/slices/usersSlice.js";
import { inr } from "../../utils/formatCurrency.js";
import BackToHome from "../../components/ui/BackToHome";

const navLinkClass =
  "flex items-center gap-2.5 rounded-xl border border-border-strong px-5 py-4 text-[14.5px] font-bold text-text no-underline";

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
      <BackToHome />
      <h1 className="mb-8.5 font-display text-[clamp(2rem,4vw,2.6rem)] text-text">
        Admin Dashboard
      </h1>
      <div className="mb-8 grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4.5">
        <StatCard label="Total Revenue" value={inr(revenue)} />
        <StatCard label="Total Orders" value={orders.length} />
        <StatCard label="Total Products" value={products.length} />
        <StatCard label="Total Users" value={users.length} />
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3.5">
        <Link to="/admin/products" className={navLinkClass}>
          <Package size={18} /> Manage Products
        </Link>
        <Link to="/admin/orders" className={navLinkClass}>
          <ClipboardList size={18} /> Manage Orders
        </Link>
        <Link to="/admin/users" className={navLinkClass}>
          <Users size={18} /> Manage Users
        </Link>
      </div>
    </div>
  );
}