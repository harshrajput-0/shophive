import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

// Small "← Back to Home" link for pages that sit outside the main
// shop→cart→checkout flow (or that a user can land on with no other
// way back except the header logo). 
export default function BackToHome({ className = "", label = "Back to Home" }) {
  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-1.5 text-[14px] font-semibold text-text-secondary no-underline hover:text-text mb-5 ${className}`}
    >
      <ArrowLeft size={16} />
      <span>{label}</span>
    </Link>
  );
}