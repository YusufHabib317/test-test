export const authConfigRoutes = {
  DEFAULT_LOGIN_REDIRECT: '/',
  LOGIN_PATH: '/auth/login',
  REGISTER_PATH: '/auth/register',
  RESET_PASSWORD_PATH: '/auth/reset-password',
  VERIFY_PATH: '/auth/verify',
  OTP_EMAIL_VERIFY_PATH: '/auth/otp-email-verification',
} as const;

export const publicRoutes: readonly string[] = [
  authConfigRoutes.LOGIN_PATH,
  authConfigRoutes.REGISTER_PATH,
  authConfigRoutes.RESET_PASSWORD_PATH,
  authConfigRoutes.VERIFY_PATH,
  '/api/auth',
] as const;

export const ROUTES = {

  logout: { key: 'Log out', path: '/auth/logout', icon: 'logout' },
  root: {
    key: 'Home',
    path: '/',
    icon: 'home-2',
  },
  dashboard: {
    key: 'Statics',
    path: '/statics',
    icon: 'chart-dots-2',
  },
  supplier: {
    key: 'Supplier',
    path: '/dashboard/supplier',
    icon: 'user-down',
  },
  product: {
    key: 'Product',
    path: '/dashboard/product',
    icon: 'brand-codesandbox',
  },
  purchaseInvoice: {
    key: 'Purchase Invoice',
    path: '/dashboard/purchaseInvoice',
    icon: 'truck-return',
  },
  saleInvoice: {
    key: 'Sale Invoice',
    path: '/dashboard/saleInvoice',
    icon: 'truck-delivery',
  },
  payment: {
    key: 'Payment',
    path: '/dashboard/payment',
    icon: 'cash-register',
  },
  auditLog: {
    key: 'Audit Log',
    path: '/dashboard/auditLog',
    icon: 'logs',
  },
  expense: {
    key: 'Expense',
    path: '/dashboard/expense',
    icon: 'exposure',
  },
};

export const links = [
  {
    label: ROUTES.root.key,
    icon: ROUTES.root.icon,
    href: ROUTES.root.path,
  },
  {
    label: ROUTES.dashboard.key,
    icon: ROUTES.dashboard.icon,
    href: ROUTES.dashboard.path,
  },
  {
    label: ROUTES.supplier.key,
    icon: ROUTES.supplier.icon,
    href: ROUTES.supplier.path,
  },
  {
    label: ROUTES.product.key,
    icon: ROUTES.product.icon,
    href: ROUTES.product.path,
  },
  {
    label: ROUTES.purchaseInvoice.key,
    icon: ROUTES.purchaseInvoice.icon,
    href: ROUTES.purchaseInvoice.path,
  },
  {
    label: ROUTES.saleInvoice.key,
    icon: ROUTES.saleInvoice.icon,
    href: ROUTES.saleInvoice.path,
  },
  {
    label: ROUTES.payment.key,
    icon: ROUTES.payment.icon,
    href: ROUTES.payment.path,
  },
  {
    label: ROUTES.expense.key,
    icon: ROUTES.expense.icon,
    href: ROUTES.expense.path,
  },
  {
    label: ROUTES.auditLog.key,
    icon: ROUTES.auditLog.icon,
    href: ROUTES.auditLog.path,
  },
];
