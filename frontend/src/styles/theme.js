export const theme = {
  ink: '#000000',
  surface: '#0d0b08',
  surface2: '#161209',
  surface3: '#211a0e',
  border: 'rgba(230,190,120,.09)',
  border2: 'rgba(230,190,120,.2)',
  cream: '#f7efdd',
  muted: '#a99a7c',
  amber: '#c8a26a',
  amberDeep: '#a98350',
  amberLight: '#dcbb8b',
  amberInk: '#211a10',
  danger: '#d1583f',
  success: '#8caa54',
  info: '#5f96b0',

  fontDisplay: "'Fraunces', serif",
  fontBody: "'Manrope', sans-serif",
};

export const statusColor = (status) => {
  if (status === 'Delivered') return { bg: 'rgba(140,170,84,.14)', c: theme.success };
  if (status === 'Shipped') return { bg: 'rgba(95,150,176,.14)', c: theme.info };
  return { bg: 'rgba(217,164,65,.14)', c: theme.amber };
};

export const roleColor = (role) => {
  if (role === 'admin') return { bg: 'rgba(217,164,65,.16)', c: theme.amber };
  if (role === 'vendor') return { bg: 'rgba(95,150,176,.16)', c: theme.info };
  return { bg: 'rgba(140,170,84,.16)', c: theme.success };
};