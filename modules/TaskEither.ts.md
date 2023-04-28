---
title: TaskEither.ts
nav_order: 7
parent: Modules
---

## TaskEither overview

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
  M: MonadTask4<M>
): <S, R, E, A, B>(
  fga: TE.TaskEither<Kind4<M, S, R, E, A>, Kind4<M, S, R, E, B>>
) => Kind4<M, S, R, E, TE.TaskEither<A, B>>
export declare function bisequence<M extends URIS3>(
  M: MonadTask3<M>
): <R, E, A, B>(fga: TE.TaskEither<Kind3<M, R, E, A>, Kind3<M, R, E, B>>) => Kind3<M, R, E, TE.TaskEither<A, B>>
export declare function bisequence<M extends URIS3, E>(
  M: MonadTask3C<M, E>
): <R, A, B>(fga: TE.TaskEither<Kind3<M, R, E, A>, Kind3<M, R, E, B>>) => Kind3<M, R, E, TE.TaskEither<A, B>>
export declare function bisequence<M extends URIS2>(
  M: MonadTask2<M>
): <E, A, B>(fga: TE.TaskEither<Kind2<M, E, A>, Kind2<M, E, B>>) => Kind2<M, E, TE.TaskEither<A, B>>
export declare function bisequence<M extends URIS2, E>(
  M: MonadTask2C<M, E>
): <A, B>(fga: TE.TaskEither<Kind2<M, E, A>, Kind2<M, E, B>>) => Kind2<M, E, TE.TaskEither<A, B>>
export declare function bisequence<M extends URIS>(
  M: MonadTask1<M>
): <A, B>(fga: TE.TaskEither<Kind<M, A>, Kind<M, B>>) => Kind<M, TE.TaskEither<A, B>>
```

Added in v1.0.0

## bitraverse

**Signature**

```ts
export declare function bitraverse<F extends URIS4>(
  M: MonadTask4<F>
): <S, R, E, A, B, C, D>(
  f: (a: A) => Kind4<F, S, R, E, C>,
  g: (b: B) => Kind4<F, S, R, E, D>
) => (fa: TE.TaskEither<A, B>) => Kind4<F, S, R, E, TE.TaskEither<C, D>>
export declare function bitraverse<F extends URIS3>(
  M: MonadTask3<F>
): <R, E, A, B, C, D>(
  f: (a: A) => Kind3<F, R, E, C>,
  g: (b: B) => Kind3<F, R, E, D>
) => (fa: TE.TaskEither<A, B>) => Kind3<F, R, E, TE.TaskEither<C, D>>
export declare function bitraverse<F extends URIS3, E>(
  M: MonadTask3C<F, E>
): <R, A, B, C, D>(
  f: (a: A) => Kind3<F, R, E, C>,
  g: (b: B) => Kind3<F, R, E, D>
) => (fa: TE.TaskEither<A, B>) => Kind3<F, R, E, TE.TaskEither<C, D>>
export declare function bitraverse<F extends URIS2>(
  M: MonadTask2<F>
): <E, A, B, C, D>(
  f: (a: A) => Kind2<F, E, C>,
  g: (b: B) => Kind2<F, E, D>
) => (fa: TE.TaskEither<A, B>) => Kind2<F, E, TE.TaskEither<C, D>>
export declare function bitraverse<F extends URIS2, E>(
  M: MonadTask2C<F, E>
): <A, B, C, D>(
  f: (a: A) => Kind2<F, E, C>,
  g: (b: B) => Kind2<F, E, D>
) => (fa: TE.TaskEither<A, B>) => Kind2<F, E, TE.TaskEither<C, D>>
export declare function bitraverse<F extends URIS>(
  M: MonadTask1<F>
): <A, B, C, D>(
  f: (a: A) => Kind<F, C>,
  g: (b: B) => Kind<F, D>
) => (fa: TE.TaskEither<A, B>) => Kind<F, TE.TaskEither<C, D>>
```

Added in v1.0.0
