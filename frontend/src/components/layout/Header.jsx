import { useState } from "react";
import HexLogo from "../ui/HexLogo";
import { IconButton } from "../ui/IconButton";
import {
  ShoppingBag,
  ShoppingCart,
  User,
  // LogOut,
  // LayoutDashboard,
  // Package,
  Menu
} from 'lucide-react';
import { Link } from "react-router-dom";



const LINKS = [
  { label: "Shop", href: "/", icon: ShoppingBag, },
  { label: "Cart", href: "/cart", icon: ShoppingCart, },
  { label: "Login", href: "/login", icon: User, },
  // { id: "profile", href: "/profile", icon: User, auth: "user", },
  // { id: "logout", label: "Logout", href: "#", icon: LogOut, auth: "user", },
  // { id: "admin", label: "Dashboard", href: "/admin", icon: LayoutDashboard, auth: "user", roles: ["admin"], },
  // { id: "vendor", label: "Products", href: "/vendor/products", icon: Package, auth: "user", roles: ["vendor"], },
];




const linkStyle = "flex items-center gap-[7px] text-[14.5px] font-semibold text-text-secondary bg-transparent border-0 cursor-pointer font-inherit py-[9px] px-4 rounded-lg relative no-underline";

const Header = () => {
  const [open, setOpen] = useState(false);





  
  return (
    <nav className="flex justify-between items-center px-10 py-4.5 bg-black/85 backdrop-blur-[14px] border-b border-border sticky top-0 z-1000 flex-wrap" >
      <div className="flex items-center gap-2.5">
        <Link href="/" className=" font-display text-[25px] font-bold text-cream flex items-center gap-2.5 no-underline ">
          <HexLogo />
          ShopHive
        </Link>
      </div>

      <div className="flex">
        <IconButton onClick={() => setOpen((v) => !v)} variant="ghost" icon={<Menu />}
        className={`hidden bg-none border border-(--border-strong) rounded-[7px] w-9.5 h-9.5 text-(--text) cursor-pointer navToggle sm:hidden`}/>


        {/* {LINKS.map(({ label, href, icon: Icon }) => (
          <Link key={label} href={href} className={`${linkStyle}`}>
            <Icon size={20} />
            {label}
          </Link>
        ))} */}

{/*    
   {LINKS.map((link) => {
  const Icon = link.icon;

  const label =
    link.id === "profile"
      ? user?.name
      : link.label;

  return (
    <Link key={link.id} href={link.href}>
      <Icon size={19} />
      {label}
    </Link>
  );
})} */}


    

      <ul className={`flex items-center gap-2 list-none navbar-links${open ? ' open' : ''}`
      }>

        
  {LINKS.map(({ label, href, icon: Icon }) => (
    <li>
          <Link key={label} href={href} className={`${linkStyle}`}>
            <Icon size={20} />
            {label}
          </Link>
          </li>
        ))}
      </ul>
   </div>

    </nav>
  )
}

export default Header