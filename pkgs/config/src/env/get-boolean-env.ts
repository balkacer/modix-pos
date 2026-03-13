export const getBooleanEnv = (key: string, fallback?: boolean): boolean => {
  const rawValue = process.env[key] ?? (fallback !== undefined ? String(fallback) : undefined);

  if (rawValue === undefined) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return rawValue === 'true';
};