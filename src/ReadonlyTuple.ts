/**
 * Bifoldable and Bitraversable instances for ReadonlyTuple
 *
 * @since 1.0.0
 */
import { bifold as bifold_, Bifoldable2 } from '@jacob-alford/bifold-traverse/Bifoldable'
import {
  Bitraversable2,
  PipeableBitraverse,
} from '@jacob-alford/bifold-traverse/Bitraversable'
import { Applicative } from 'fp-ts/Applicative'
import { identity } from 'fp-ts/function'
import { HKT } from 'fp-ts/HKT'
import * as RTup from 'fp-ts/ReadonlyTuple'
import { Semigroup } from 'fp-ts/Semigroup'

// non-pipeables
const bireduceRight_: Bifoldable2<RTup.URI>['bireduceRight'] = ([b, a], c, f, g) =>
  f(a, g(b, c))
const bireduce_: Bifoldable2<RTup.URI>['bireduce'] = ([b, a], c, f, g) => f(g(c, b), a)
const bifoldMap_: <S>(
  S: Semigroup<S>,
) => <A, B>(fa: readonly [B, A], f: (a: A) => S, g: (b: B) => S) => S = S => (
  [b, a],
  f,
  g,
) => S.concat(f(a), g(b))
const bitraverse_: Bitraversable2<RTup.URI>['bitraverse'] = <F>(F: Applicative<F>) => <
  A,
  B,
  C,
  D
>(
  fa: readonly [B, A],
  f: (a: A) => HKT<F, C>,
  g: (b: B) => HKT<F, D>,
): HKT<F, readonly [D, C]> =>
  F.ap(
    F.map(g(fa[0]), d => (c: C) => [d, c]),
    f(fa[1]),
  )

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @since 1.0.0
 * @category Instance Methods
 */
export const bireduceRight = <A, B, C>(
  c: C,
  f: (a: A, c: C) => C,
  g: (b: B, c: C) => C,
) => (fa: readonly [B, A]): C => bireduceRight_(fa, c, f, g)

/**
 * @since 1.0.0
 * @category Instance Methods
 */
export const bireduce = <A, B, C>(c: C, f: (c: C, a: A) => C, g: (c: C, b: B) => C) => (
  fa: readonly [B, A],
): C => bireduce_(fa, c, f, g)

/**
 * Note: ReadonlyTuple is defined backwards, and the first mapping function takes the
 * second element, i.e. f: (a: A) => S, g: (b: B) => S
 *
 * @since 1.0.0
 * @category Instance Methods
 */
export const bifoldMap = <S>(S: Semigroup<S>) => <A, B>(
  f: (a: A) => S,
  g: (b: B) => S,
) => (fa: readonly [B, A]): S => bifoldMap_(S)(fa, f, g)

/**
 * @since 1.0.0
 * @category Instances
 */
export const Bifoldable: Bifoldable2<RTup.URI> = {
  bireduceRight: bireduceRight_,
  bireduce: bireduce_,
  bifoldMap: bifoldMap_,
}

/**
 * @since 1.0.0
 * @category Instance Methods
 */
export const bisequence: Bitraversable2<RTup.URI>['bisequence'] = <F>(
  F: Applicative<F>,
) => <A, B>(f: readonly [HKT<F, B>, HKT<F, A>]): HKT<F, readonly [B, A]> =>
  bitraverse_(F)(f, identity, identity)

/**
 * @since 1.0.0
 * @category Instance Methods
 */
export const bitraverse: PipeableBitraverse<RTup.URI> = <F>(F: Applicative<F>) => <
  A,
  B,
  C,
  D
>(
  f: (a: A) => HKT<F, C>,
  g: (b: B) => HKT<F, D>,
) => (fa: readonly [B, A]): HKT<F, readonly [D, C]> => bitraverse_(F)(fa, f, g)

/**
 * @since 1.0.0
 * @category Instances
 */
export const Bitraversable: Bitraversable2<RTup.URI> = {
  ...RTup.Bifunctor,
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
