import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectToasts, dismissToast } from '../../store/slices/uiSlice';

const kindColor = {
  ok: 'border-l-success',
  err: 'border-l-danger',
  default: 'border-l-primary',
};

function Toast({ toast }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const t = setTimeout(() => dispatch(dismissToast(toast.id)), 2600);
    return () => clearTimeout(t);
  }, [toast.id, dispatch]);

  return (
    <div
      className={`max-w-75 rounded-[9px] border border-border-strong border-l-4 bg-[#0d0d0d] px-4.5 py-3.5 text-[0.9rem] font-semibold text-text shadow-[0_10px_30px_rgba(0,0,0,0.6)] ${
        kindColor[toast.kind] || kindColor.default
      }`}
    >
      {toast.message}
    </div>
  );
}

export default function ToastHost() {
  const toasts = useSelector(selectToasts);

  return (
    <div className="fixed bottom-6.5 right-6.5 z-2000 flex flex-col gap-2.5">
      {toasts.map((t) => (
        <Toast key={t.id} toast={t} />
      ))}
    </div>
  );
}