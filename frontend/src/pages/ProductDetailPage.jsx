import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/ui/Button";
import { inr } from "../utils/formatCurrency.js";
import { selectProductById, selectProductsStatus } from "../store/slices/productsSlice.js";
import { addItem, selectCartItems } from "../store/slices/cartSlice.js";
import { showToast } from "../store/slices/uiSlice.js";
import { QtyStepper } from "../components/ui/QtyStepper";

export default function ProductDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const status = useSelector(selectProductsStatus);
  const product = useSelector(selectProductById(id));
  // The backend embeds the vendor directly on each product (populated).
  const vendor = product?.vendor;
  const cartItems = useSelector(selectCartItems);
  const [qty, setQty] = useState(1);

  if (status === "succeeded" && !product) return <Navigate to="/shop" replace />;
  if (!product) return null;

  const handleAdd = () => {
    const existing = cartItems.find((x) => x.productId === product._id);
    dispatch(
      addItem({
        productId: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        qty: (existing?.qty || 0) + qty,
      })
    );
    dispatch(showToast(`${product.name} added to cart`, "ok"));
  };

  return (
    <div>
      <div className="mb-6.5 text-[.85rem] text-text-secondary">
        <Link to="/shop" className="text-text-secondary">
          Shop
        </Link>{" "}
        / <span className="text-text">{product.name}</span>
      </div>

      {/* Image on the left, details on the right; stacks on mobile */}
      <div className="grid grid-cols-1 gap-12.5 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl bg-black">
          <img src={product.imageUrl} alt={product.name} className="block w-full" />
        </div>
        <div>
          <span className="mb-4 inline-block rounded-md bg-primary px-3.5 py-1.5 text-[.7rem] font-extrabold tracking-[.04em] text-primary-foreground uppercase">
            {product.category}
          </span>
          <h1 className="mb-2.5 font-display text-[clamp(2rem,4vw,2.6rem)] text-text">
            {product.name}
          </h1>
          {vendor?.name && (
            <Link
              to={`/vendor/${vendor._id}`}
              className="text-[.9rem] font-semibold text-text-secondary"
            >
              Sold by {vendor.name}
            </Link>
          )}
          <p className="my-4.5 font-display text-[2rem] font-bold text-primary">
            {inr(product.price)}
          </p>
          <p className="mb-6.5 leading-[1.75] text-text-secondary">{product.description}</p>
          <p
            className={`mb-6.5 text-[.85rem] font-semibold ${product.stock > 0 ? "text-success" : "text-danger"}`}
          >
            {product.stock > 0 ? `${product.stock} in stock` : "Currently sold out"}
          </p>
          {product.stock > 0 && (
            <div className="flex flex-wrap items-center gap-5.5">
              <QtyStepper
                value={qty}
                onDec={() => setQty((q) => Math.max(1, q - 1))}
                onInc={() => setQty((q) => Math.min(product.stock, q + 1))}
                max={product.stock}
              />
              <Button onClick={handleAdd} className="border-none">
                Add to Cart
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
