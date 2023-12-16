export const isTypedArray = <T>(v: unknown, typeGuard: (w: unknown) => w is T): v is T[] => {
  return Array.isArray(v) && v.every(typeGuard);
};
