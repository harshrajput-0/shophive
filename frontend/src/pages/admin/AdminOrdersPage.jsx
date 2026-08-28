import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { inr } from '../../utils/formatCurrency.js';
import { ORDER_STATUSES } from '../../utils/constants.js';
import { statusBadgeClass } from '../../utils/badgeClasses.js';
import { resolveOrderItem } from '../../utils/resolveOrderItem.js';
import { fetchAllOrders, selectOrders, updateOrderStatus } from '../../store/slices/ordersSlice.js';
import { selectProducts } from '../../store/slices/productsSlice';
import { showToast } from '../../store/slices/uiSlice.js';

const selectClass = 'rounded-lg border border-border-strong bg-bg-secondary px-3 py-2 text-[.85rem] text-text outline-none';

export default function AdminOrdersPage() {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const products = useSelector(selectProducts);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const handleStatusChange = async (order, status) => {
    const result = await dispatch(updateOrderStatus({ id: order._id, status }));
    if (result.meta.requestStatus === 'fulfilled') {
      dispatch(showToast(`Order #${order._id} marked ${status}`, 'ok'));
    } else {
      dispatch(showToast(result.payload || 'Could not update order status', 'err'));
    }
  };

  return (
    <div>
      <h1 className="mb-8.5 font-display text-[clamp(2rem,4vw,2.6rem)] text-text">Manage Orders</h1>

      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <div key={order._id} className="rounded-[14px] border border-border-strong p-5.5">
            <div className="mb-4 flex flex-wrap justify-between gap-3.5">
              <div>
                <p className="font-bold text-text">Order #{order._id}</p>
                <p className="text-[.83rem] text-text-secondary">
                  {order.createdAt && `${order.createdAt} · `}{order.address.fullName}, {order.address.city}
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <span className={`rounded-full px-3.5 py-1.25 text-[.78rem] font-bold ${statusBadgeClass(order.status)}`}>
                  {order.status}
                </span>
                <select className={selectClass} value={order.status} onChange={(e) => handleStatusChange(order, e.target.value)}>
                  {ORDER_STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-3.5 flex flex-col gap-1.5">
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
    </div>
  );
}
