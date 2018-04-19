import test from 'ava';
import parse from '../index';

test('parsing', t => {

  t.deepEqual([], parse(''), 'empty input');
  t.deepEqual([{ word: 'hi' }], parse('hi'), 'simple word');
  t.deepEqual([{ variable: 'foo' }], parse('$foo'), 'simple var');

  t.deepEqual([
    { word: 'oh' },
    { word: ' ' },
    { word: 'hi' },
    { word: ' ' },
    { value: 'thing is quoted here' },
    { word: ' ' },
    { hole: true },
    { word: ' ' },
    { value: 1.0 },
    { word: ' ' },
    { variable: 'var' }
  ], parse('oh hi "thing is quoted here" _ 1.0 $var'));

});
})
