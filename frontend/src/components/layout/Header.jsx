import { useState } from "react";
import HexLogo from "../ui/HexLogo";
import { IconButton } from "../ui/IconButton";
import {
  ShoppingBag,
  ShoppingCart,
  User,
  LogOut,
  LayoutDashboard,
  Package,
  Menu,
} from "lucide-react";
import { Link } from "react-router-dom";

import { logout } from "../../store/slices/authSlice";
import { fetchProducts } from "../../store/slices/productsSlice";
import { selectCartCount } from "../../store/slices/cartSlice";
import { showToast } from "../../store/slices/uiSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const linkClass =
  "relative flex items-center gap-1.5 rounded-lg px-3.5 py-2.5 text-[14.5px] font-semibold text-text-secondary no-underline";

const Header = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const cartCount = useSelector(selectCartCount);

  const handleLogout = () => {
    dispatch(logout());
    // Products are fetched once at app startup and never refetched by the
    // pages that read them, so re-pull the real DB state here — this is
    // what actually discards any unsaved mock vendor/admin product edits
    // instead of leaving them visible for whoever uses the app next.
    dispatch(fetchProducts());
    dispatch(showToast("Signed out"));
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-10 py-4.5 bg-black/85 backdrop-blur-[14px] border-b border-border sticky top-0 z-1000 flex-wrap">
      <div className="flex items-center gap-2.5">
        <Link
          to="/"
          className=" font-display text-[25px] font-bold text-cream flex items-center gap-2.5 no-underline "
        >
          <HexLogo />
          ShopHive
        </Link>
      </div>

      <div className="flex">
        <IconButton
          onClick={() => setOpen((v) => !v)}
          variant="ghost"
          icon={<Menu />}
          className={`hidden bg-none border border-(--border-strong) rounded-[7px] w-9.5 h-9.5 text-(--text) cursor-pointer navToggle sm:hidden`}
        />

        <ul
          className={`${open ? "flex" : "hidden"} absolute top-full right-0 left-0 flex-col items-stretch gap-2 border-b border-border bg-black/97 px-5 pt-2.5 pb-5 list-none md:static md:flex md:w-auto md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0`}
        >
          <li>
            <Link to="/shop" className={linkClass}>
              <ShoppingBag size={19} /> <span>Shop</span>
            </Link>
          </li>
          <li>
            <Link to="/cart" className={linkClass}>
              <ShoppingCart size={19} /> <span>Cart</span>
              {cartCount > 0 && (
                <span className="flex h-4.25 min-w-4.25 items-center justify-center rounded-[9px] bg-primary px-1 text-[.68rem] font-extrabold text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link to="/profile" className={linkClass}>
                  <User size={19} /> <span>{user.name.split(" ")[0]}</span>
                </Link>
              </li>
              {user.role === "admin" && (
                <li>
                  <Link to="/admin" className={linkClass}>
                    <LayoutDashboard size={19} /> <span>Dashboard</span>
                  </Link>
                </li>
              )}
              {user.role === "vendor" && (
                <li>
                  <Link to="/vendor-dashboard" className={linkClass}>
                    <Package size={19} /> <span>Inventory</span>
                  </Link>
                </li>
              )}
              <li>
                <button
                  onClick={handleLogout}
                  className={`${linkClass} cursor-pointer border-none bg-none font-[inherit] text-danger!`}
                >
                  <LogOut size={19} /> <span>Logout</span>
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className={linkClass}>
                <User size={19} /> <span>Login</span>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;