import * as Ap from 'fp-ts/Applicative'
import { pipe } from 'fp-ts/function'
import { tuple } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as Str from 'fp-ts/string'

import {
  bifold,
  bifoldMap,
  bireduce,
  bireduceRight,
  bisequence,
  bitraverse,
} from '../src/ReadonlyTuple'

describe('These', () => {
  describe('bisequence', () => {
    test('Some x Some', () => {
      const _ = pipe(tuple(O.some('a'), O.some('b')), bisequence(O.Applicative))
      expect(_).toEqual(O.some(tuple('a', 'b')))
    })
    test('Some x None', () => {
      const _ = pipe(tuple(O.some('a'), O.none), bisequence(O.Applicative))
      expect(_).toEqual(O.none)
    })
    test('None x Some', () => {
      const _ = pipe(tuple(O.none, O.some('b')), bisequence(O.Applicative))
      expect(_).toEqual(O.none)
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
      const _ = pipe(tuple('a', 'b'), testJJ)
      expect(_).toEqual(O.some(tuple('a', 'b')))
    })
    test('None x Some', () => {
      const _ = pipe(tuple('a', 'b'), testNJ)
      expect(_).toEqual(O.none)
    })
    test('Some x None', () => {
      const _ = pipe(tuple('a', 'b'), testJN)
      expect(_).toEqual(O.none)
    })
    test('None x None', () => {
      const _ = pipe(tuple('a', 'b'), testNN)
      expect(_).toEqual(O.none)
    })
  })
  describe('bifoldMap', () => {
    test('mapping', () => {
      const _ = pipe(
        tuple('b', 'a'),
        bifoldMap(Str.Monoid)(Str.toUpperCase, Str.toUpperCase),
      )
      expect(_).toEqual('AB')
    })
    test('Some x Some', () => {
      const _ = pipe(
        tuple(O.some('b'), O.some('a')),
        bifold(Ap.getApplicativeMonoid(O.Applicative)(Str.Monoid)),
      )
      expect(_).toEqual(O.some('ab'))
    })
    test('Some x None', () => {
      const _ = pipe(
        tuple(O.some('b'), O.none),
        bifold(Ap.getApplicativeMonoid(O.Applicative)(Str.Monoid)),
      )
      expect(_).toEqual(O.none)
    })
    test('None x Some', () => {
      const _ = pipe(
        tuple(O.none, O.some('a')),
        bifold(Ap.getApplicativeMonoid(O.Applicative)(Str.Monoid)),
      )
      expect(_).toEqual(O.none)
    })
    test('None x None', () => {
      const _ = pipe(
        tuple(O.none, O.none),
        bifold(Ap.getApplicativeMonoid(O.Applicative)(Str.Monoid)),
      )
      expect(_).toEqual(O.none)
    })
  })
  describe('bireduce', () => {
    test('Some x Some', () => {
      const _ = pipe(
        tuple('a', 'b'),
        bireduce(
          'test',
          (acc, a) => acc + a,
          (acc, a) => acc + a,
        ),
      )
      expect(_).toEqual('testab')
    })
  })
  describe('bireduceRight', () => {
    test('Some x Some', () => {
      const _ = pipe(
        tuple('a', 'b'),
        bireduceRight(
          'test',
          (acc, a) => acc + a,
          (acc, a) => acc + a,
        ),
      )
      expect(_).toEqual('batest')
    })
  })
})
