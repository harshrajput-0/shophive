import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { inr } from '../utils/formatCurrency.js';
import Button from '../components/ui/Button';
import { selectCartItems, selectCartSubtotal, clearCart } from '../store/slices/cartSlice.js';
import { placeOrder } from '../store/slices/ordersSlice.js';
import { showToast } from '../store/slices/uiSlice.js';

const inputClass = 'w-full rounded-lg border border-border-strong bg-bg-secondary p-[13px] text-[15px] text-text outline-none';

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const [address, setAddress] = useState({ fullName: user?.name || '', street: '', city: '', postalCode: '', country: 'India' });
  const [placing, setPlacing] = useState(false);

  if (items.length === 0) return <Navigate to="/shop" replace />;

  const setField = (field) => (e) => setAddress((a) => ({ ...a, [field]: e.target.value }));

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setPlacing(true);
    // BACKEND INTEGRATION: a real checkout would create a payment intent
    // (Stripe/Razorpay) here first, then only call placeOrder after the
    // payment confirms. This mock skips straight to order creation.
    const result = await dispatch(placeOrder({ userId: user._id, items, totalAmount: subtotal, address }));
    setPlacing(false);
    if (result.meta.requestStatus === 'fulfilled') {
      dispatch(clearCart());
      dispatch(showToast('Order placed!', 'ok'));
      navigate('/order-success', { state: { orderId: result.payload._id } });
    }
  };

  return (
    <div>
      <h1 className="mb-8.5 font-display text-[clamp(2.2rem,4vw,3rem)] text-text">Checkout</h1>
      <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[1fr_340px]">
        <form onSubmit={handlePlaceOrder} className="flex flex-col gap-4 rounded-[14px] border border-border-strong p-6.5">
          <h2 className="mb-1 font-display text-[1.3rem] text-text">Shipping Address</h2>
          <input className={inputClass} placeholder="Full Name" required value={address.fullName} onChange={setField('fullName')} />
          <input className={inputClass} placeholder="Street Address" required value={address.street} onChange={setField('street')} />
          <div className="flex gap-3.5">
            <input className={inputClass} placeholder="City" required value={address.city} onChange={setField('city')} />
            <input className={inputClass} placeholder="Postal Code" required value={address.postalCode} onChange={setField('postalCode')} />
          </div>
          <input className={inputClass} placeholder="Country" required value={address.country} onChange={setField('country')} />
          <p className="mt-1.5 text-[.82rem] text-text-secondary">
            Payment is simulated in this concept — no card details are collected.
          </p>
          <Button type="submit" disabled={placing} className="border-none disabled:opacity-60">
            {placing ? 'Placing Order…' : `Pay ${inr(subtotal)}`}
          </Button>
        </form>

        <div className="rounded-[14px] border border-border-strong p-6.5">
          <h2 className="mb-4.5 font-display text-[1.3rem] text-text">Order Summary</h2>
          <div className="mb-4.5 flex flex-col gap-3">
            {items.map((item) => (
              <div key={item.productId} className="flex justify-between text-[.9rem] text-text-secondary">
                <span>{item.name} × {item.qty}</span>
                <span className="text-text">{inr(item.price * item.qty)}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between border-t border-border-strong pt-4 font-display text-[1.2rem] font-bold text-text">
            <span>Total</span>
            <span>{inr(subtotal)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
