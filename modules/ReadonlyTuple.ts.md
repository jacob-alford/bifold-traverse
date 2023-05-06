---
title: ReadonlyTuple.ts
nav_order: 6
parent: Modules
---

## ReadonlyTuple overview

Bifoldable and Bitraversable instances for ReadonlyTuple

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Instance Methods](#instance-methods)
  - [bifoldMap](#bifoldmap)
  - [bireduce](#bireduce)
  - [bireduceRight](#bireduceright)
  - [bisequence](#bisequence)
  - [bitraverse](#bitraverse)
- [Instances](#instances)
  - [Bifoldable](#bifoldable)
  - [Bitraversable](#bitraversable)
- [Utilities](#utilities)
  - [bifold](#bifold)
  - [traverseFst](#traversefst)
  - [traverseSnd](#traversesnd)

---

# Instance Methods

## bifoldMap

Note: ReadonlyTuple is defined backwards, and the first mapping function takes the
second element, i.e. f: (a: A) => S, g: (b: B) => S

**Signature**

```ts
export declare const bifoldMap: <S>(
  S: Semigroup<S>
) => <A, B>(f: (a: A) => S, g: (b: B) => S) => (fa: readonly [B, A]) => S
```

Added in v1.0.0

## bireduce

**Signature**

```ts
export declare const bireduce: <A, B, C>(c: C, f: (c: C, a: A) => C, g: (c: C, b: B) => C) => (fa: readonly [B, A]) => C
```

Added in v1.0.0

## bireduceRight

**Signature**

```ts
export declare const bireduceRight: <A, B, C>(
  c: C,
  f: (a: A, c: C) => C,
  g: (b: B, c: C) => C
) => (fa: readonly [B, A]) => C
```

Added in v1.0.0

## bisequence

**Signature**

```ts
export declare const bisequence: {
  <F>(F: Applicative4<F>): <S, R, E, A, B>(
    fga: readonly [Kind4<F, S, R, E, B>, Kind4<F, S, R, E, A>]
  ) => Kind4<F, S, R, E, readonly [B, A]>
  <F>(F: Applicative3<F>): <R, E, A, B>(
    fga: readonly [Kind3<F, R, E, B>, Kind3<F, R, E, A>]
  ) => Kind3<F, R, E, readonly [B, A]>
  <F, E>(F: Applicative3C<F, E>): <R, A, B>(
    fga: readonly [Kind3<F, R, E, B>, Kind3<F, R, E, A>]
  ) => Kind3<F, R, E, readonly [B, A]>
  <F>(F: Applicative2<F>): <E, A, B>(fga: readonly [Kind2<F, E, B>, Kind2<F, E, A>]) => Kind2<F, E, readonly [B, A]>
  <F, E>(F: Applicative2C<F, E>): <A, B>(fga: readonly [Kind2<F, E, B>, Kind2<F, E, A>]) => Kind2<F, E, readonly [B, A]>
  <F>(F: Applicative1<F>): <A, B>(fga: readonly [Kind<F, B>, Kind<F, A>]) => Kind<F, readonly [B, A]>
  <F>(F: Applicative<F>): <A, B>(fga: readonly [HKT<F, B>, HKT<F, A>]) => HKT<'ReadonlyTuple', readonly [B, A]>
}
```

Added in v1.0.0

## bitraverse

**Signature**

```ts
export declare const bitraverse: PipeableBitraverse<'ReadonlyTuple'>
```

Added in v1.0.0

# Instances

## Bifoldable

**Signature**

```ts
export declare const Bifoldable: Bifoldable2<'ReadonlyTuple'>
```

Added in v1.0.0

## Bitraversable

**Signature**

```ts
export declare const Bitraversable: Bitraversable2<'ReadonlyTuple'>
```

Added in v1.0.0

# Utilities

## bifold

**Signature**

```ts
export declare const bifold: <M>(M: Monoid<M>) => (fa: readonly [M, M]) => M
```

Added in v1.0.0

## traverseFst

**Signature**

```ts
export declare const traverseFst: {
  <F>(F: Applicative4<F>): <S, R, E, B, C>(
    g: (b: B) => Kind4<F, S, R, E, C>
  ) => <A>(ta: readonly [B, A]) => Kind4<F, S, R, E, readonly [C, A]>
  <F>(F: Applicative3<F>): <R, E, B, C>(
    g: (b: B) => Kind3<F, R, E, C>
  ) => <A>(ta: readonly [B, A]) => Kind3<F, R, E, readonly [C, A]>
  <F, E>(F: Applicative3C<F, E>): <R, B, C>(
    g: (b: B) => Kind3<F, R, E, C>
  ) => <A>(ta: readonly [B, A]) => Kind3<F, R, E, readonly [C, A]>
  <F>(F: Applicative2<F>): <E, B, C>(
    g: (b: B) => Kind2<F, E, C>
  ) => <A>(ta: readonly [B, A]) => Kind2<F, E, readonly [C, A]>
  <F, E>(F: Applicative2C<F, E>): <B, C>(
    g: (b: B) => Kind2<F, E, C>
  ) => <A>(ta: readonly [B, A]) => Kind2<F, E, readonly [C, A]>
  <F>(F: Applicative1<F>): <B, C>(g: (b: B) => Kind<F, C>) => <A>(ta: readonly [B, A]) => Kind<F, readonly [C, A]>
  <F>(F: Applicative<F>): <B, C>(g: (b: B) => HKT<F, C>) => <A>(ta: readonly [B, A]) => HKT<F, readonly [C, A]>
}
```

Added in v1.1.0

## traverseSnd

**Signature**

```ts
export declare const traverseSnd: {
  <F>(F: Applicative4<F>): <S, R, E, A, B>(
    f: (a: A) => Kind4<F, S, R, E, B>
  ) => <C>(ta: readonly [C, A]) => Kind4<F, S, R, E, readonly [C, B]>
  <F>(F: Applicative3<F>): <R, E, A, B>(
    f: (a: A) => Kind3<F, R, E, B>
  ) => <C>(ta: readonly [C, A]) => Kind3<F, R, E, readonly [C, B]>
  <F, E>(F: Applicative3C<F, E>): <R, A, B>(
    f: (a: A) => Kind3<F, R, E, B>
  ) => <C>(ta: readonly [C, A]) => Kind3<F, R, E, readonly [C, B]>
  <F>(F: Applicative2<F>): <E, A, B>(
    f: (a: A) => Kind2<F, E, B>
  ) => <C>(ta: readonly [C, A]) => Kind2<F, E, readonly [C, B]>
  <F, E>(F: Applicative2C<F, E>): <A, B>(
    f: (a: A) => Kind2<F, E, B>
  ) => <C>(ta: readonly [C, A]) => Kind2<F, E, readonly [C, B]>
  <F>(F: Applicative1<F>): <A, B>(f: (a: A) => Kind<F, B>) => <C>(ta: readonly [C, A]) => Kind<F, readonly [C, B]>
  <F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, B>) => <C>(ta: readonly [C, A]) => HKT<F, readonly [C, B]>
}
```

Added in v1.1.0
