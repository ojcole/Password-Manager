export interface Site {
  site: string;
}

export const isSite = (obj: Object) => {
  return 'site' in obj;
};
