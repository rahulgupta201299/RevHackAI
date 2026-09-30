const toArray = (value) => (Array.isArray(value) ? value : [value]);

/** Merge a component's own `sx` with the `sx` passed by its parent (MUI array syntax). */
export const mergeSx = (base, sx) => [...toArray(base), ...toArray(sx)];
