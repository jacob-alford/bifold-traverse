import * as Ap from 'fp-ts/Applicative'
import { pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as Sep from 'fp-ts/Separated'
import * as Str from 'fp-ts/string'

import {
  bifold,
  bifoldMap,
  bireduce,
  bireduceRight,
  bisequence,
  bitraverse,
} from '../src/Separated'

describe('Separated', () => {
  describe('bisequence', () => {
    test('Some x Some', () => {
      const test = bisequence(O.Applicative)(
        Sep.separated(O.some('test'), O.some('test')),
      )
      expect(test).toEqual(O.some(Sep.separated('test', 'test')))
    })
    test('None x None', () => {
      const test = bisequence(O.Applicative)(Sep.separated(O.none, O.none))
      expect(test).toEqual(O.none)
    })
    test('Some x None', () => {
      const test = bisequence(O.Applicative)(Sep.separated(O.some('test'), O.none))
      expect(test).toEqual(O.none)
    })
    test('None x Some', () => {
      const test = bisequence(O.Applicative)(Sep.separated(O.none, O.some('test')))
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
    const testNN = bitraverse(O.Applicative)(
      () => O.none,
      () => O.none,
    )
    test('Some x Some', () => {
      const test = testJJ(Sep.separated('test', 'test'))
      expect(test).toEqual(O.some(Sep.separated('test', 'test')))
    })
    test('Some x None', () => {
      const test = testJN(Sep.separated('test', 'test'))
      expect(test).toEqual(O.none)
    })
    test('None x Some', () => {
      const test = testNJ(Sep.separated('test', 'test'))
      expect(test).toEqual(O.none)
    })
    test('None x None', () => {
      const test = testNN(Sep.separated('test', 'test'))
      expect(test).toEqual(O.none)
    })
  })
  describe('bifoldMap', () => {
    test('mapping', () => {
      const test = pipe(
        Sep.separated('test', 'test'),
        bifoldMap(Str.Monoid)(Str.toUpperCase, Str.toUpperCase),
      )
      expect(test).toEqual('TESTTEST')
    })
    test('bifold', () => {
      const test = pipe(
        Sep.separated(O.some('test'), O.some('test')),
        bifold(Ap.getApplicativeMonoid(O.Applicative)(Str.Monoid)),
      )
      expect(test).toEqual(O.some('testtest'))
    })
  })
  describe('bireduce', () => {
    test('reducing', () => {
      const test = pipe(
        Sep.separated('a', 'b'),
        bireduce(
          'test',
          (a, b) => a + b,
          (a, b) => a + b,
        ),
      )
      expect(test).toEqual('testab')
    })
  })
  describe('biReduceRight', () => {
    test('reducing', () => {
      const test = pipe(
        Sep.separated('a', 'b'),
        bireduceRight(
          'test',
          (a, b) => a + b,
          (a, b) => a + b,
        ),
      )
      expect(test).toEqual('abtest')
    })
  })
})
