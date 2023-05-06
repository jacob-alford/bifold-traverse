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
- [Utilities](#utilities)
  - [traverseLeft](#traverseleft)

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
  <F, E>(F: Applicative3C<F, E>): <R, A, B>(
    fga: E.Either<Kind3<F, R, E, A>, Kind3<F, R, E, B>>
  ) => Kind3<F, R, E, E.Either<A, B>>
  <F>(F: Applicative2<F>): <E, A, B>(fga: E.Either<Kind2<F, E, A>, Kind2<F, E, B>>) => Kind2<F, E, E.Either<A, B>>
  <F, E>(F: Applicative2C<F, E>): <A, B>(fga: E.Either<Kind2<F, E, A>, Kind2<F, E, B>>) => Kind2<F, E, E.Either<A, B>>
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

**Example**

```ts
import { bitraverse } from '@jacob-alford/bifold-traverse/Either'
import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'

type WideEither = E.Either<string | Error, string | number>
type NarrowedEither = E.Either<Error, number>

const e1: WideEither = E.left('string')
const e2: WideEither = E.left(new Error('error'))
const e3: WideEither = E.right('string')
const e4: WideEither = E.right(1)

const narrowEither: (e: WideEither) => O.Option<NarrowedEither> = bitraverse(O.Applicative)(
  O.fromPredicate((s): s is Error => s instanceof Error),
  O.fromPredicate((s): s is number => typeof s === 'number')
)

const r1 = pipe(e1, narrowEither)
assert.deepStrictEqual(r1, O.none)
const r2 = pipe(e2, narrowEither)
assert.deepStrictEqual(r2, O.some(E.left(new Error('error'))))
const r3 = pipe(e3, narrowEither)
assert.deepStrictEqual(r3, O.none)
const r4 = pipe(e4, narrowEither)
assert.deepStrictEqual(r4, O.some(E.right(1)))
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

# Utilities

## traverseLeft

**Signature**

```ts
export declare const traverseLeft: {
  <F>(F: Applicative4<F>): <S, R, E, A, B>(
    f: (a: A) => Kind4<F, S, R, E, B>
  ) => <C>(ta: E.Either<A, C>) => Kind4<F, S, R, E, E.Either<B, C>>
  <F>(F: Applicative3<F>): <R, E, A, B>(
    f: (a: A) => Kind3<F, R, E, B>
  ) => <C>(ta: E.Either<A, C>) => Kind3<F, R, E, E.Either<B, C>>
  <F, E>(F: Applicative3C<F, E>): <R, A, B>(
    f: (a: A) => Kind3<F, R, E, B>
  ) => <C>(ta: E.Either<A, C>) => Kind3<F, R, E, E.Either<B, C>>
  <F>(F: Applicative2<F>): <E, A, B>(
    f: (a: A) => Kind2<F, E, B>
  ) => <C>(ta: E.Either<A, C>) => Kind2<F, E, E.Either<B, C>>
  <F, E>(F: Applicative2C<F, E>): <A, B>(
    f: (a: A) => Kind2<F, E, B>
  ) => <C>(ta: E.Either<A, C>) => Kind2<F, E, E.Either<B, C>>
  <F>(F: Applicative1<F>): <A, B>(f: (a: A) => Kind<F, B>) => <C>(ta: E.Either<A, C>) => Kind<F, E.Either<B, C>>
  <F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, B>) => <C>(ta: E.Either<A, C>) => HKT<F, E.Either<B, C>>
}
```

Added in v1.1.0
