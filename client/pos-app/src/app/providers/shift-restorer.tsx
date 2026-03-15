import { useRestoreActiveShift } from '../../modules/business/hooks/use-restore-active-shift';

export function ShiftRestorer() {
  useRestoreActiveShift();
  return null;
}
