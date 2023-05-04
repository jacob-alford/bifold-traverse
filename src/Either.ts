/**
 * Bifoldable and Bitraversable instances for Either. Note: utils `bireduce`,
 * `bireduceRight`, `bifoldMap` are omitted for either because they are equivalent to
 * `fold` already exported by fp-ts.
 *
 * @since 1.0.0
 */
import { Bifoldable2 } from '@jacob-alford/bifold-traverse/Bifoldable'
import {
  Bitraversable2,
  PipeableBitraverse,
} from '@jacob-alford/bifold-traverse/Bitraversable'
import { Applicative } from 'fp-ts/Applicative'
import * as E from 'fp-ts/Either'
import { identity, pipe } from 'fp-ts/function'
import { HKT } from 'fp-ts/HKT'

// non-pipeables
const bireduceRight_: Bifoldable2<E.URI>['bireduceRight'] = (either, c, f, g) =>
  pipe(
    either,
    E.fold(
      a => f(a, c),
      b => g(b, c),
    ),
  )
const bireduce_: Bifoldable2<E.URI>['bireduce'] = (either, c, f, g) =>
  pipe(
    either,
    E.fold(
      a => f(c, a),
      b => g(c, b),
    ),
  )
const bifoldMap_: <M, A, B>(fa: E.Either<A, B>, f: (a: A) => M, g: (b: B) => M) => M = (
  either,
  f,
  g,
) => pipe(either, E.fold(f, g))
const bitraverse_: Bitraversable2<E.URI>['bitraverse'] = <F>(F: Applicative<F>) => <
  A,
  B,
  C,
  D
>(
  fa: E.Either<A, B>,
  f: (a: A) => HKT<F, C>,
  g: (b: B) => HKT<F, D>,
): HKT<F, E.Either<C, D>> =>
  pipe(
    fa,
    E.foldW(
      a => F.map(f(a), E.left),
      b => F.map(g(b), E.right),
    ),
  )

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @since 1.0.0
 * @category Instances
 */
export const Bifoldable: Bifoldable2<E.URI> = {
  URI: E.URI,
  bireduceRight: bireduceRight_,
  bireduce: bireduce_,
  bifoldMap: () => bifoldMap_,
}

/**
 * @since 1.0.0
 * @category Instance Methods
 */
export const bisequence: Bitraversable2<E.URI>['bisequence'] = <F>(F: Applicative<F>) => <
  A,
  B
>(
  f: E.Either<HKT<F, A>, HKT<F, B>>,
): HKT<F, E.Either<A, B>> => bitraverse_(F)(f, identity, identity)

/**
 * @since 1.0.0
 * @category Instance Methods
 * @example
 *   import { bitraverse } from '@jacob-alford/bifold-traverse/Either'
 *   import * as E from 'fp-ts/Either'
 *   import * as O from 'fp-ts/Option'
 *   import { pipe } from 'fp-ts/function'
 *
 *   type WideEither = E.Either<string | Error, string | number>
 *   type NarrowedEither = E.Either<Error, number>
 *
 *   const e1: WideEither = E.left('string')
 *   const e2: WideEither = E.left(new Error('error'))
 *   const e3: WideEither = E.right('string')
 *   const e4: WideEither = E.right(1)
 *
 *   const narrowEither: (e: WideEither) => O.Option<NarrowedEither> = bitraverse(
 *     O.Applicative,
 *   )(
 *     O.fromPredicate((s): s is Error => s instanceof Error),
 *     O.fromPredicate((s): s is number => typeof s === 'number'),
 *   )
 *
 *   const r1 = pipe(e1, narrowEither)
 *   assert.deepStrictEqual(r1, O.none)
 *   const r2 = pipe(e2, narrowEither)
 *   assert.deepStrictEqual(r2, O.some(E.left(new Error('error'))))
 *   const r3 = pipe(e3, narrowEither)
 *   assert.deepStrictEqual(r3, O.none)
 *   const r4 = pipe(e4, narrowEither)
 *   assert.deepStrictEqual(r4, O.some(E.right(1)))
 */
export const bitraverse: PipeableBitraverse<E.URI> = <F>(F: Applicative<F>) => <
  A,
  B,
  C,
  D
>(
  f: (a: A) => HKT<F, C>,
  g: (b: B) => HKT<F, D>,
) => (fa: E.Either<A, B>): HKT<F, E.Either<C, D>> => bitraverse_(F)(fa, f, g)

/**
 * @since 1.0.0
 * @category Instances
 */
export const Bitraversable: Bitraversable2<E.URI> = {
  ...E.Bifunctor,
  ...Bifoldable,
  bisequence,
  bitraverse: bitraverse_,
}
