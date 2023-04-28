/**
 * A typeclass for applicative traversal over a two-parameter data type.
 *
 * @since 1.0.0
 */
import { Bifoldable, Bifoldable2 } from '@jacob-alford/bifold-traverse/Bifoldable'
import {
  Applicative,
  Applicative1,
  Applicative2,
  Applicative3,
  Applicative4,
} from 'fp-ts/Applicative'
import { Bifunctor, Bifunctor2 } from 'fp-ts/Bifunctor'
import {
  HKT,
  HKT2,
  Kind,
  Kind2,
  Kind3,
  Kind4,
  URIS,
  URIS2,
  URIS3,
  URIS4,
} from 'fp-ts/HKT'

/**
 * @since 1.0.0
 * @category Typeclass
 */
export interface Bitraversable<T> extends Bifoldable<T>, Bifunctor<T> {
  readonly bitraverse: {
    <F extends URIS4>(F: Applicative4<F>): <S, R, E, A, B, C, D>(
      fa: HKT2<T, A, B>,
      f: (a: A) => Kind4<F, S, R, E, C>,
      g: (b: B) => Kind4<F, S, R, E, D>,
    ) => Kind4<F, S, R, E, HKT2<T, C, D>>
    <F extends URIS3>(F: Applicative3<F>): <R, E, A, B, C, D>(
      fa: HKT2<T, A, B>,
      f: (a: A) => Kind3<F, R, E, C>,
      g: (b: B) => Kind3<F, R, E, D>,
    ) => Kind3<F, R, E, HKT2<T, C, D>>
    <F extends URIS2>(F: Applicative2<F>): <E, A, B, C, D>(
      fa: HKT2<T, A, B>,
      f: (a: A) => Kind2<F, E, C>,
      g: (b: B) => Kind2<F, E, D>,
    ) => Kind2<F, E, HKT2<T, C, D>>
    <F extends URIS>(F: Applicative1<F>): <A, B, C, D>(
      fa: HKT2<T, A, B>,
      f: (a: A) => Kind<F, C>,
      g: (b: B) => Kind<F, D>,
    ) => Kind<F, HKT2<T, C, D>>
    <F>(F: Applicative<F>): <A, B, C, D>(
      fa: HKT2<T, A, B>,
      f: (a: A) => HKT<F, C>,
      g: (b: B) => HKT<F, D>,
    ) => HKT<F, HKT2<T, C, D>>
  }
  readonly bisequence: {
    <F extends URIS4>(F: Applicative4<F>): <S, R, E, A, B>(
      fga: HKT2<T, Kind4<F, S, R, E, A>, Kind4<F, S, R, E, B>>,
    ) => Kind4<F, S, R, E, HKT2<T, A, B>>
    <F extends URIS3>(F: Applicative3<F>): <R, E, A, B>(
      fga: HKT2<T, Kind3<F, R, E, A>, Kind3<F, R, E, B>>,
    ) => Kind3<F, R, E, HKT2<T, A, B>>
    <F extends URIS2>(F: Applicative2<F>): <E, A, B>(
      fga: HKT2<T, Kind2<F, E, A>, Kind2<F, E, B>>,
    ) => Kind2<F, E, HKT2<T, A, B>>
    <F extends URIS>(F: Applicative1<F>): <A, B>(
      fga: HKT2<T, Kind<F, A>, Kind<F, B>>,
    ) => Kind<F, HKT2<T, A, B>>
    <F>(F: Applicative<F>): <A, B>(
      fga: HKT2<T, HKT<F, A>, HKT<F, B>>,
    ) => HKT<F, HKT2<T, A, B>>
  }
}

/**
 * @since 1.0.0
 * @category Typeclass
 */
