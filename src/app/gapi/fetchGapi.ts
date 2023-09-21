import { fetchJson } from './fetchJson';

export const fetchGapi = async <T>(...params: Parameters<typeof fetch>): Promise<T> => {
  return fetchJson<T>(...params);
};
