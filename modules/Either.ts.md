---
title: Either.ts
nav_order: 3
parent: Modules
---

## Either overview

Bifoldable and Bitraversable instances for Either. Note: utils `bireduce`,
`bireduceRight`, `bifoldMap` are omitted for either because they are equivalent to
`fold` already exported by fp-ts.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Instance Methods](#instance-methods)
  - [bisequence](#bisequence)
  - [bitraverse](#bitraverse)
- [Instances](#instances)
  - [Bifoldable](#bifoldable)
  - [Bitraversable](#bitraversable)

---

# Instance Methods

## bisequence

**Signature**

```ts
export declare const bisequence: {
  <F>(F: Applicative4<F>): <S, R, E, A, B>(
    fga: E.Either<Kind4<F, S, R, E, A>, Kind4<F, S, R, E, B>>
  ) => Kind4<F, S, R, E, E.Either<A, B>>
  <F>(F: Applicative3<F>): <R, E, A, B>(
    fga: E.Either<Kind3<F, R, E, A>, Kind3<F, R, E, B>>
  ) => Kind3<F, R, E, E.Either<A, B>>
  <F>(F: Applicative2<F>): <E, A, B>(fga: E.Either<Kind2<F, E, A>, Kind2<F, E, B>>) => Kind2<F, E, E.Either<A, B>>
  <F>(F: Applicative1<F>): <A, B>(fga: E.Either<Kind<F, A>, Kind<F, B>>) => Kind<F, E.Either<A, B>>
  <F>(F: Applicative<F>): <A, B>(fga: E.Either<HKT<F, A>, HKT<F, B>>) => HKT<'Either', E.Either<A, B>>
}
```

Added in v1.0.0

## bitraverse

**Signature**

```ts
export declare const bitraverse: PipeableBitraverse<'Either'>
```

Added in v1.0.0

# Instances

## Bifoldable

**Signature**

```ts
export declare const Bifoldable: Bifoldable2<'Either'>
```

Added in v1.0.0

## Bitraversable

**Signature**

```ts
export declare const Bitraversable: Bitraversable2<'Either'>
```

Added in v1.0.0
