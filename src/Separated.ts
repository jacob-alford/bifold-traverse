/**
 * Bifoldable and Bitraversable instances for Separated
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
import { Semigroup } from 'fp-ts/Semigroup'
import * as Sep from 'fp-ts/Separated'

// non-pipeables
const bireduceRight_: Bifoldable2<Sep.URI>['bireduceRight'] = (
  { left, right },
  c,
  f,
  g,
) => f(left, g(right, c))
const bireduce_: Bifoldable2<Sep.URI>['bireduce'] = ({ left, right }, c, f, g) =>
  g(f(c, left), right)
const bifoldMap_: <S>(
  S: Semigroup<S>,
) => <A, B>(fa: Sep.Separated<A, B>, f: (a: A) => S, g: (b: B) => S) => S = S => (
  { left, right },
  f,
  g,
) => S.concat(f(left), g(right))
const bitraverse_: Bitraversable2<Sep.URI>['bitraverse'] = <F>(F: Applicative<F>) => <
  A,
  B,
  C,
  D
>(
  fa: Sep.Separated<A, B>,
  f: (a: A) => HKT<F, C>,
  g: (b: B) => HKT<F, D>,
): HKT<F, Sep.Separated<C, D>> =>
  F.ap(
    F.map(g(fa.right), right => (left: C) => ({ right, left })),
    f(fa.left),
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
) => (fa: Sep.Separated<A, B>): C => bireduceRight_(fa, c, f, g)

/**
 * @since 1.0.0
 * @category Instance Methods
 */
export const bireduce = <A, B, C>(c: C, f: (c: C, a: A) => C, g: (c: C, b: B) => C) => (
  fa: Sep.Separated<A, B>,
): C => bireduce_(fa, c, f, g)

/**
 * @since 1.0.0
 * @category Instance Methods
 */
export const bifoldMap = <S>(S: Semigroup<S>) => <A, B>(
  f: (a: A) => S,
  g: (b: B) => S,
) => (fa: Sep.Separated<A, B>): S => bifoldMap_(S)(fa, f, g)

/**
 * @since 1.0.0
 * @category Instances
 */
export const Bifoldable: Bifoldable2<Sep.URI> = {
  URI: Sep.URI,
  bireduceRight: bireduceRight_,
  bireduce: bireduce_,
  bifoldMap: bifoldMap_,
}

/**
 * @since 1.0.0
 * @category Instance Methods
 */
export const bisequence: Bitraversable2<Sep.URI>['bisequence'] = <F>(
  F: Applicative<F>,
) => <A, B>(f: Sep.Separated<HKT<F, A>, HKT<F, B>>): HKT<F, Sep.Separated<A, B>> =>
  bitraverse_(F)(f, identity, identity)

/**
 * @since 1.0.0
 * @category Instance Methods
 * @example
 *   import { bitraverse } from '../../src/Separated'
 *   import * as E from 'fp-ts/Either'
 *   import * as O from 'fp-ts/Option'
 *   import * as RA from 'fp-ts/ReadonlyArray'
 *   import * as Sep from 'fp-ts/Separated'
 *   import { flow } from 'fp-ts/function'
 *
 *   type RelevantError = { readonly _tag: 'relevant-error'; message: string }
 *
 *   type IrrelevantError = { readonly _tag: 'irrelevant-error' }
 *
 *   type CriticalError = { readonly _tag: 'critical-error'; reason: string }
 *
 *   type Error = RelevantError | IrrelevantError | CriticalError
 *
 *   const relevantError: (message: string) => Error = message => ({
 *     _tag: 'relevant-error',
 *     message,
 *   })
 *   const irrelevantError: Error = { _tag: 'irrelevant-error' }
 *
 *   const criticalError: (reason: string) => Error = reason => ({
 *     _tag: 'critical-error',
 *     reason,
 *   })
 *
 *   const parseSemiList: (s: string) => O.Option<ReadonlyArray<string>> = flow(
 *     O.fromPredicate(s => /^((.*);)(.*)(;?)$/.test(s)),
 *     O.map(s => s.split(';')),
 *   )
 *
 *   const collectErrorsAndParseSuccesses: (
 *     fa: Sep.Separated<ReadonlyArray<Error>, ReadonlyArray<string>>,
 *   ) => E.Either<
 *     CriticalError,
 *     Sep.Separated<ReadonlyArray<RelevantError>, ReadonlyArray<string>>
 *   > = bitraverse(E.Applicative)(
 *     flow(
 *       E.traverseArray(
 *         E.fromPredicate(
 *           (err): err is RelevantError | IrrelevantError =>
 *             err._tag !== 'critical-error',
 *           err => (err._tag === 'critical-error' ? `Error: ${err.reason}` : `Error`),
 *         ),
 *       ),
 *       E.bimap(
 *         err => ({ _tag: 'critical-error', reason: err }),
 *         RA.filter((err): err is RelevantError => err._tag === 'relevant-error'),
 *       ),
 *     ),
 *     flow(
 *       O.traverseArray(parseSemiList),
 *       O.map(RA.flatten),
 *       E.fromOption(() => ({
 *         _tag: 'critical-error',
 *         reason: 'failed to parse string',
 *       })),
 *     ),
 *   )
 *
 *   assert.deepStrictEqual(
 *     collectErrorsAndParseSuccesses(
 *       Sep.separated(
 *         [
 *           relevantError('first error'),
 *           relevantError('second error'),
 *           irrelevantError,
 *         ],
 *         ['foo;bar;baz', 'qux;quux;quuz'],
 *       ),
 *     ),
 *     E.right(
 *       Sep.separated(
 *         [relevantError('first error'), relevantError('second error')],
 *         ['foo', 'bar', 'baz', 'qux', 'quux', 'quuz'],
 *       ),
 *     ),
 *   )
 *
 *   assert.deepStrictEqual(
 *     collectErrorsAndParseSuccesses(
 *       Sep.separated(
 *         [
 *           relevantError('first error'),
 *           relevantError('second error'),
 *           criticalError('critical error'),
 *         ],
 *         ['foo;bar;baz', 'qux;quux;quuz'],
 *       ),
 *     ),
 *     E.left(criticalError('Error: critical error')),
 *   )
 */
export const bitraverse: PipeableBitraverse<Sep.URI> = <F>(F: Applicative<F>) => <
  A,
  B,
  C,
  D
>(
  f: (a: A) => HKT<F, C>,
  g: (b: B) => HKT<F, D>,
) => (fa: Sep.Separated<A, B>): HKT<F, Sep.Separated<C, D>> => bitraverse_(F)(fa, f, g)

/**
 * @since 1.0.0
 * @category Instances
 */
export const Bitraversable: Bitraversable2<Sep.URI> = {
  ...Sep.Bifunctor,
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
