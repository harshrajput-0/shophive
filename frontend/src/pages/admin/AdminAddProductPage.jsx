import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ProductForm from '../../components/ui/ProductForm';
import { createProduct } from '../../store/slices/productsSlice.js';
import { showToast } from '../../store/slices/uiSlice.js';

export default function AdminAddProductPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    // BACKEND ISSUE: POST /products only allows role "vendor" — an admin
    // account will get a 403 here no matter what. See chat summary.
    const result = await dispatch(createProduct(data));
    if (result.meta.requestStatus === 'fulfilled') {
      dispatch(showToast('Product added', 'ok'));
      navigate('/admin/products');
    }
  };

  return (
    <div className="mx-auto max-w-140">
      <h1 className="mb-7.5 font-display text-[2rem] text-text">Add Product</h1>
      <ProductForm submitLabel="Add Product" submittingLabel="Adding…" onSubmit={handleSubmit} />
    </div>
  );
}
