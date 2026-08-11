import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";


const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 min-h-[70h] px-6 pt-13 pb-22.5 mx-auto w-full max-w-340">
          <Outlet />
        </main>
        <Footer />
    </div>
  )
}

export default Layout