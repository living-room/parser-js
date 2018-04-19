import test from 'ava';
import parse from '../index';

const SPACE = { word: ' ' };

test('parsing', t => {

  t.deepEqual([], parse(''), 'empty input');
  t.deepEqual([{ word: 'hi' }], parse('hi'), 'simple word');
  t.deepEqual([{ variable: 'foo' }], parse('$foo'), 'simple var');

  t.deepEqual([
    { word: 'oh' },
    SPACE,
    { word: 'hi' },
    SPACE,
    { value: 'thing is quoted here' },
    SPACE,
    { hole: true },
    SPACE,
    { value: 1.0 },
    SPACE,
    { variable: 'var' }
  ], parse('oh hi "thing is quoted here" _ 1.0 $var'));

});

test('issue#2', t => {
  t.deepEqual([ { value: 0.5 } ], parse('0.5'));
  t.deepEqual([ { value: 0.5 } ], parse('.5'));
  t.deepEqual([ { value: 10 } ], parse('10'));
  t.deepEqual([
    { word: 'gorog' },
    SPACE,
    { word: 'is' },
    SPACE,
    { word: 'at' },
    SPACE,
    { value: 0.1 },
    { word: ',' },
    SPACE,
    { value: 5 }
  ], parse('gorog is at 0.1, 5'));
  t.deepEqual([
    { word: 'gorog' },
    SPACE,
    { word: 'is' },
    SPACE,
    { word: 'at' },
    SPACE,
    { value: 0.1 },
    { word: ',' },
    SPACE,
    { value: 5 }
  ], parse('gorog is at .1, 5'));
})
