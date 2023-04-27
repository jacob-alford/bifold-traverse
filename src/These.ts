/**
 * Bifoldable and Bitraversable instances for These.
 *
 * @since 1.0.0
 */
import { bifold as bifold_, Bifoldable2 } from '@jacob-alford/bifold-traverse/Bifoldable'
import {
  Bitraversable2,
  PipeableBitraverse,
} from '@jacob-alford/bifold-traverse/Bitraversable'
import { Applicative } from 'fp-ts/Applicative'
import { identity, pipe, tuple } from 'fp-ts/function'
import { HKT } from 'fp-ts/HKT'
import { Semigroup } from 'fp-ts/Semigroup'
import * as Th from 'fp-ts/These'

// non-pipeables
const bireduceRight_: Bifoldable2<Th.URI>['bireduceRight'] = (these, c, f, g) =>
  pipe(
    these,
    Th.fold(
      a => f(a, c),
      b => g(b, c),
      (a, b) => f(a, g(b, c)),
    ),
  )
const bireduce_: Bifoldable2<Th.URI>['bireduce'] = (these, c, f, g) =>
  pipe(
    these,
    Th.fold(
      a => f(c, a),
      b => g(c, b),
      (a, b) => g(f(c, a), b),
    ),
  )
const bifoldMap_ = <S>(S: Semigroup<S>) => <A, B>(
  these: Th.These<A, B>,
  f: (a: A) => S,
  g: (b: B) => S,
): S =>
  pipe(
    these,
    Th.fold(f, g, (a, b) => S.concat(f(a), g(b))),
  )
const bitraverse_: Bitraversable2<Th.URI>['bitraverse'] = <F>(F: Applicative<F>) => <
  A,
  B,
  C,
  D
>(
  fa: Th.These<A, B>,
  f: (a: A) => HKT<F, C>,
  g: (b: B) => HKT<F, D>,
): HKT<F, Th.These<C, D>> =>
  pipe(
    fa,
    Th.foldW(
      a => F.map(f(a), Th.left),
      b => F.map(g(b), Th.right),
      (a, b) =>
        F.map(
          F.ap(
            F.map(g(b), d => (c: C) => tuple(c, d)),
            f(a),
          ),
          ([c, d]) => Th.both(c, d),
        ),
    ),
  )

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @since 1.0.0
 * @category Instance Methods
 */
export const bireduce: <A, B, C>(
  startWith: C,
  f: (c: C, a: A) => C,
  g: (c: C, b: B) => C,
) => (fa: Th.These<A, B>) => C = (startWith, f, g) => fa => bireduce_(fa, startWith, f, g)

/**
 * @since 1.0.0
 * @category Instance Methods
 */
export const bireduceRight: <A, B, C>(
  startWith: C,
  f: (a: A, c: C) => C,
  g: (b: B, c: C) => C,
) => (fa: Th.These<A, B>) => C = (startWith, f, g) => fa =>
  bireduceRight_(fa, startWith, f, g)

/**
 * @since 1.0.0
 * @category Instance Methods
 */
export const bifoldMap: <S>(
  S: Semigroup<S>,
) => <A, B>(f: (a: A) => S, g: (b: B) => S) => (fa: Th.These<A, B>) => S = S => (
  f,
  g,
) => fa => bifoldMap_(S)(fa, f, g)

/**
 * @since 1.0.0
 * @category Instances
 */
export const Bifoldable: Bifoldable2<Th.URI> = {
  ...Th.Bifunctor,
  bireduceRight: bireduceRight_,
  bireduce: bireduce_,
  bifoldMap: bifoldMap_,
}

/**
 * @since 1.0.0
 * @category Instance Methods
 */
export const bisequence: Bitraversable2<Th.URI>['bisequence'] = <F>(
  F: Applicative<F>,
) => <A, B>(f: Th.These<HKT<F, A>, HKT<F, B>>): HKT<F, Th.These<A, B>> =>
  bitraverse_(F)(f, identity, identity)

/**
 * @since 1.0.0
 * @category Instance Methods
 */
export const bitraverse: PipeableBitraverse<Th.URI> = <F>(F: Applicative<F>) => <
  A,
  B,
  C,
  D
>(
  f: (a: A) => HKT<F, C>,
  g: (b: B) => HKT<F, D>,
) => (fa: Th.These<A, B>): HKT<F, Th.These<C, D>> => bitraverse_(F)(fa, f, g)

/**
 * @since 1.0.0
 * @category Instances
 */
export const Bitraversable: Bitraversable2<Th.URI> = {
  ...Bifoldable,
  bisequence,
  bitraverse: bitraverse_,
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 1.0.0
 * @category Utilities
 */
export const bifold = bifold_(Bifoldable)
