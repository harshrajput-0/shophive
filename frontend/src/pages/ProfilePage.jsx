import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pencil } from "lucide-react";
import { inr } from "../utils/formatCurrency.js";
import { statusBadgeClass } from "../utils/badgeClasses.js";
import { resolveOrderItem } from "../utils/resolveOrderItem.js";
import { fetchMyOrders, selectOrders } from "../store/slices/ordersSlice.js";
import { selectProducts } from "../store/slices/productsSlice.js";
import { updateProfile } from "../store/slices/authSlice.js";
import { showToast } from "../store/slices/uiSlice.js";
import Button from "../components/ui/Button.jsx";
import BackToHome from "../components/ui/BackToHome.jsx";

const inputClass =
  "w-full rounded-lg border border-border-strong bg-bg-secondary p-[13px] text-[15px] text-text outline-none";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const orders = useSelector(selectOrders);
  const products = useSelector(selectProducts);

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    avatar: user?.avatar || "",
    description: user?.description || "",
  });

  useEffect(() => {
    if (user) dispatch(fetchMyOrders(user._id));
  }, [dispatch, user]);

  const setField = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const startEditing = () => {
    setForm({
      name: user.name || "",
      avatar: user.avatar || "",
      description: user.description || "",
    });
    setEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const result = await dispatch(updateProfile(form));
    setSaving(false);
    if (result.meta.requestStatus === "fulfilled") {
      dispatch(showToast("Profile updated", "ok"));
      setEditing(false);
    } else {
      dispatch(showToast(result.payload || "Could not update profile", "err"));
    }
  };

  return (
    <div>
      <BackToHome />

      {editing ? (
        <form
          onSubmit={handleSave}
          className="mb-10 flex flex-col gap-4 rounded-[14px] border border-border-strong p-6.5"
        >
          <h2 className="mb-1 font-display text-[1.3rem] text-text">Edit Profile</h2>
          <input
            className={inputClass}
            placeholder="Name"
            required
            value={form.name}
            onChange={setField("name")}
          />
          <input
            className={inputClass}
            placeholder="Avatar image URL"
            value={form.avatar}
            onChange={setField("avatar")}
          />
          <textarea
            className={inputClass}
            placeholder="Short description (shown on your storefront if you're a vendor)"
            rows={3}
            value={form.description}
            onChange={setField("description")}
          />
          <div className="flex gap-3">
            <Button type="submit" disabled={saving} className="border-none disabled:opacity-60">
              {saving ? "Saving…" : "Save Changes"}
            </Button>
            <Button type="button" variant="secondary" onClick={() => setEditing(false)}>
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <div className="mb-10 flex flex-wrap items-center gap-5.5">
          {user.avatar && (
            <img
              src={user.avatar}
              alt={user.name}
              className="h-22.5 w-22.5 rounded-full border-2 border-border-strong object-cover"
            />
          )}
          <div className="flex-1">
            <div className="mb-1.5 flex flex-wrap items-center gap-3">
              <h1 className="font-display text-[clamp(2.2rem,4vw,3rem)] text-text">{user.name}</h1>
              <button
                onClick={startEditing}
                aria-label="Edit profile"
                className="flex cursor-pointer items-center gap-1.5 border-none bg-none text-[.85rem] text-text-secondary"
              >
                <Pencil size={15} /> Edit
              </button>
            </div>
            <p className="text-text-secondary">{user.email}</p>
            {user.description && (
              <p className="mt-2 max-w-140 leading-[1.6] text-text-secondary">{user.description}</p>
            )}
          </div>
        </div>
      )}

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
                  {order.createdAt && (
                    <p className="text-[.83rem] text-text-secondary">{order.createdAt}</p>
                  )}
                </div>
                <span
                  className={`h-fit rounded-full px-3.5 py-1.25 text-[.78rem] font-bold ${statusBadgeClass(order.status)}`}
                >
                  {order.status}
                </span>
              </div>
              <div className="mb-3.5 flex flex-col gap-2">
                {order.items.map((rawItem) => {
                  const item = resolveOrderItem(rawItem, products);
                  return (
                    <div
                      key={item.productId}
                      className="flex justify-between text-[.88rem] text-text-secondary"
                    >
                      <span>
                        {item.name} × {item.qty}
                      </span>
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
