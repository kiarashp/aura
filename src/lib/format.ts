// One way to show money everywhere on the site, e.g. "€1,299.00".
const euro = new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' });
export const formatPrice = (amount: number) => euro.format(amount);

// One way to show dates, e.g. "14 Nov 2026".
const day = new Intl.DateTimeFormat('en-IE', { dateStyle: 'medium', timeZone: 'UTC' });
export const formatDate = (date: Date | string) => day.format(new Date(date));
