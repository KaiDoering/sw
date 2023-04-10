// eslint-disable-next-line import/prefer-default-export
export const getIdFromUrl = (url: string) => url.match(/^.*\/(\d+)\/?$/)?.[1];
