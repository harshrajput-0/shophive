// import React from 'react'
import Hero from "../components/Hero";
import { Link } from "react-router-dom";

import { CATEGORIES } from '../utils/constants';
import { chipClass } from '../components/ui/CategoryChips';

const HomePage = () => {
  return (
    <>
    <Hero />

          <h2 className="mb-4.5 font-display text-[clamp(2.2rem,4vw,2.9rem)] text-text">Shop by category</h2>
      <div className="mb-11.5 flex flex-wrap gap-3">
        {CATEGORIES.map((c) => (
          <Link key={c} to={`/shop?cat=${encodeURIComponent(c)}`} className={chipClass(false)}>
            {c}
          </Link>
        ))}
      </div>
    </>
  )
}

export default HomePage