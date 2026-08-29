import ProductCard from "./ProductCard";

// const gridClass = 'mt-2.5 grid grid-cols-[repeat(auto-fill,minmax(258px,1fr))] gap-6.5';

const skeletonClass =
  "h-[340px] rounded-[14px] bg-[linear-gradient(90deg,var(--color-bg-secondary)_25%,var(--color-surface-3)_37%,var(--color-bg-secondary)_63%)] bg-[length:400%_100%] animate-[shimmer_1.4s_ease_infinite]";

export default function ProductGrid({
  products,
  loading,
  emptyMessage = "No products match your filters.",
  skeletonCount = 4,
}) {
  if (loading) {
    return (
      <div className="mt-2.5 grid grid-cols-[repeat(auto-fill,minmax(258px,1fr))] gap-6.5">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <div key={i} className={skeletonClass} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="col-span-full rounded-2xl border border-dashed border-border-strong px-7.5 py-17.5 text-center">
        <p className="text-[1.08rem] text-text-secondary">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="mt-2.5 grid grid-cols-[repeat(auto-fill,minmax(258px,1fr))] gap-6.5">
      {products.map((p) => (
        <ProductCard key={p._id} product={p} />
      ))}
    </div>
  );
}
