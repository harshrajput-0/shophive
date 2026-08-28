import { useLocation, Navigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import Button from '../components/ui/Button';
import BackToHome from '../components/ui/BackToHome';

export default function OrderSuccessPage() {
  const { state } = useLocation();
  if (!state?.orderId) return <Navigate to="/" replace />;

  return (
    <div className="mx-auto max-w-115 px-5 py-22.5 text-center">
      <BackToHome className="justify-center" />
      <CheckCircle2 size={64} className="mx-auto mb-5 text-success" />
      <h1 className="mb-3 font-display text-[2.2rem] text-text">Order placed!</h1>
      <p className="mb-1.5 text-text-secondary">
        Order <span className="font-bold text-primary">#{state.orderId}</span> is on its way.
      </p>
      <p className="mb-8.5 text-text-secondary">You can track its status any time from your profile.</p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button as='link' to="/profile">View My Orders</Button>
        <Button variant='secondary' as='link' to="/profile">Keep Shopping</Button>
      </div>
    </div>
  );
}