import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductForm from "../../components/ui/ProductForm";
import BackToHome from "../../components/ui/BackToHome";
import { selectProductById, updateProduct } from "../../store/slices/productsSlice.js";
import { showToast } from "../../store/slices/uiSlice.js";

export default function VendorEditProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const product = useSelector(selectProductById(id));
  const status = useSelector((state) => state.products.status);

  if (status === "succeeded" && !product) return <Navigate to="/vendor-dashboard" replace />;
  // `vendor` is a populated object ({ _id, name, ... }) on products from
  // GET /products — compare against its _id (there's no `vendorId` field).
  if (product && (product.vendor?._id || product.vendor) !== user._id)
    return <Navigate to="/vendor-dashboard" replace />;
  if (!product) return null;

  const handleSubmit = async (data) => {
    const result = await dispatch(updateProduct({ id, data }));
    if (result.meta.requestStatus === "fulfilled") {
      dispatch(showToast("Product updated", "ok"));
      navigate("/vendor-dashboard");
    }
  };

  return (
    <div className="mx-auto max-w-140">
      <BackToHome />
      <h1 className="mb-7.5 font-display text-[2rem] text-text">Edit Product</h1>
      <ProductForm
        initialValues={product}
        imageRequired={false}
        submitLabel="Save Changes"
        submittingLabel="Saving…"
        onSubmit={handleSubmit}
      />
    </div>
  );
}
