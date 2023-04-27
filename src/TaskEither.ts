/**
 * `bisequence` and `bitraverse` for `TaskEither`.
 *
 * _Note: TaskEither has neither `Bifoldable` nor `Bitraversable` instances due to the
 * nature of task_
 *
 * @since 1.0.0
 */
import { flow, identity } from 'fp-ts/function'
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
import * as TE from 'fp-ts/TaskEither'

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
  fga: TE.TaskEither<Kind4<M, S, R, E, A>, Kind4<M, S, R, E, B>>,
) => Kind4<M, S, R, E, TE.TaskEither<A, B>>
export function bisequence<M extends URIS3>(
  M: MonadTask3<M>,
): <R, E, A, B>(
  fga: TE.TaskEither<Kind3<M, R, E, A>, Kind3<M, R, E, B>>,
) => Kind3<M, R, E, TE.TaskEither<A, B>>
export function bisequence<M extends URIS3, E>(
  M: MonadTask3C<M, E>,
): <R, A, B>(
  fga: TE.TaskEither<Kind3<M, R, E, A>, Kind3<M, R, E, B>>,
) => Kind3<M, R, E, TE.TaskEither<A, B>>
export function bisequence<M extends URIS2>(
  M: MonadTask2<M>,
): <E, A, B>(
  fga: TE.TaskEither<Kind2<M, E, A>, Kind2<M, E, B>>,
) => Kind2<M, E, TE.TaskEither<A, B>>
export function bisequence<M extends URIS2, E>(
  M: MonadTask2C<M, E>,
): <A, B>(
  fga: TE.TaskEither<Kind2<M, E, A>, Kind2<M, E, B>>,
) => Kind2<M, E, TE.TaskEither<A, B>>
export function bisequence<M extends URIS>(
  M: MonadTask1<M>,
): <A, B>(fga: TE.TaskEither<Kind<M, A>, Kind<M, B>>) => Kind<M, TE.TaskEither<A, B>>
export function bisequence<M>(
  M: MonadTask<M>,
): <A, B>(fga: TE.TaskEither<HKT<M, A>, HKT<M, B>>) => HKT<M, TE.TaskEither<A, B>> {
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
) => (fa: TE.TaskEither<A, B>) => Kind4<F, S, R, E, TE.TaskEither<C, D>>
export function bitraverse<F extends URIS3>(
  M: MonadTask3<F>,
): <R, E, A, B, C, D>(
  f: (a: A) => Kind3<F, R, E, C>,
  g: (b: B) => Kind3<F, R, E, D>,
) => (fa: TE.TaskEither<A, B>) => Kind3<F, R, E, TE.TaskEither<C, D>>
export function bitraverse<F extends URIS3, E>(
  M: MonadTask3C<F, E>,
): <R, A, B, C, D>(
  f: (a: A) => Kind3<F, R, E, C>,
  g: (b: B) => Kind3<F, R, E, D>,
) => (fa: TE.TaskEither<A, B>) => Kind3<F, R, E, TE.TaskEither<C, D>>
export function bitraverse<F extends URIS2>(
  M: MonadTask2<F>,
): <E, A, B, C, D>(
  f: (a: A) => Kind2<F, E, C>,
  g: (b: B) => Kind2<F, E, D>,
) => (fa: TE.TaskEither<A, B>) => Kind2<F, E, TE.TaskEither<C, D>>
export function bitraverse<F extends URIS2, E>(
  M: MonadTask2C<F, E>,
): <A, B, C, D>(
  f: (a: A) => Kind2<F, E, C>,
  g: (b: B) => Kind2<F, E, D>,
) => (fa: TE.TaskEither<A, B>) => Kind2<F, E, TE.TaskEither<C, D>>
export function bitraverse<F extends URIS>(
  M: MonadTask1<F>,
): <A, B, C, D>(
  f: (a: A) => Kind<F, C>,
  g: (b: B) => Kind<F, D>,
) => (fa: TE.TaskEither<A, B>) => Kind<F, TE.TaskEither<C, D>>
export function bitraverse<F>(
  M: MonadTask<F>,
): <A, B, C, D>(
  f: (a: A) => HKT<F, C>,
  g: (b: B) => HKT<F, D>,
) => (fa: TE.TaskEither<A, B>) => HKT<F, TE.TaskEither<C, D>> {
  return <A, B, C, D>(
    f: (a: A) => HKT<F, C>,
    g: (b: B) => HKT<F, D>,
  ): ((fa: TE.TaskEither<A, B>) => HKT<F, TE.TaskEither<C, D>>) =>
    flow(
      TE.foldW(
        a => async () => M.map(f(a), c => TE.left<C, D>(c)),
        b => async () => M.map(g(b), d => TE.right<C, D>(d)),
      ),
      _ => M.chain(M.fromTask(_), identity),
    )
}
