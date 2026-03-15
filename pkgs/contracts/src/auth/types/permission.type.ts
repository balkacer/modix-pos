export type Permission =
  | 'auth.login'
  | 'business.read'
  | 'business.shift.open'
  | 'business.shift.close'
  | 'catalog.read'
  | 'catalog.manage'
  | 'sales.read'
  | 'sales.create'
  | 'sales.draft.update'
  | 'sales.cancel'
  | 'sales.status.update'
  | 'payments.create';
