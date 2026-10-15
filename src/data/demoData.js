export const initialTransactions = [
  { id: 1, merchant: 'Linear', detail: 'Software · Team card', date: 'Today, 10:42 AM', amount: -320, status: 'Complete', mark: 'L', tone: 'lavender' },
  { id: 2, merchant: 'Acme Studio', detail: 'Client payment · ACH', date: 'Today, 9:18 AM', amount: 4800, status: 'Complete', mark: 'A', tone: 'mint' },
  { id: 3, merchant: 'Figma', detail: 'Software · Team card', date: 'Yesterday', amount: -45, status: 'Complete', mark: 'F', tone: 'peach' },
  { id: 4, merchant: 'Notion', detail: 'Software · Virtual card', date: 'Oct 12, 2026', amount: -18, status: 'Complete', mark: 'N', tone: 'stone' },
  { id: 5, merchant: 'Northstar Labs', detail: 'Client payment · Wire', date: 'Oct 11, 2026', amount: 12500, status: 'Complete', mark: 'N', tone: 'blue' },
];
export const chartSeries = {
  '7 days': [42, 54, 46, 61, 57, 73, 66, 82, 74, 92, 87, 100],
  '30 days': [32, 40, 35, 48, 44, 58, 52, 69, 61, 80, 75, 94],
  '90 days': [25, 33, 30, 41, 38, 49, 46, 60, 56, 72, 69, 88],
};
export const navItems = ['Overview', 'Transactions', 'Cards', 'Payments', 'Invoices', 'Team', 'Analytics'];