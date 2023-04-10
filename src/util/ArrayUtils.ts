// eslint-disable-next-line import/prefer-default-export
export const sortBy = <T extends {}, U extends keyof T>(key: U) => (a: T, b: T) => {
  if (a[key] > b[key]) {
    return 1;
  }
  if (b[key] > a[key]) {
    return -1;
  }
  return 0;
};
