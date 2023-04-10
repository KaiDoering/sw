import { getIdFromUrl } from './StringUtils';

describe('StringUtils', () => {
  describe('getIdFromUrl', () => {
    test('gets id from path correctly', () => {
      expect(getIdFromUrl('/some/path/with/id/last/12/')).toBe('12');
    });

    test('does not match numbers in the middle of the url', () => {
      expect(getIdFromUrl('/some/3/path/with/75/multiple/ids/12/')).toBe('12');
    });

    test('returns undefined, if no match is found', () => {
      expect(getIdFromUrl('/some/path/with/no/id/')).toBe(undefined);
    });
  });
});
