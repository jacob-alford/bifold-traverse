---
title: IOEither.ts
nav_order: 4
parent: Modules
---

## IOEither overview

`bisequence` and `bitraverse` for `TaskEither`.

_Note: TaskEither has neither `Bifoldable` nor `Bitraversable` instances due to the
nature of task_

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Instance Methods](#instance-methods)
  - [bisequence](#bisequence)
  - [bitraverse](#bitraverse)

---

# Instance Methods

## bisequence

**Signature**

```ts
export declare function bisequence<M extends URIS4>(
  M: MonadIO4<M>
): <S, R, E, A, B>(
  fga: IOE.IOEither<Kind4<M, S, R, E, A>, Kind4<M, S, R, E, B>>
) => Kind4<M, S, R, E, IOE.IOEither<A, B>>
export declare function bisequence<M extends URIS3>(
  M: MonadIO3<M>
): <R, E, A, B>(fga: IOE.IOEither<Kind3<M, R, E, A>, Kind3<M, R, E, B>>) => Kind3<M, R, E, IOE.IOEither<A, B>>
export declare function bisequence<M extends URIS3, E>(
  M: MonadIO3C<M, E>
): <R, A, B>(fga: IOE.IOEither<Kind3<M, R, E, A>, Kind3<M, R, E, B>>) => Kind3<M, R, E, IOE.IOEither<A, B>>
export declare function bisequence<M extends URIS2>(
  M: MonadIO2<M>
): <E, A, B>(fga: IOE.IOEither<Kind2<M, E, A>, Kind2<M, E, B>>) => Kind2<M, E, IOE.IOEither<A, B>>
export declare function bisequence<M extends URIS2, E>(
  M: MonadIO2C<M, E>
): <A, B>(fga: IOE.IOEither<Kind2<M, E, A>, Kind2<M, E, B>>) => Kind2<M, E, IOE.IOEither<A, B>>
export declare function bisequence<M extends URIS>(
  M: MonadIO1<M>
): <A, B>(fga: IOE.IOEither<Kind<M, A>, Kind<M, B>>) => Kind<M, IOE.IOEither<A, B>>
```

Added in v1.0.0

## bitraverse

**Signature**

```ts
export declare function bitraverse<F extends URIS4>(
  M: MonadIO4<F>
): <S, R, E, A, B, C, D>(
  f: (a: A) => Kind4<F, S, R, E, C>,
  g: (b: B) => Kind4<F, S, R, E, D>
) => (fa: IOE.IOEither<A, B>) => Kind4<F, S, R, E, IOE.IOEither<C, D>>
export declare function bitraverse<F extends URIS3>(
  M: MonadIO3<F>
): <R, E, A, B, C, D>(
  f: (a: A) => Kind3<F, R, E, C>,
  g: (b: B) => Kind3<F, R, E, D>
) => (fa: IOE.IOEither<A, B>) => Kind3<F, R, E, IOE.IOEither<C, D>>
export declare function bitraverse<F extends URIS3, E>(
  M: MonadIO3C<F, E>
): <R, A, B, C, D>(
  f: (a: A) => Kind3<F, R, E, C>,
  g: (b: B) => Kind3<F, R, E, D>
) => (fa: IOE.IOEither<A, B>) => Kind3<F, R, E, IOE.IOEither<C, D>>
export declare function bitraverse<F extends URIS2>(
  M: MonadIO2<F>
): <E, A, B, C, D>(
  f: (a: A) => Kind2<F, E, C>,
  g: (b: B) => Kind2<F, E, D>
) => (fa: IOE.IOEither<A, B>) => Kind2<F, E, IOE.IOEither<C, D>>
export declare function bitraverse<F extends URIS2, E>(
  M: MonadIO2C<F, E>
): <A, B, C, D>(
  f: (a: A) => Kind2<F, E, C>,
  g: (b: B) => Kind2<F, E, D>
) => (fa: IOE.IOEither<A, B>) => Kind2<F, E, IOE.IOEither<C, D>>
export declare function bitraverse<F extends URIS>(
  M: MonadIO1<F>
): <A, B, C, D>(
  f: (a: A) => Kind<F, C>,
  g: (b: B) => Kind<F, D>
) => (fa: IOE.IOEither<A, B>) => Kind<F, IOE.IOEither<C, D>>
```

Added in v1.0.0
