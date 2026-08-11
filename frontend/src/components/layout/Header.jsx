import HexLogo from "../common/logo";
import { IconButton } from "../ui/IconButton";
import {Menu} from "lucide-react";

const Header = () => {
  return (
   <nav className='h-16 bg-bg-transparent p-5 flex items-center justify-between text-text '>
    <div className="flex items-center gap-2.5">
    <a href="https://google.com" className=" font-display text-[25px] font-bold text-cream flex items-center gap-2.5 no-underline ">
      <HexLogo />
    ShopHive
    </a>
    </div>

<div className="flex items-center">
    <IconButton variant="ghost" icon={<Menu/>}/>

</div>

   </nav>
  )
}

export default Header