import { PropsWithChildren } from 'react';
import { AppButton } from '../primitives/app-button';

interface ConfirmDialogProps extends PropsWithChildren {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmVariant?: 'primary' | 'secondary' | 'danger';
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  confirmVariant = 'primary',
  onConfirm,
  onCancel,
  isLoading = false,
  children
}: ConfirmDialogProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(17, 24, 39, 0.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        zIndex: 1000
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 520,
          background: '#fff',
          borderRadius: 20,
          padding: 20,
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          display: 'grid',
          gap: 16
        }}
      >
        <div>
          <h2 style={{ margin: 0, fontSize: 20 }}>{title}</h2>
          {description ? (
            <p style={{ margin: '8px 0 0', color: '#6b7280' }}>{description}</p>
          ) : null}
        </div>

        {children}

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <AppButton
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isLoading}
          >
            {cancelLabel}
          </AppButton>

          <AppButton
            type="button"
            variant={confirmVariant}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : confirmLabel}
          </AppButton>
        </div>
      </div>
    </div>
  );
}
