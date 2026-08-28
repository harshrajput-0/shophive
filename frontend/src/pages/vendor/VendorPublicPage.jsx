import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductGrid from '../../components/ui/ProductGrid';
import { productService } from '../../services/product.service';

// BACKEND NOTE: there's no public "get vendor by id" endpoint, so the
// vendor's name/avatar/description are read off the first product in their
// GET /products/vendor/:vendorId list (that route populates `vendor` fully).
// If a vendor has zero products, we have no way to show their profile at all.
export default function VendorPublicPage() {
  const { id } = useParams();

  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    productService
      .getByVendor(id)
      .then((data) => {
        setProducts(data);
        setStatus('succeeded');
      })
      .catch(() => {
        setStatus('failed');
      });
  }, [id]);

  const vendor = products[0]?.vendor;

  if (status === 'succeeded' && !vendor) {
    return (
      <div className="px-5 py-22.5 text-center text-text-secondary">
        This vendor hasn't listed any products yet, so there's nothing to show here.
      </div>
    );
  }

  if (!vendor) return null;

  return (
    <div>
      <div className="mb-10 flex flex-wrap items-center gap-5.5">
        <img
          src={vendor.avatar}
          alt={vendor.name}
          className="h-22.5 w-22.5 rounded-full border-2 border-border-strong object-cover"
        />

        <div>
          <h1 className="mb-1.5 font-display text-[clamp(2rem,4vw,2.6rem)] text-text">
            {vendor.name}
          </h1>

          <p className="max-w-140 leading-[1.6] text-text-secondary">
            {vendor.description}
          </p>
        </div>
      </div>

      <h2 className="mb-5.5 font-display text-[1.5rem] text-text">
        Products from {vendor.name}
      </h2>

      <ProductGrid
        products={products}
        loading={status === 'loading'}
        emptyMessage="This vendor hasn't listed any products yet."
      />
    </div>
  );
}