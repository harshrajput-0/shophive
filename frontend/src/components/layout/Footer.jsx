// import React from 'react'
import HexLogo from "../common/logo";

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
          <a href="" className={footerLink}>Our Story</a>
          <a href="" className={footerLink}>Return Policy</a>
          <a href="" className={footerLink}>Disclaimer</a>
        </div>

      </div>

    </footer>
  )
}

export default Footer