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
