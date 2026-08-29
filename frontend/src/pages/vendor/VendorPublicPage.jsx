import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductGrid from "../../components/ui/ProductGrid";
import { productService } from "../../services/product.service";
import { userService } from "../../services/user.service";
import BackToHome from "../../components/ui/BackToHome";

// Vendor profile (name/avatar/description) and their product list are fetched
// independently, so the storefront still renders correctly for a vendor with
// zero products. `status` reflects the vendor lookup; product loading is
// handled separately by ProductGrid's own `loading` prop.
export default function VendorPublicPage() {
  const { id } = useParams();

  const [vendor, setVendor] = useState(null);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    setProductsLoading(true);

    userService
      .getVendor(id)
      .then((data) => {
        if (cancelled) return;
        setVendor(data);
        setStatus("succeeded");
      })
      .catch(() => {
        if (!cancelled) setStatus("failed");
      });

    productService
      .getByVendor(id)
      .then((data) => {
        if (cancelled) return;
        setProducts(data);
      })
      .finally(() => {
        if (!cancelled) setProductsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (status === "failed") {
    return (
      <div className="px-5 py-22.5 text-center text-text-secondary">
        <BackToHome className="justify-center" />
        This vendor doesn't exist.
      </div>
    );
  }

  if (!vendor) return null;

  return (
    <div>
      <BackToHome />
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

          <p className="max-w-140 leading-[1.6] text-text-secondary">{vendor.description}</p>
        </div>
      </div>

      <h2 className="mb-5.5 font-display text-[1.5rem] text-text">Products from {vendor.name}</h2>

      <ProductGrid
        products={products}
        loading={productsLoading}
        emptyMessage="This vendor hasn't listed any products yet."
      />
    </div>
  );
}
