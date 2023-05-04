---
title: These.ts
nav_order: 10
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

**Example**

```ts
import { bifoldMap } from '@jacob-alford/bifold-traverse/These'
import * as Str from 'fp-ts/string'
import * as Th from 'fp-ts/These'

const uppercaseFold: (fa: Th.These<string, string>) => string = bifoldMap(Str.Monoid)(Str.toLowerCase, Str.toUpperCase)

assert.deepStrictEqual(uppercaseFold(Th.left('Foo')), 'foo')
assert.deepStrictEqual(uppercaseFold(Th.right('bar')), 'BAR')
assert.deepStrictEqual(uppercaseFold(Th.both('foo', 'bar')), 'fooBAR')
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
export declare const bisequence: {
  <F>(F: Applicative4<F>): <S, R, E, A, B>(
    fga: Th.These<Kind4<F, S, R, E, A>, Kind4<F, S, R, E, B>>
  ) => Kind4<F, S, R, E, Th.These<A, B>>
  <F>(F: Applicative3<F>): <R, E, A, B>(
    fga: Th.These<Kind3<F, R, E, A>, Kind3<F, R, E, B>>
  ) => Kind3<F, R, E, Th.These<A, B>>
  <F, E>(F: Applicative3C<F, E>): <R, A, B>(
    fga: Th.These<Kind3<F, R, E, A>, Kind3<F, R, E, B>>
  ) => Kind3<F, R, E, Th.These<A, B>>
  <F>(F: Applicative2<F>): <E, A, B>(fga: Th.These<Kind2<F, E, A>, Kind2<F, E, B>>) => Kind2<F, E, Th.These<A, B>>
  <F, E>(F: Applicative2C<F, E>): <A, B>(fga: Th.These<Kind2<F, E, A>, Kind2<F, E, B>>) => Kind2<F, E, Th.These<A, B>>
  <F>(F: Applicative1<F>): <A, B>(fga: Th.These<Kind<F, A>, Kind<F, B>>) => Kind<F, Th.These<A, B>>
  <F>(F: Applicative<F>): <A, B>(fga: Th.These<HKT<F, A>, HKT<F, B>>) => HKT<'These', Th.These<A, B>>
}
```

Added in v1.0.0

## bitraverse

**Signature**

```ts
export declare const bitraverse: PipeableBitraverse<'These'>
```

Added in v1.0.0

# Instances

## Bifoldable

**Signature**

```ts
export declare const Bifoldable: Bifoldable2<'These'>
```

Added in v1.0.0

## Bitraversable

**Signature**

```ts
export declare const Bitraversable: Bitraversable2<'These'>
```

Added in v1.0.0

# Utilities

## bifold

**Signature**

```ts
export declare const bifold: <M>(M: Monoid<M>) => (fa: Th.These<M, M>) => M
```

Added in v1.0.0
