import { Bifoldable2 } from '@jacob-alford/bifold-traverse/Bifoldable'
import {
  Bitraversable2,
  PipeableBitraverse,
} from '@jacob-alford/bifold-traverse/Bitraversable'
import { pipe } from 'fp-ts/function'
import { Monoid } from 'fp-ts/Monoid'
import * as RTup from 'fp-ts/ReadonlyTuple'

// non-pipeables
const bifoldr_: Bifoldable2<RTup.URI>['bifoldr'] = ([b, a], c, f, g) => f(a, g(b, c))
const bifoldl_: Bifoldable2<RTup.URI>['bifoldl'] = ([b, a], c, f, g) => f(g(c, b), a)
const bifoldMap_: Bifoldable2<RTup.URI>['bifoldMap'] = M => ([b, a], f, g) =>
  M.concat(f(a), g(b))

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @since 0.0.1
 * @category Instance Methods
 */
export const bifoldr = <A, B, C>(c: C, f: (a: A, c: C) => C, g: (b: B, c: C) => C) => (
  fa: readonly [B, A],
): C => bifoldr_(fa, c, f, g)

/**
 * @since 0.0.1
 * @category Instance Methods
 */
export const bifoldl = <A, B, C>(c: C, f: (c: C, a: A) => C, g: (c: C, b: B) => C) => (
  fa: readonly [B, A],
): C => bifoldl_(fa, c, f, g)

/**
 * @since 0.0.1
 * @category Instance Methods
 */
export const bifoldMap = <M>(M: Monoid<M>) => <A, B>(f: (a: A) => M, g: (b: B) => M) => (
  fa: readonly [B, A],
): M => bifoldMap_(M)(fa, f, g)

/**
 * @since 0.0.1
 * @category Instances
 */
export const Bifoldable: Bifoldable2<RTup.URI> = {
  ...RTup.Bifunctor,
  bifoldr: bifoldr_,
  bifoldl: bifoldl_,
  bifoldMap: bifoldMap_,
}
