// NOTE: passwords are plaintext here only because this is mock/demo data.
// A real backend must hash passwords (bcrypt) and never send the hash to the client.
export const seedUsers = [
  { _id: 'u1', name: 'Ananya Verma', email: 'user@shophive.com', password: 'user123', role: 'user', createdAt: '2025-11-02' },
  { _id: 'u2', name: 'Admin User', email: 'admin@shophive.com', password: 'admin123', role: 'admin', createdAt: '2025-09-15' },
  { _id: 'u3', name: 'Rohan Mehta', email: 'rohan@shophive.com', password: 'rohan123', role: 'user', createdAt: '2026-01-10' },
  { _id: 'u4', name: 'Hillside Apiary', email: 'hillside@shophive.com', password: 'vendor123', role: 'vendor', avatar: 'https://picsum.photos/seed/vendor-hillside/200/200', description: 'A family-run apiary in the Nilgiri hills, tending hives across wildflower slopes for three generations.', createdAt: '2025-08-12' },
  { _id: 'u5', name: 'Golden Meadow Farms', email: 'goldenmeadow@shophive.com', password: 'vendor123', role: 'vendor', avatar: 'https://picsum.photos/seed/vendor-goldenmeadow/200/200', description: 'Small-batch honey and infusions from meadow apiaries, bottled in-house with a focus on single-origin flavor.', createdAt: '2025-10-03' },
  { _id: 'u6', name: 'Beehive Botanicals', email: 'beehive@shophive.com', password: 'vendor123', role: 'vendor', avatar: 'https://picsum.photos/seed/vendor-botanicals/200/200', description: 'Honey-based skincare and home goods, blending raw honey with gentle botanical ingredients.', createdAt: '2025-12-19' },
];
