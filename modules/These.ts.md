---
title: These.ts
nav_order: 9
parent: Modules
---

## These overview

Bifoldable and Bitraversable instances for These.

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
) => <A, B>(f: (a: A) => S, g: (b: B) => S) => (fa: Th.These<A, B>) => S
```

Added in v1.0.0

## bireduce

**Signature**

```ts
export declare const bireduce: <A, B, C>(
  startWith: C,
  f: (c: C, a: A) => C,
  g: (c: C, b: B) => C
) => (fa: Th.These<A, B>) => C
```

Added in v1.0.0

## bireduceRight

**Signature**

```ts
export declare const bireduceRight: <A, B, C>(
  startWith: C,
  f: (a: A, c: C) => C,
  g: (b: B, c: C) => C
) => (fa: Th.These<A, B>) => C
```

Added in v1.0.0

## bisequence

**Signature**

```ts
export declare const bisequence: any
```

Added in v1.0.0

## bitraverse

**Signature**

```ts
export declare const bitraverse: any
```

Added in v1.0.0

# Instances

## Bifoldable

**Signature**

```ts
export declare const Bifoldable: any
```

Added in v1.0.0

## Bitraversable

**Signature**

```ts
export declare const Bitraversable: any
```

Added in v1.0.0

# Utilities

## bifold

**Signature**

```ts
export declare const bifold: any
```

Added in v1.0.0
