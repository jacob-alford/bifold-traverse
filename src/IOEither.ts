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
import * as IOE from 'fp-ts/IOEither'
import {
  MonadIO,
  MonadIO1,
  MonadIO2,
  MonadIO2C,
  MonadIO3,
  MonadIO3C,
  MonadIO4,
} from 'fp-ts/MonadIO'

// -------------------------------------------------------------------------------------
// instance methods
// -------------------------------------------------------------------------------------

/**
 * @since 1.0.0
 * @category Instance Methods
 */
export function bisequence<M extends URIS4>(
  M: MonadIO4<M>,
): <S, R, E, A, B>(
  fga: IOE.IOEither<Kind4<M, S, R, E, A>, Kind4<M, S, R, E, B>>,
) => Kind4<M, S, R, E, IOE.IOEither<A, B>>
export function bisequence<M extends URIS3>(
  M: MonadIO3<M>,
): <R, E, A, B>(
  fga: IOE.IOEither<Kind3<M, R, E, A>, Kind3<M, R, E, B>>,
) => Kind3<M, R, E, IOE.IOEither<A, B>>
export function bisequence<M extends URIS3, E>(
  M: MonadIO3C<M, E>,
): <R, A, B>(
  fga: IOE.IOEither<Kind3<M, R, E, A>, Kind3<M, R, E, B>>,
) => Kind3<M, R, E, IOE.IOEither<A, B>>
export function bisequence<M extends URIS2>(
  M: MonadIO2<M>,
): <E, A, B>(
  fga: IOE.IOEither<Kind2<M, E, A>, Kind2<M, E, B>>,
) => Kind2<M, E, IOE.IOEither<A, B>>
export function bisequence<M extends URIS2, E>(
  M: MonadIO2C<M, E>,
): <A, B>(
  fga: IOE.IOEither<Kind2<M, E, A>, Kind2<M, E, B>>,
) => Kind2<M, E, IOE.IOEither<A, B>>
export function bisequence<M extends URIS>(
  M: MonadIO1<M>,
): <A, B>(fga: IOE.IOEither<Kind<M, A>, Kind<M, B>>) => Kind<M, IOE.IOEither<A, B>>
export function bisequence<M>(
  M: MonadIO<M>,
): <A, B>(fga: IOE.IOEither<HKT<M, A>, HKT<M, B>>) => HKT<M, IOE.IOEither<A, B>> {
  // @ts-expect-error -- overload signature is not narrowing correctly
  return bitraverse(M)(identity, identity)
}

/**
 * @since 1.0.0
 * @category Instance Methods
 */
export function bitraverse<F extends URIS4>(
  M: MonadIO4<F>,
): <S, R, E, A, B, C, D>(
  f: (a: A) => Kind4<F, S, R, E, C>,
  g: (b: B) => Kind4<F, S, R, E, D>,
) => (fa: IOE.IOEither<A, B>) => Kind4<F, S, R, E, IOE.IOEither<C, D>>
export function bitraverse<F extends URIS3>(
  M: MonadIO3<F>,
): <R, E, A, B, C, D>(
  f: (a: A) => Kind3<F, R, E, C>,
  g: (b: B) => Kind3<F, R, E, D>,
) => (fa: IOE.IOEither<A, B>) => Kind3<F, R, E, IOE.IOEither<C, D>>
export function bitraverse<F extends URIS3, E>(
  M: MonadIO3C<F, E>,
): <R, A, B, C, D>(
  f: (a: A) => Kind3<F, R, E, C>,
  g: (b: B) => Kind3<F, R, E, D>,
) => (fa: IOE.IOEither<A, B>) => Kind3<F, R, E, IOE.IOEither<C, D>>
export function bitraverse<F extends URIS2>(
  M: MonadIO2<F>,
): <E, A, B, C, D>(
  f: (a: A) => Kind2<F, E, C>,
  g: (b: B) => Kind2<F, E, D>,
) => (fa: IOE.IOEither<A, B>) => Kind2<F, E, IOE.IOEither<C, D>>
export function bitraverse<F extends URIS2, E>(
  M: MonadIO2C<F, E>,
): <A, B, C, D>(
  f: (a: A) => Kind2<F, E, C>,
  g: (b: B) => Kind2<F, E, D>,
) => (fa: IOE.IOEither<A, B>) => Kind2<F, E, IOE.IOEither<C, D>>
export function bitraverse<F extends URIS>(
  M: MonadIO1<F>,
): <A, B, C, D>(
  f: (a: A) => Kind<F, C>,
  g: (b: B) => Kind<F, D>,
) => (fa: IOE.IOEither<A, B>) => Kind<F, IOE.IOEither<C, D>>
export function bitraverse<F>(
  M: MonadIO<F>,
): <A, B, C, D>(
  f: (a: A) => HKT<F, C>,
  g: (b: B) => HKT<F, D>,
) => (fa: IOE.IOEither<A, B>) => HKT<F, IOE.IOEither<C, D>> {
  return <A, B, C, D>(
    f: (a: A) => HKT<F, C>,
    g: (b: B) => HKT<F, D>,
  ): ((fa: IOE.IOEither<A, B>) => HKT<F, IOE.IOEither<C, D>>) =>
    flow(
      IOE.foldW(
        a => () => M.map(f(a), c => IOE.left<C, D>(c)),
        b => () => M.map(g(b), d => IOE.right<C, D>(d)),
      ),
      _ => M.chain(M.fromIO(_), identity),
    )
}
