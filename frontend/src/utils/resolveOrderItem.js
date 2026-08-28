
export function resolveOrderItem(item, products) {
  const product = products.find((p) => p._id === item.productId);
  return {
    ...item,
    name: item.name || product?.name || 'Product no longer available',
    imageUrl: item.imageUrl || product?.imageUrl || '',
  };
}
