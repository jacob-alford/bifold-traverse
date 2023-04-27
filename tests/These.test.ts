import { pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as Str from 'fp-ts/string'
import * as Th from 'fp-ts/These'

import {
  bifold,
  bifoldMap,
  bireduce,
  bireduceRight,
  bisequence,
  bitraverse,
} from '../src/These'

describe('These', () => {
  describe('bisequence', () => {
    test('Right $ Some', () => {
      const test = bisequence(O.Applicative)(Th.right(O.some('test')))
      expect(test).toEqual(O.some(Th.right('test')))
    })
    test('Right $ None', () => {
      const test = bisequence(O.Applicative)(Th.right(O.none))
      expect(test).toEqual(O.none)
    })
    test('Left $ Some', () => {
      const test = bisequence(O.Applicative)(Th.left(O.some('test')))
      expect(test).toEqual(O.some(Th.left('test')))
    })
    test('Left $ None', () => {
      const test = bisequence(O.Applicative)(Th.left(O.none))
      expect(test).toEqual(O.none)
    })
    test('Both $ Some x Some', () => {
      const test = bisequence(O.Applicative)(Th.both(O.some('test'), O.some('test')))
      expect(test).toEqual(O.some(Th.both('test', 'test')))
    })
    test('Both $ None x None', () => {
      const test = bisequence(O.Applicative)(Th.both(O.none, O.none))
      expect(test).toEqual(O.none)
    })
    test('Both $ Some x None', () => {
      const test = bisequence(O.Applicative)(Th.both(O.some('test'), O.none))
      expect(test).toEqual(O.none)
    })
    test('Both $ None x Some', () => {
      const test = bisequence(O.Applicative)(Th.both(O.none, O.some('test')))
      expect(test).toEqual(O.none)
    })
  })
  describe('bitraverse', () => {
    const testJJ = bitraverse(O.Applicative)(
      a => O.some(a),
      a => O.some(a),
    )
    const testNJ = bitraverse(O.Applicative)(
      () => O.none,
      a => O.some(a),
    )
    const testJN = bitraverse(O.Applicative)(
      a => O.some(a),
      () => O.none,
    )
    test('Right $ Some', () => {
      expect(testJJ(Th.right('test'))).toEqual(O.some(Th.right('test')))
    })
    test('Right $ None', () => {
      expect(testJN(Th.right('Test'))).toEqual(O.none)
    })
    test('Left $ Some', () => {
      expect(testJJ(Th.left('test'))).toEqual(O.some(Th.left('test')))
    })
    test('Left $ None', () => {
      expect(testNJ(Th.left('test'))).toEqual(O.none)
    })
    test('Both $ Some x Some', () => {
      const test = bitraverse(O.Applicative)(
        a => O.some(a),
        a => O.some(a),
      )(Th.both('test', 'test'))
      expect(test).toEqual(O.some(Th.both('test', 'test')))
    })
    test('Both $ None x None', () => {
      const test = bitraverse(O.Applicative)(
        () => O.none,
        () => O.none,
      )(Th.both('test', 'test'))
      expect(test).toEqual(O.none)
    })
    test('Both $ Some x None', () => {
      const test = bitraverse(O.Applicative)(
        a => O.some(a),
        () => O.none,
      )(Th.both('test', 'test'))
      expect(test).toEqual(O.none)
    })
    test('Both $ None x Some', () => {
      const test = bitraverse(O.Applicative)(
        () => O.none,
        a => O.some(a),
      )(Th.both('test', 'test'))
      expect(test).toEqual(O.none)
    })
  })
  describe('bifoldMap', () => {
    test('mapping', () => {
      const test = pipe(
        Th.both('test', 'test'),
        bifoldMap(Str.Monoid)(
          a => a,
          a => a,
        ),
      )
      expect(test).toEqual('testtest')
    })
    test('Right', () => {
      const test = bifold(Str.Monoid)(Th.right('test'))
      expect(test).toEqual('test')
    })
    test('Left', () => {
      const test = bifold(Str.Monoid)(Th.left('test'))
      expect(test).toEqual('test')
    })
    test('Both', () => {
      const test = bifold(Str.Monoid)(Th.both('test', 'test'))
      expect(test).toEqual('testtest')
    })
  })
  describe('bireduce', () => {
    test('Right', () => {
      const test = pipe(
        Th.right('test1'),
        bireduce(
          'test2',
          (a, b) => a + b,
          (a, b) => a + b,
        ),
      )
      expect(test).toEqual('test2test1')
    })
    test('Left', () => {
      const test = pipe(
        Th.left('test1'),
        bireduce(
          'test2',
          (a, b) => a + b,
          (a, b) => a + b,
        ),
      )
      expect(test).toEqual('test2test1')
    })
    test('Both', () => {
      const test = pipe(
        Th.both('test1', 'test2'),
        bireduce(
          'test3',
          (a, b) => a + b,
          (a, b) => a + b,
        ),
      )
      expect(test).toEqual('test3test1test2')
    })
  })
  describe('biReduceRight', () => {
    test('Right', () => {
      const test = pipe(
        Th.right('test1'),
        bireduceRight(
          'test2',
          (a, b) => a + b,
          (a, b) => a + b,
        ),
      )
      expect(test).toEqual('test1test2')
    })
    test('Left', () => {
      const test = pipe(
        Th.left('test1'),
        bireduceRight(
          'test2',
          (a, b) => a + b,
          (a, b) => a + b,
        ),
      )
      expect(test).toEqual('test1test2')
    })
    test('Both', () => {
      const test = pipe(
        Th.both('test1', 'test2'),
        bireduceRight(
          'test3',
          (a, b) => a + b,
          (a, b) => a + b,
        ),
      )
      expect(test).toEqual('test1test2test3')
    })
  })
})
