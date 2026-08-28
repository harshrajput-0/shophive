// import React from 'react'
import HexLogo from "../ui/HexLogo";
import { Link } from "react-router-dom";

const footerLink = "text-text-secondary text-[.88rem] font-semibold no-underline";
const Footer = () => {
  return (
    <footer className='border-t-2 border-border py-11 px-6 mt-auto max-w-full'>
      <div className='max-w-7xl mx-auto flex justify-between items-center gap-5 flex-wrap' >
        <div className='flex items-center gap-2.5 font-display text-[1.3rem] font-bold text-text'>
          <HexLogo />
          ShopHive
        </div>

        <div className="flex gap-5 flex-wrap">
          <Link to="/about" className={footerLink}>Our Story</Link>
          <Link to="/return-policy" className={footerLink}>Return Policy</Link>
          <Link to="/disclaimer" className={footerLink}>Disclaimer</Link>
        </div>
<div className="text-text-secondary text-[.85rem]">
@{new Date().getFullYear()} Shophive. All rights reserved.
</div>
      </div>

    </footer>
  )
}

export default Footer