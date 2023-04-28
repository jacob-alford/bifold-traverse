---
title: Separated.ts
nav_order: 7
parent: Modules
---

## Separated overview

Bifoldable and Bitraversable instances for Separated

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

---

# Instance Methods

## bifoldMap

**Signature**

```ts
export declare const bifoldMap: <S>(
  S: Semigroup<S>
) => <A, B>(f: (a: A) => S, g: (b: B) => S) => (fa: Sep.Separated<A, B>) => S
```

Added in v1.0.0

## bireduce

**Signature**

```ts
export declare const bireduce: <A, B, C>(
  c: C,
  f: (c: C, a: A) => C,
  g: (c: C, b: B) => C
) => (fa: Sep.Separated<A, B>) => C
```

Added in v1.0.0

## bireduceRight

**Signature**

```ts
export declare const bireduceRight: <A, B, C>(
  c: C,
  f: (a: A, c: C) => C,
  g: (b: B, c: C) => C
) => (fa: Sep.Separated<A, B>) => C
```

Added in v1.0.0

## bisequence

**Signature**

```ts
export declare const bisequence: {
  <F>(F: Applicative4<F>): <S, R, E, A, B>(
    fga: Sep.Separated<Kind4<F, S, R, E, A>, Kind4<F, S, R, E, B>>
  ) => Kind4<F, S, R, E, Sep.Separated<A, B>>
  <F>(F: Applicative3<F>): <R, E, A, B>(
    fga: Sep.Separated<Kind3<F, R, E, A>, Kind3<F, R, E, B>>
  ) => Kind3<F, R, E, Sep.Separated<A, B>>
  <F>(F: Applicative2<F>): <E, A, B>(
    fga: Sep.Separated<Kind2<F, E, A>, Kind2<F, E, B>>
  ) => Kind2<F, E, Sep.Separated<A, B>>
  <F>(F: Applicative1<F>): <A, B>(fga: Sep.Separated<Kind<F, A>, Kind<F, B>>) => Kind<F, Sep.Separated<A, B>>
  <F>(F: Applicative<F>): <A, B>(fga: Sep.Separated<HKT<F, A>, HKT<F, B>>) => HKT<'Separated', Sep.Separated<A, B>>
}
```

Added in v1.0.0

## bitraverse

**Signature**

```ts
export declare const bitraverse: PipeableBitraverse<'Separated'>
```

Added in v1.0.0

# Instances

## Bifoldable

**Signature**

```ts
export declare const Bifoldable: Bifoldable2<'Separated'>
```

Added in v1.0.0

## Bitraversable

**Signature**

```ts
export declare const Bitraversable: Bitraversable2<'Separated'>
```

Added in v1.0.0

# Utilities

## bifold

**Signature**

```ts
export declare const bifold: <M>(M: Monoid<M>) => (fa: Sep.Separated<M, M>) => M
```

Added in v1.0.0
