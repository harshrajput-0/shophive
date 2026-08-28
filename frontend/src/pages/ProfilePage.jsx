import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { inr } from '../utils/formatCurrency.js';
import { statusBadgeClass } from '../utils/badgeClasses.js';
import { resolveOrderItem } from '../utils/resolveOrderItem.js';
import { fetchMyOrders, selectOrders } from '../store/slices/ordersSlice.js';
import { selectProducts } from '../store/slices/productsSlice.js';

export default function ProfilePage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const orders = useSelector(selectOrders);
  const products = useSelector(selectProducts);

  useEffect(() => {
    if (user) dispatch(fetchMyOrders(user._id));
  }, [dispatch, user]);

  return (
    <div>
      <h1 className="mb-2 font-display text-[clamp(2.2rem,4vw,3rem)] text-text">{user.name}</h1>
      <p className="mb-10 text-text-secondary">{user.email}</p>

      <h2 className="mb-5 font-display text-[1.5rem] text-text">Order History</h2>

      {orders.length === 0 ? (
        <div className="rounded-[14px] border border-dashed border-border-strong px-7.5 py-15 text-center text-text-secondary">
          You haven't placed any orders yet.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div key={order._id} className="rounded-[14px] border border-border-strong p-5.5">
              <div className="mb-4 flex flex-wrap justify-between gap-2.5">
                <div>
                  <p className="font-bold text-text">Order #{order._id}</p>
                  {order.createdAt && <p className="text-[.83rem] text-text-secondary">{order.createdAt}</p>}
                </div>
                <span className={`h-fit rounded-full px-3.5 py-1.25 text-[.78rem] font-bold ${statusBadgeClass(order.status)}`}>
                  {order.status}
                </span>
              </div>
              <div className="mb-3.5 flex flex-col gap-2">
                {order.items.map((rawItem) => {
                  const item = resolveOrderItem(rawItem, products);
                  return (
                    <div key={item.productId} className="flex justify-between text-[.88rem] text-text-secondary">
                      <span>{item.name} × {item.qty}</span>
                      <span className="text-text">{inr(item.price * item.qty)}</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between border-t border-border pt-3 font-bold text-primary">
                <span>Total</span>
                <span>{inr(order.totalAmount)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
