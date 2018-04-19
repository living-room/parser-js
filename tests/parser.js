import test from 'ava';
import parse from '../index';

test('parsing', t => {

  t.deepEqual([], parse(''), 'empty input');
  t.deepEqual([{ word: 'hi' }], parse('hi'), 'simple word');
  t.deepEqual([{ variable: 'foo' }], parse('$foo'), 'simple var');

})
