// import React from 'react'
import Hero from "../components/Hero";
import { Link } from "react-router-dom";

import { CATEGORIES } from "../utils/constants";
import { chipClass } from "../components/ui/CategoryChips";
import ProductGrid from "../components/ui/ProductGrid";
import { useSelector } from "react-redux";
import { selectProducts, selectProductsStatus } from "../store/slices/productsSlice";

const HomePage = () => {
  const products = useSelector(selectProducts);
  const status = useSelector(selectProductsStatus);
  return (
    <>
      <Hero />

      <h2 className="mb-4.5 font-display text-[clamp(2.2rem,4vw,2.9rem)] text-text">
        Shop by category
      </h2>
      <div className="mb-11.5 flex flex-wrap gap-3">
        {CATEGORIES.map((c) => (
          <Link key={c} to={`/shop?cat=${encodeURIComponent(c)}`} className={chipClass(false)}>
            {c}
          </Link>
        ))}
      </div>

      <div className="my-15 flex items-center gap-2.5">
        <span className="h-px flex-1 bg-border-strong" />
        <span className="text-[.72rem] tracking-[.16em] whitespace-nowrap text-text-secondary uppercase">
          Featured this week
        </span>
        <span className="h-px flex-1 bg-border-strong" />
      </div>

      <ProductGrid
        products={products.slice(0, 4)}
        loading={status === "loading" || status === "idle"}
      />
    </>
  );
};

export default HomePage;
