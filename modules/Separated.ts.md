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

**Example**

```ts
import { bitraverse } from '../../src/Separated'
import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import * as RA from 'fp-ts/ReadonlyArray'
import * as Sep from 'fp-ts/Separated'
import { flow } from 'fp-ts/function'

type RelevantError = { readonly _tag: 'relevant-error'; message: string }

type IrrelevantError = { readonly _tag: 'irrelevant-error' }

type CriticalError = { readonly _tag: 'critical-error'; reason: string }

type Error = RelevantError | IrrelevantError | CriticalError

const relevantError: (message: string) => Error = (message) => ({
  _tag: 'relevant-error',
  message,
})
const irrelevantError: Error = { _tag: 'irrelevant-error' }

const criticalError: (reason: string) => Error = (reason) => ({
  _tag: 'critical-error',
  reason,
})

const parseSemiList: (s: string) => O.Option<ReadonlyArray<string>> = flow(
  O.fromPredicate((s) => /^((.*);)(.*)(;?)$/.test(s)),
  O.map((s) => s.split(';'))
)

const collectErrorsAndParseSuccesses: (
  fa: Sep.Separated<ReadonlyArray<Error>, ReadonlyArray<string>>
) => E.Either<CriticalError, Sep.Separated<ReadonlyArray<RelevantError>, ReadonlyArray<string>>> = bitraverse(
  E.Applicative
)(
  flow(
    E.traverseArray(
      E.fromPredicate(
        (err): err is RelevantError | IrrelevantError => err._tag !== 'critical-error',
        (err) => (err._tag === 'critical-error' ? `Error: ${err.reason}` : `Error`)
      )
    ),
    E.bimap(
      (err) => ({ _tag: 'critical-error', reason: err }),
      RA.filter((err): err is RelevantError => err._tag === 'relevant-error')
    )
  ),
  flow(
    O.traverseArray(parseSemiList),
    O.map(RA.flatten),
    E.fromOption(() => ({
      _tag: 'critical-error',
      reason: 'failed to parse string',
    }))
  )
)

assert.deepStrictEqual(
  collectErrorsAndParseSuccesses(
    Sep.separated(
      [relevantError('first error'), relevantError('second error'), irrelevantError],
      ['foo;bar;baz', 'qux;quux;quuz']
    )
  ),
  E.right(
    Sep.separated(
      [relevantError('first error'), relevantError('second error')],
      ['foo', 'bar', 'baz', 'qux', 'quux', 'quuz']
    )
  )
)

assert.deepStrictEqual(
  collectErrorsAndParseSuccesses(
    Sep.separated(
      [relevantError('first error'), relevantError('second error'), criticalError('critical error')],
      ['foo;bar;baz', 'qux;quux;quuz']
    )
  ),
  E.left(criticalError('Error: critical error'))
)
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
