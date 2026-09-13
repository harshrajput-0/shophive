import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ProductForm from "../../components/ui/ProductForm";
import BackToHome from "../../components/ui/BackToHome";
import { createProduct } from "../../store/slices/productsSlice.js";
import { showToast } from "../../store/slices/uiSlice.js";

export default function VendorAddProductPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    // The backend gets the vendor from the logged-in user.
    // We don't need to send a vendorId.
    const result = await dispatch(createProduct(data));
    if (result.meta.requestStatus === "fulfilled") {
      dispatch(showToast("Product added", "ok"));
      navigate("/vendor-dashboard");
    } else {
      dispatch(showToast(result.payload || "Could not add product", "err"));
    }
  };

  return (
    <div className="mx-auto max-w-140">
      <BackToHome />
      <h1 className="mb-7.5 font-display text-[2rem] text-text">Add Product</h1>
      <ProductForm submitLabel="Add Product" submittingLabel="Adding…" onSubmit={handleSubmit} />
    </div>
  );
}