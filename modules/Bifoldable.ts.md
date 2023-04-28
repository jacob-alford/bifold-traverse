---
title: Bifoldable.ts
nav_order: 1
parent: Modules
---

## Bifoldable overview

A foldable typeclass for data types with two type parameters.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Typeclass](#typeclass)
  - [Bifoldable (interface)](#bifoldable-interface)
  - [Bifoldable2 (interface)](#bifoldable2-interface)
- [Utilities](#utilities)
  - [biall](#biall)
  - [biany](#biany)
  - [bifold](#bifold)

---

# Typeclass

## Bifoldable (interface)

**Signature**

```ts
export interface Bifoldable<F> {
  readonly bireduce: <A, B, C>(fa: HKT2<F, A, B>, b: C, f: (c: C, a: A) => C, g: (c: C, b: B) => C) => C
  readonly bireduceRight: <A, B, C>(fa: HKT2<F, A, B>, b: C, f: (a: A, c: C) => C, g: (b: B, c: C) => C) => C
  readonly bifoldMap: <M>(M: Monoid<M>) => <A, B>(fa: HKT2<F, A, B>, f: (a: A) => M, g: (b: B) => M) => M
}
```

Added in v1.0.0

## Bifoldable2 (interface)

**Signature**

```ts
export interface Bifoldable2<F extends URIS2> {
  readonly bireduce: <A, B, C>(fa: Kind2<F, A, B>, b: C, f: (c: C, a: A) => C, g: (c: C, b: B) => C) => C
  readonly bireduceRight: <A, B, C>(fa: Kind2<F, A, B>, b: C, f: (a: A, c: C) => C, g: (b: B, c: C) => C) => C
  readonly bifoldMap: <M>(M: Monoid<M>) => <A, B>(fa: Kind2<F, A, B>, f: (a: A) => M, g: (b: B) => M) => M
}
```

Added in v1.0.0

# Utilities

## biall

**Signature**

```ts
export declare function biall<T extends URIS2, C>(
  T: Bifoldable2<T>,
  C: BooleanAlgebra<C>
): <A, B>(pl: (a: A) => C, pr: (b: B) => C) => (fa: Kind2<T, A, B>) => C
```

Added in v1.0.0

## biany

**Signature**

```ts
export declare function biany<T extends URIS2, C>(
  T: Bifoldable2<T>,
  C: BooleanAlgebra<C>
): <A, B>(pl: (a: A) => C, pr: (b: B) => C) => (fa: Kind2<T, A, B>) => C
```

Added in v1.0.0

## bifold

**Signature**

```ts
export declare function bifold<T extends URIS2>(T: Bifoldable2<T>): <M>(M: Monoid<M>) => (fa: Kind2<T, M, M>) => M
```

Added in v1.0.0
