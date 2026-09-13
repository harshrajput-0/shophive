import { useDispatch, useSelector } from "react-redux";
import { Trash2 } from "lucide-react";
import BackToHome from "../../components/ui/BackToHome";
import { inr } from "../../utils/formatCurrency.js";
import { selectProducts, deleteProduct } from "../../store/slices/productsSlice.js";
import { showToast } from "../../store/slices/uiSlice.js";

// Admins can only delete products 
// Adding/editing a product requires a vendor account 
export default function AdminProductsPage() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  const handleDelete = async (product) => {
    if (!confirm(`Delete "${product.name}"?`)) return;
    
    const result = await dispatch(deleteProduct(product._id));
    if (result.meta.requestStatus === "fulfilled") {
      dispatch(showToast(`${product.name} deleted`, "ok"));
    } else {
      dispatch(showToast(result.payload || "Could not delete product", "err"));
    }
  };

  return (
    <div>
      <BackToHome />
      <div className="mb-8.5 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-[clamp(2rem,4vw,2.6rem)] text-text">Manage Products</h1>
      </div>

      <div className="flex flex-col gap-3">
        {products.map((p) => (
          <div
            key={p._id}
            className="flex items-center gap-4 rounded-xl border border-border p-3.5"
          >
            <img
              src={p.imageUrl}
              alt={p.name}
              className="h-14 w-14 shrink-0 rounded-lg object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="font-bold text-text">{p.name}</p>
              <p className="text-[.83rem] text-text-secondary">
                {p.category} · Stock: {p.stock}
              </p>
            </div>
            <p className="font-bold whitespace-nowrap text-primary">{inr(p.price)}</p>
            <button
              onClick={() => handleDelete(p)}
              aria-label="Delete"
              className="flex cursor-pointer border-none bg-none p-1.5 text-danger"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}