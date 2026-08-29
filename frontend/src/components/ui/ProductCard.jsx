import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { inr } from "../../utils/formatCurrency.js";
import { addItem, selectCartItems } from "../../store/slices/cartSlice.js";
import { showToast } from "../../store/slices/uiSlice.js";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  // The backend embeds the vendor directly on each product (populated),
  // so no separate user lookup is needed here.
  const vendor = product.vendor;
  const cartItems = useSelector(selectCartItems);

  const handleQuickAdd = () => {
    const existing = cartItems.find((x) => x.productId === product._id);
    dispatch(
      addItem({
        productId: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        qty: (existing?.qty || 0) + 1,
      })
    );
    dispatch(showToast(`${product.name} added to cart`, "ok"));
  };

  return (
    <div className="relative flex flex-col overflow-hidden rounded-[14px] border border-border bg-bg-secondary">
      {/* Image + badges */}
      <div className="relative h-52.5 overflow-hidden bg-black">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="block h-full w-full object-cover"
        />
        {/* Category ribbon, cut into a chevron shape with clip-path */}
        <span className="absolute top-3.5 left-0 [clip-path:polygon(0_50%,12%_0,100%_0,100%_100%,12%_100%)] bg-primary px-4.5 py-1.75 pr-4 text-[.66rem] font-extrabold tracking-[.04em] text-primary-foreground uppercase">
          {product.category}
        </span>
        {product.stock === 0 && (
          <span className="absolute top-3.5 right-3.5 rounded-md bg-black/75 px-2.5 py-1.25 text-[.68rem] font-bold text-danger">
            Sold out
          </span>
        )}
      </div>

      {/* Details */}
      <div className="flex grow flex-col gap-1.5 px-5 pt-4.5 pb-5 text-left">
        <h3 className="overflow-hidden font-display text-[1.1rem] font-semibold text-ellipsis whitespace-nowrap text-text">
          {product.name}
        </h3>
        {vendor?.name && (
          <Link
            to={`/vendor/${vendor._id}`}
            className="text-[.79rem] font-semibold text-text-secondary"
          >
            by {vendor.name}
          </Link>
        )}
        <p className="my-1 mb-2.5 font-display text-[1.4rem] font-bold text-primary">
          {inr(product.price)}
        </p>
        <div className="flex gap-2">
          <Link
            to={`/product/${product._id}`}
            className="flex-1 rounded-[9px] border border-border-strong bg-transparent px-3 py-2.5 text-center text-[.85rem] font-bold text-text"
          >
            View
          </Link>
          <button
            onClick={handleQuickAdd}
            disabled={product.stock === 0}
            className="flex-1 cursor-pointer rounded-[9px] border border-primary bg-primary px-3 py-2.5 text-[.85rem] font-bold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
