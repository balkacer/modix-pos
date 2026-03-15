interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div style={{ marginBottom: 16 }}>
      <h2 style={{ margin: 0, fontSize: 20 }}>{title}</h2>
      {subtitle ? (
        <p style={{ margin: '6px 0 0', color: '#6b7280' }}>{subtitle}</p>
      ) : null}
    </div>
  );
}
