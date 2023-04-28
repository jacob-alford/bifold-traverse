/**
 * `bisequence` and `bitraverse` for `TaskThese`.
 *
 * _Note: TaskThese has neither `Bifoldable` nor `Bitraversable` instances due to the
 * nature of task_
 *
 * @since 1.0.0
 */
import { flow, identity, tuple } from 'fp-ts/function'
import { HKT, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from 'fp-ts/HKT'
import {
  MonadTask,
  MonadTask1,
  MonadTask2,
  MonadTask2C,
  MonadTask3,
  MonadTask3C,
  MonadTask4,
} from 'fp-ts/MonadTask'
import * as TT from 'fp-ts/TaskThese'

// -------------------------------------------------------------------------------------
// instance methods
// -------------------------------------------------------------------------------------

/**
 * @since 1.0.0
 * @category Instance Methods
 */
export function bisequence<M extends URIS4>(
  M: MonadTask4<M>,
): <S, R, E, A, B>(
  fga: TT.TaskThese<Kind4<M, S, R, E, A>, Kind4<M, S, R, E, B>>,
) => Kind4<M, S, R, E, TT.TaskThese<A, B>>
export function bisequence<M extends URIS3>(
  M: MonadTask3<M>,
): <R, E, A, B>(
  fga: TT.TaskThese<Kind3<M, R, E, A>, Kind3<M, R, E, B>>,
) => Kind3<M, R, E, TT.TaskThese<A, B>>
export function bisequence<M extends URIS3, E>(
  M: MonadTask3C<M, E>,
): <R, A, B>(
  fga: TT.TaskThese<Kind3<M, R, E, A>, Kind3<M, R, E, B>>,
) => Kind3<M, R, E, TT.TaskThese<A, B>>
export function bisequence<M extends URIS2>(
  M: MonadTask2<M>,
): <E, A, B>(
  fga: TT.TaskThese<Kind2<M, E, A>, Kind2<M, E, B>>,
) => Kind2<M, E, TT.TaskThese<A, B>>
export function bisequence<M extends URIS2, E>(
  M: MonadTask2C<M, E>,
): <A, B>(
  fga: TT.TaskThese<Kind2<M, E, A>, Kind2<M, E, B>>,
) => Kind2<M, E, TT.TaskThese<A, B>>
export function bisequence<M extends URIS>(
  M: MonadTask1<M>,
): <A, B>(fga: TT.TaskThese<Kind<M, A>, Kind<M, B>>) => Kind<M, TT.TaskThese<A, B>>
export function bisequence<M>(
  M: MonadTask<M>,
): <A, B>(fga: TT.TaskThese<HKT<M, A>, HKT<M, B>>) => HKT<M, TT.TaskThese<A, B>> {
  // @ts-expect-error -- overload signature is not narrowing correctly
  return bitraverse(M)(identity, identity)
}

/**
 * @since 1.0.0
 * @category Instance Methods
 */
export function bitraverse<F extends URIS4>(
  M: MonadTask4<F>,
): <S, R, E, A, B, C, D>(
  f: (a: A) => Kind4<F, S, R, E, C>,
  g: (b: B) => Kind4<F, S, R, E, D>,
) => (fa: TT.TaskThese<A, B>) => Kind4<F, S, R, E, TT.TaskThese<C, D>>
export function bitraverse<F extends URIS3>(
  M: MonadTask3<F>,
): <R, E, A, B, C, D>(
  f: (a: A) => Kind3<F, R, E, C>,
  g: (b: B) => Kind3<F, R, E, D>,
) => (fa: TT.TaskThese<A, B>) => Kind3<F, R, E, TT.TaskThese<C, D>>
export function bitraverse<F extends URIS3, E>(
  M: MonadTask3C<F, E>,
): <R, A, B, C, D>(
  f: (a: A) => Kind3<F, R, E, C>,
  g: (b: B) => Kind3<F, R, E, D>,
) => (fa: TT.TaskThese<A, B>) => Kind3<F, R, E, TT.TaskThese<C, D>>
export function bitraverse<F extends URIS2>(
  M: MonadTask2<F>,
): <E, A, B, C, D>(
  f: (a: A) => Kind2<F, E, C>,
  g: (b: B) => Kind2<F, E, D>,
) => (fa: TT.TaskThese<A, B>) => Kind2<F, E, TT.TaskThese<C, D>>
export function bitraverse<F extends URIS2, E>(
  M: MonadTask2C<F, E>,
): <A, B, C, D>(
  f: (a: A) => Kind2<F, E, C>,
  g: (b: B) => Kind2<F, E, D>,
) => (fa: TT.TaskThese<A, B>) => Kind2<F, E, TT.TaskThese<C, D>>
export function bitraverse<F extends URIS>(
  M: MonadTask1<F>,
): <A, B, C, D>(
  f: (a: A) => Kind<F, C>,
  g: (b: B) => Kind<F, D>,
) => (fa: TT.TaskThese<A, B>) => Kind<F, TT.TaskThese<C, D>>
export function bitraverse<F>(
  M: MonadTask<F>,
): <A, B, C, D>(
  f: (a: A) => HKT<F, C>,
  g: (b: B) => HKT<F, D>,
) => (fa: TT.TaskThese<A, B>) => HKT<F, TT.TaskThese<C, D>> {
  return <A, B, C, D>(
    f: (a: A) => HKT<F, C>,
    g: (b: B) => HKT<F, D>,
  ): ((fa: TT.TaskThese<A, B>) => HKT<F, TT.TaskThese<C, D>>) =>
    flow(
      TT.foldW(
        a => async () => M.map(f(a), c => TT.left<C, D>(c)),
        b => async () => M.map(g(b), d => TT.right<C, D>(d)),
        (a, b) => async () =>
          M.map(
            M.ap(
              M.map(g(b), d => (c: C) => tuple(c, d)),
              f(a),
            ),
            ([c, d]) => TT.both(c, d),
          ),
      ),
      _ => M.chain(M.fromTask(_), identity),
    )
}
