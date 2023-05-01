/**
 * A foldable typeclass for data types with two type parameters.
 *
 * @since 1.0.0
 */
import { BooleanAlgebra } from 'fp-ts/BooleanAlgebra'
import { identity } from 'fp-ts/function'
import { HKT2, Kind2, URIS2 } from 'fp-ts/HKT'
import { Monoid } from 'fp-ts/Monoid'

/**
 * @since 1.0.0
 * @category Typeclass
 */
export interface Bifoldable<F> {
  readonly URI: F
  readonly bireduce: <A, B, C>(
    fa: HKT2<F, A, B>,
    b: C,
    f: (c: C, a: A) => C,
    g: (c: C, b: B) => C,
  ) => C
  readonly bireduceRight: <A, B, C>(
    fa: HKT2<F, A, B>,
    b: C,
    f: (a: A, c: C) => C,
    g: (b: B, c: C) => C,
  ) => C
  readonly bifoldMap: <M>(
    M: Monoid<M>,
  ) => <A, B>(fa: HKT2<F, A, B>, f: (a: A) => M, g: (b: B) => M) => M
}

/**
 * @since 1.0.0
 * @category Typeclass
 */
export interface Bifoldable2<F extends URIS2> {
  readonly URI: F
  readonly bireduce: <A, B, C>(
    fa: Kind2<F, A, B>,
    b: C,
    f: (c: C, a: A) => C,
    g: (c: C, b: B) => C,
  ) => C
  readonly bireduceRight: <A, B, C>(
    fa: Kind2<F, A, B>,
    b: C,
    f: (a: A, c: C) => C,
    g: (b: B, c: C) => C,
  ) => C
  readonly bifoldMap: <M>(
    M: Monoid<M>,
  ) => <A, B>(fa: Kind2<F, A, B>, f: (a: A) => M, g: (b: B) => M) => M
}

/**
 * @since 1.0.0
 * @category Utilities
 */
export function bifold<T extends URIS2>(
  T: Bifoldable2<T>,
): <M>(M: Monoid<M>) => (fa: Kind2<T, M, M>) => M
export function bifold<T>(
  T: Bifoldable<T>,
): <M>(M: Monoid<M>) => (fa: HKT2<T, M, M>) => M {
  return <M>(M: Monoid<M>) => (fa: HKT2<T, M, M>) =>
    T.bifoldMap(M)(fa, identity, identity)
}

/**
 * @since 1.0.0
 * @category Utilities
 */
export function biany<T extends URIS2, C>(
  T: Bifoldable2<T>,
  C: BooleanAlgebra<C>,
): <A, B>(pl: (a: A) => C, pr: (b: B) => C) => (fa: Kind2<T, A, B>) => C
export function biany<T, C>(
  T: Bifoldable<T>,
  C: BooleanAlgebra<C>,
): <A, B>(pl: (a: A) => C, pr: (b: B) => C) => (fa: HKT2<T, A, B>) => C {
  return <A, B>(pl: (a: A) => C, pr: (b: B) => C) => (fa: HKT2<T, A, B>) =>
    T.bifoldMap({
      empty: C.zero,
      concat: C.join,
    })(fa, pl, pr)
}

/**
 * @since 1.0.0
 * @category Utilities
 */
export function biall<T extends URIS2, C>(
  T: Bifoldable2<T>,
  C: BooleanAlgebra<C>,
): <A, B>(pl: (a: A) => C, pr: (b: B) => C) => (fa: Kind2<T, A, B>) => C
export function biall<T, C>(
  T: Bifoldable<T>,
  C: BooleanAlgebra<C>,
): <A, B>(pl: (a: A) => C, pr: (b: B) => C) => (fa: HKT2<T, A, B>) => C {
  return <A, B>(pl: (a: A) => C, pr: (b: B) => C) => (fa: HKT2<T, A, B>) =>
    T.bifoldMap({
      empty: C.one,
      concat: C.meet,
    })(fa, pl, pr)
}
