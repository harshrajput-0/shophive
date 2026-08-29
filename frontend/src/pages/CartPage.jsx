import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react";
import Button from "../components/ui/Button.jsx";
import BackToHome from "../components/ui/BackToHome.jsx";
import { inr } from "../utils/formatCurrency.js";
import {
  addItem,
  removeItem,
  selectCartItems,
  selectCartSubtotal,
} from "../store/slices/cartSlice.js";
import { showToast } from "../store/slices/uiSlice.js";
import { QtyStepper } from "../components/ui/QtyStepper";

export default function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);

  const setQty = (item, qty) => {
    if (qty < 1) return;
    dispatch(addItem({ ...item, qty }));
  };
  const handleRemove = (item) => {
    dispatch(removeItem(item.productId));
    dispatch(showToast(`${item.name} removed from cart`));
  };

  if (items.length === 0) {
    return (
      <div className="px-5 py-22.5 text-center">
        <BackToHome className="justify-center" />
        <h1 className="mb-3.5 font-display text-[2.2rem] text-text">Your cart is empty</h1>
        <p className="mb-7 text-text-secondary">Add a few jars of honey and come back.</p>
        <Button as="link" to="/shop">
          Browse the Hive
        </Button>
      </div>
    );
  }

  return (
    <div>
      <BackToHome />
      <h1 className="mb-8.5 font-display text-[clamp(2.2rem,4vw,3rem)] text-text">Your Cart</h1>

      {/* Items list + summary sidebar; sidebar moves below the list on mobile */}
      <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[1fr_340px]">
        <div className="flex flex-col gap-4.5">
          {items.map((item) => (
            <div
              key={item.productId}
              className="flex items-center gap-4.5 rounded-[14px] border border-border p-4"
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="h-21 w-21 shrink-0 rounded-[10px] object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="mb-1 font-display text-[1.05rem] font-bold text-text">{item.name}</p>
                <p className="font-bold text-primary">{inr(item.price)}</p>
              </div>
              <QtyStepper
                value={item.qty}
                onDec={() => setQty(item, item.qty - 1)}
                onInc={() => setQty(item, item.qty + 1)}
                max={item.stock}
              />
              <button
                onClick={() => handleRemove(item)}
                aria-label="Remove item"
                className="cursor-pointer border-none bg-none p-1.5 text-text-secondary"
              >
                <X size={20} />
              </button>
            </div>
          ))}
        </div>

        <div className="sticky top-25 rounded-[14px] border border-border-strong p-6.5">
          <h2 className="mb-5 font-display text-[1.4rem] text-text">Order Summary</h2>
          <div className="mb-3 flex justify-between text-text-secondary">
            <span>Subtotal</span>
            <span>{inr(subtotal)}</span>
          </div>
          <div className="mb-5 flex justify-between text-text-secondary">
            <span>Shipping</span>
            <span className="text-success">Free</span>
          </div>
          <div className="mb-5.5 flex justify-between border-t border-border-strong pt-4 font-display text-[1.2rem] font-bold text-text">
            <span>Total</span>
            <span>{inr(subtotal)}</span>
          </div>

          <Button as="link" to="/checkout">
            Proceed to Checkout
          </Button>
          <Button variant="secondary" as="link" to="/shop">
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
}
