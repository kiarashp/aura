// One way to show money everywhere on the site, e.g. "€1,299.00".
const euro = new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' });
export const formatPrice = (amount: number) => euro.format(amount);
