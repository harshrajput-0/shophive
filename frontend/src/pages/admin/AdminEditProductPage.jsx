import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProductForm from '../../components/ui/ProductForm';
import { selectProductById, updateProduct } from '../../store/slices/productsSlice.js';
import { showToast } from '../../store/slices/uiSlice.js';

export default function AdminEditProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector(selectProductById(id));
  const status = useSelector((state) => state.products.status);

  if (status === 'succeeded' && !product) return <Navigate to="/admin/products" replace />;
  if (!product) return null;

  const handleSubmit = async (data) => {
    // BACKEND ISSUE: PUT /products/:id only allows role "vendor" (and only
    // the owning vendor at that) — an admin account will get a 403 here no
    // matter what. See chat summary.
    const result = await dispatch(updateProduct({ id, data }));
    if (result.meta.requestStatus === 'fulfilled') {
      dispatch(showToast('Product updated', 'ok'));
      navigate('/admin/products');
    }
  };

  return (
    <div className="mx-auto max-w-140">
      <h1 className="mb-7.5 font-display text-[2rem] text-text">Edit Product</h1>
      <ProductForm initialValues={product} imageRequired={false} submitLabel="Save Changes" submittingLabel="Saving…" onSubmit={handleSubmit} />
    </div>
  );
}
