import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Search } from "lucide-react";
import { CategoryChips } from "../components/ui/CategoryChips";
import ProductGrid from "../components/ui/ProductGrid";
import { selectProducts, selectProductsStatus } from "../store/slices/productsSlice.js";

// Extra left padding on the search input makes room for the icon inside it.
const searchInputClass =
  "w-full rounded-[10px] border border-border-strong bg-bg-secondary py-3.5 pr-4 pl-11 text-[15px] text-text outline-none";
const selectClass =
  "rounded-[10px] border border-border-strong bg-bg-secondary px-4 py-3.5 text-[14px] text-text outline-none";

export default function ShopPage() {
  const products = useSelector(selectProducts);
  const status = useSelector(selectProductsStatus);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  const category = searchParams.get("cat") || "";
  const setCategory = (c) => setSearchParams(c ? { cat: c } : {});

  const visible = useMemo(() => {
    let list = products.filter((p) => (category ? p.category === category : true));
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "name-asc") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [products, category, search, sort]);

  return (
    <>
      <h1 className="mb-7.5 font-display text-[clamp(2.2rem,4vw,3rem)] text-text">Shop the Hive</h1>

      <div className="mb-7.5 flex flex-wrap gap-3">
        <div className="relative min-w-55 flex-1">
          <Search
            size={17}
            className="absolute top-1/2 left-4 -translate-y-1/2 text-text-secondary"
          />
          <input
            className={searchInputClass}
            type="text"
            placeholder="Search honey, soap, candles…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select className={selectClass} value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="default">Sort: Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A–Z</option>
        </select>
      </div>

      <CategoryChips value={category} onChange={setCategory} />

      <ProductGrid
        products={visible}
        loading={status === "loading" || status === "idle"}
        skeletonCount={8}
      />
    </>
  );
}