export interface Bitraversable2<T extends URIS2> extends Bifoldable2<T>, Bifunctor2<T> {
  readonly bitraverse: {
    <F extends URIS4>(F: Applicative4<F>): <S, R, E, A, B, C, D>(
      fa: Kind2<T, A, B>,
      f: (a: A) => Kind4<F, S, R, E, C>,
      g: (b: B) => Kind4<F, S, R, E, D>,
    ) => Kind4<F, S, R, E, Kind2<T, C, D>>
    <F extends URIS3>(F: Applicative3<F>): <R, E, A, B, C, D>(
      fa: Kind2<T, A, B>,
      f: (a: A) => Kind3<F, R, E, C>,
      g: (b: B) => Kind3<F, R, E, D>,
    ) => Kind3<F, R, E, Kind2<T, C, D>>
    <F extends URIS2>(F: Applicative2<F>): <E, A, B, C, D>(
      fa: Kind2<T, A, B>,
      f: (a: A) => Kind2<F, E, C>,
      g: (b: B) => Kind2<F, E, D>,
    ) => Kind2<F, E, Kind2<T, C, D>>
    <F extends URIS>(F: Applicative1<F>): <A, B, C, D>(
      fa: Kind2<T, A, B>,
      f: (a: A) => Kind<F, C>,
      g: (b: B) => Kind<F, D>,
    ) => Kind<F, Kind2<T, C, D>>
    <F>(F: Applicative<F>): <A, B, C, D>(
      fa: Kind2<T, A, B>,
      f: (a: A) => HKT<F, C>,
      g: (b: B) => HKT<F, D>,
    ) => HKT<F, Kind2<T, C, D>>
  }
  readonly bisequence: {
    <F extends URIS4>(F: Applicative4<F>): <S, R, E, A, B>(
      fga: Kind2<T, Kind4<F, S, R, E, A>, Kind4<F, S, R, E, B>>,
    ) => Kind4<F, S, R, E, Kind2<T, A, B>>
    <F extends URIS3>(F: Applicative3<F>): <R, E, A, B>(
      fga: Kind2<T, Kind3<F, R, E, A>, Kind3<F, R, E, B>>,
    ) => Kind3<F, R, E, Kind2<T, A, B>>
    <F extends URIS2>(F: Applicative2<F>): <E, A, B>(
      fga: Kind2<T, Kind2<F, E, A>, Kind2<F, E, B>>,
    ) => Kind2<F, E, Kind2<T, A, B>>
    <F extends URIS>(F: Applicative1<F>): <A, B>(
      fga: Kind2<T, Kind<F, A>, Kind<F, B>>,
    ) => Kind<F, Kind2<T, A, B>>
    <F>(F: Applicative<F>): <A, B>(
      fga: Kind2<T, HKT<F, A>, HKT<F, B>>,
    ) => HKT<T, Kind2<T, A, B>>
  }
}

// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------

/**
 * A definition for a pipeable version of `bitraverse`
 *
 * @since 1.0.0
 * @category Pipeable
 */
export type PipeableBitraverse<T extends URIS2> = {
  <F extends URIS4>(F: Applicative4<F>): <S, R, E, A, B, C, D>(
    f: (a: A) => Kind4<F, S, R, E, C>,
    g: (b: B) => Kind4<F, S, R, E, D>,
  ) => (fa: Kind2<T, A, B>) => Kind4<F, S, R, E, Kind2<T, C, D>>
  <F extends URIS3>(F: Applicative3<F>): <R, E, A, B, C, D>(
    f: (a: A) => Kind3<F, R, E, C>,
    g: (b: B) => Kind3<F, R, E, D>,
  ) => (fa: Kind2<T, A, B>) => Kind3<F, R, E, Kind2<T, C, D>>
  <F extends URIS2>(F: Applicative2<F>): <E, A, B, C, D>(
    f: (a: A) => Kind2<F, E, C>,
    g: (b: B) => Kind2<F, E, D>,
  ) => (fa: Kind2<T, A, B>) => Kind2<F, E, Kind2<T, C, D>>
  <F extends URIS>(F: Applicative1<F>): <A, B, C, D>(
    f: (a: A) => Kind<F, C>,
    g: (b: B) => Kind<F, D>,
  ) => (fa: Kind2<T, A, B>) => Kind<F, Kind2<T, C, D>>
  <F>(F: Applicative<F>): <A, B, C, D>(
    f: (a: A) => HKT<F, C>,
    g: (b: B) => HKT<F, D>,
  ) => (fa: Kind2<T, A, B>) => HKT<F, Kind2<T, C, D>>
}