import { sortBy } from './ArrayUtils';

describe('ArrayUtils', () => {
  describe('sortBy', () => {
    test('creates function that returns -1, if field of first object is smaller than field of second', () => {
      const sortFunc = sortBy<{ foo: number }, 'foo'>('foo');
      expect(sortFunc({ foo: 1 }, { foo: 2 })).toBe(-1);
    });

    test('creates function that returns 1, if field of first object is bigger than field of second', () => {
      const sortFunc = sortBy<{ foo: number }, 'foo'>('foo');
      expect(sortFunc({ foo: 2 }, { foo: 1 })).toBe(1);
    });

    test('creates function that returns 0, if field of first object is same as field of second', () => {
      const sortFunc = sortBy<{ foo: number }, 'foo'>('foo');
      expect(sortFunc({ foo: 1 }, { foo: 1 })).toBe(0);
    });
  });
});
