export const fetchJson = async <T>(...params: Parameters<typeof fetch>): Promise<T> => {
  const response = await fetch(params[0], { ...(params[1] ?? {}) });
  if (response.ok) return response.json();
  throw new Error(`HTTP ${response.status}: ${response.text()}`);
};
