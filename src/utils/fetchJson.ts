export const fetchJson = async (...params: Parameters<typeof fetch>): Promise<unknown> => {
  const [input, init] = params;

  const overwrittenHeaders = new Headers(init?.headers);
  overwrittenHeaders.set('Content-Type', 'application/json');

  const overwrittenInit: RequestInit = { ...init, headers: overwrittenHeaders };

  const response = await fetch(input, overwrittenInit);

  return response.json();
};
