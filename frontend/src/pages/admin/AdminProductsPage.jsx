import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Pencil, Trash2, Plus } from 'lucide-react';
import Button from '../../components/ui/Button';
import { inr } from '../../utils/formatCurrency.js';
import { selectProducts, deleteProduct } from '../../store/slices/productsSlice.js';
import { showToast } from '../../store/slices/uiSlice.js';

export default function AdminProductsPage() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  const handleDelete = (product) => {
    if (!confirm(`Delete "${product.name}"?`)) return;
    dispatch(deleteProduct(product._id));
    dispatch(showToast(`${product.name} deleted`));
  };

  return (
    <div>
      <div className="mb-8.5 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-[clamp(2rem,4vw,2.6rem)] text-text">Manage Products</h1>
        <Button as='link' to="/admin/add-product" className='inline-flex items-center gap-2'>
          <Plus size={18} /> Add Product
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        {products.map((p) => (
          <div key={p._id} className="flex items-center gap-4 rounded-xl border border-border p-3.5">
            <img src={p.imageUrl} alt={p.name} className="h-14 w-14 shrink-0 rounded-lg object-cover" />
            <div className="min-w-0 flex-1">
              <p className="font-bold text-text">{p.name}</p>
              <p className="text-[.83rem] text-text-secondary">{p.category} · Stock: {p.stock}</p>
            </div>
            <p className="font-bold whitespace-nowrap text-primary">{inr(p.price)}</p>
            <Link to={`/admin/edit-product/${p._id}`} aria-label="Edit" className="flex p-1.5 text-text-secondary">
              <Pencil size={18} />
            </Link>
            <button onClick={() => handleDelete(p)} aria-label="Delete" className="flex cursor-pointer border-none bg-none p-1.5 text-danger">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
