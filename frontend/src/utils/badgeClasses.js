// Small color-coded "pill" badges used for order status and user role.
// Each returns a Tailwind className string (background tint + matching text color).

export const statusBadgeClass = (status) => {
  if (status === 'Delivered') return 'bg-success/15 text-success';
  if (status === 'Shipped') return 'bg-info/15 text-info';
  return 'bg-primary/15 text-primary';
};

export const roleBadgeClass = (role) => {
  if (role === 'admin') return 'bg-primary/15 text-primary';
  if (role === 'vendor') return 'bg-info/15 text-info';
  return 'bg-success/15 text-success';
};
