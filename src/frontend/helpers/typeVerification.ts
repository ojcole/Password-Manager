import { GridItemLength } from './types';

export const createGridItemLength = (value: number): GridItemLength => {
  const intValue = Math.ceil(value);

  return Math.min(12, Math.max(1, intValue)) as GridItemLength;
};
