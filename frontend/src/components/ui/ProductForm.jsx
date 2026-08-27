import { useState } from 'react';
import { CATEGORIES } from '../../utils/constants';

const inputClass =
  'w-full rounded-lg border border-border-strong bg-transparent p-[13px] font-[inherit] text-[15px] text-text outline-none';

function readImageAsDataUrl(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(file);
  });
}

export default function ProductForm({ initialValues, submitLabel, submittingLabel, imageRequired = true, onSubmit }) {
  const [name, setName] = useState(initialValues?.name || '');
  const [description, setDescription] = useState(initialValues?.description || '');
  const [price, setPrice] = useState(initialValues?.price ?? '');
  const [category, setCategory] = useState(initialValues?.category || '');
  const [stock, setStock] = useState(initialValues?.stock ?? '');
  const [imageDataUrl, setImageDataUrl] = useState(initialValues?.imageUrl || null);
  const [fileName, setFileName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    setImageDataUrl(await readImageAsDataUrl(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (imageRequired && !imageDataUrl) return;
    setSubmitting(true);
    await onSubmit({ name, description, price: Number(price), category, stock: Number(stock), imageUrl: imageDataUrl });
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input className={inputClass} type="text" placeholder="Product Name" required value={name} onChange={(e) => setName(e.target.value)} />
      <textarea className={inputClass} placeholder="Description" required rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
      <input className={inputClass} type="number" placeholder="Price" required value={price} onChange={(e) => setPrice(e.target.value)} />
      <select className={inputClass} required value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="" disabled>Category</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <input className={inputClass} type="number" placeholder="Stock Quantity" required value={stock} onChange={(e) => setStock(e.target.value)} />

      {/* Clicking anywhere on this label opens the hidden file input */}
      <label
        htmlFor="productImage"
        className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-[10px] border border-dashed border-primary px-4.5 py-8.5 text-center"
      >
        <span className={fileName ? 'text-[.9rem] font-bold text-primary' : 'text-[.88rem] font-normal text-text-secondary'}>
          {fileName || 'Click anywhere to upload product image'}
        </span>
        <input id="productImage" type="file" accept="image/*" required={imageRequired && !initialValues} onChange={handleFile} className="hidden" />
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 cursor-pointer rounded-[9px] border border-primary bg-primary px-7 py-3.5 text-[14.5px] font-bold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? submittingLabel : submitLabel}
      </button>
    </form>
  );
}
