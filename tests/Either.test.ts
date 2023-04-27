import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import * as Str from 'fp-ts/string'

import { Bifoldable, bisequence, bitraverse } from '../src/Either'

describe('Either', () => {
  describe('bisequence', () => {
    test('Right $ Some', () => {
      const test = bisequence(O.Applicative)(E.right(O.some('test')))
      expect(test).toEqual(O.some(E.right('test')))
    })
    test('Right $ None', () => {
      const test = bisequence(O.Applicative)(E.right(O.none))
      expect(test).toEqual(O.none)
    })
    test('Left $ Some', () => {
      const test = bisequence(O.Applicative)(E.left(O.some('test')))
      expect(test).toEqual(O.some(E.left('test')))
    })
    test('Left $ None', () => {
      const test = bisequence(O.Applicative)(E.left(O.none))
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
      expect(testJJ(E.right('test'))).toEqual(O.some(E.right('test')))
    })
    test('Right $ None', () => {
      expect(testJN(E.right('Test'))).toEqual(O.none)
    })
    test('Left $ Some', () => {
      expect(testJJ(E.left('test'))).toEqual(O.some(E.left('test')))
    })
    test('Left $ None', () => {
      expect(testNJ(E.left('test'))).toEqual(O.none)
    })
  })
  describe('Bifoldable', () => {
    test('bireduce > Left', () => {
      const test = Bifoldable.bireduce(
        E.left('test2'),
        'test1',
        (a, b) => a + b,
        (a, b) => a + b,
      )
      expect(test).toEqual('test1test2')
    })
    test('bireduce > Right', () => {
      const test = Bifoldable.bireduce(
        E.right('test1'),
        'test2',
        (a, b) => a + b,
        (a, b) => a + b,
      )
      expect(test).toEqual('test2test1')
    })
    test('bireduceRight > Left', () => {
      const test = Bifoldable.bireduceRight(
        E.left('test1'),
        'test2',
        (a, b) => a + b,
        (a, b) => a + b,
      )
      expect(test).toEqual('test1test2')
    })
    test('bireduceRight > Right', () => {
      const test = Bifoldable.bireduceRight(
        E.right('test1'),
        'test2',
        (a, b) => a + b,
        (a, b) => a + b,
      )
      expect(test).toEqual('test1test2')
    })
    test('bifoldMap', () => {
      const test = Bifoldable.bifoldMap(Str.Monoid)(
        E.right('test1'),
        a => a,
        b => b,
      )
      expect(test).toEqual('test1')
    })
  })
})
