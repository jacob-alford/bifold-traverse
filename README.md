<br>
<div align="center">
  <img src="./assets/bifold-traverse.jpg" style="margin-top: 48px; width: 100%; max-width: 846px; border: 5px solid rgba(205,127,50,0.5); filter: drop-shadow(0 0 0.5rem rgba(0,0,0,0.5));"/>
</div>
<br><br>
<h1 align="center" style="margin: 12px 0px 12px 0px; padding-bottom: 12px;">
bifold-traverse
</h1>

<p align="center" style="margin-bottom: 12px;">
Bifoldable and Bitraversable typeclasses for fp-ts 2.x
</p>

<div align="center">

[![NPM Version](https://badge.fury.io/js/@jacob-alford%2Fbifold-traverse.svg)](https://badge.fury.io/js/@jacob-alford%2Fbifold-traverse)
[![Coverage Status](https://coveralls.io/repos/github/jacob-alford/bifold-traverse/badge.svg?branch=main)](https://coveralls.io/github/jacob-alford/bifold-traverse?branch=main)
![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/@jacob-alford%252fbifold-traverse)

</div>

<br><br>

## Welcome

`bifold-traverse` is a port of [purescript-foldable-traversable](https://pursuit.purescript.org/packages/purescript-foldable-traversable/6.0.0/docs/Data.Bifoldable#t:Bifoldable)'s `Bifoldable` and `Bitraversable` typeclasses to fp-ts 2.x.

Bifoldable and Bitraversable are typeclasses with instances in Either, IOEither, ReadonlyTuple, and Separated. Additional utilities `bisequence` and `bitraverse` are also provided for TaskEither.

## Installation

Uses `fp-ts` as a peer dependency. Read more about peer dependencies at [nodejs.org](https://nodejs.org/en/blog/npm/peer-dependencies/).

### Yarn

```bash
yarn add @jacob-alford/bifold-traverse
```

### NPM

```bash
npm install @jacob-alford/bifold-traverse
```

### PNPM

```bash
pnpm add @jacob-alford/bifold-traverse
```

## Documentation

- [@jacob-alford/bifold-traverse](https://jacob-alford.github.io/bifold-traverse/)
- [fp-ts](https://gcanti.github.io/fp-ts/modules/)

## Explanation

### Bifoldable

`fp-ts` comes with a built in `Foldable` typeclass which is built for data-types that have a single type parameter. For data-types with two type-parameters this can be limiting as certain assumptions are made about how to handle the first type parameter.

`Bifoldable` is useful for when you want to collapse a data-type with two type parameters into a single type while also considering the first type parameter. For example, here is an example using `bifoldMap` from the exported `These` module:

```typescript
import { bifoldMap } from '@jacob-alford/bifold-traverse/These'
import * as Str from 'fp-ts/string'
import * as Th from 'fp-ts/These'

const uppercaseFold: (fa: Th.These<string, string>) => string = bifoldMap(Str.Monoid)(
  Str.toLowercase,
  Str.toUppercase,
)

assert.deepStrictEqual(uppercaseFold(Th.left('Foo')), 'foo')
assert.deepStrictEqual(uppercaseFold(Th.right('bar')), 'BAR')
assert.deepStrictEqual(uppercaseFold(Th.both('foo', 'bar')), 'fooBAR')
```

Here we fold over `These` and collapse the sum type into a common monoid while mapping each type parameter.

### Bitraversable

Like `Foldable`, `Traversable` only accounts for a single type parameter. And like `Bifoldable`, `Bitraversable` allows you to account for both type-parameters while traversing and sequencing.

The following example illustrates the limitation of using `traverse` on two-parameter data-types. We are able to narrow Either's success parameter to a number, but we are unable to narrow the error parameter.

```typescript
import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'

const e: E.Either<string | Error, string | number> = E.left('string')

const result = pipe(
  e,
  E.traverse(O.Applicative)(O.fromPredicate((s): s is number => typeof s === 'number')),
)
// result: Option<Either<string | Error, number>>
```

Unlike `Traversable`, `Bitraversable` is built for data-types with two type parameters, and allows us to traverse both type parameters at the same time.

The following admittedly complex example traverses a `Separated` data type with a collection of failures and successes, filtering both data types and short-circuiting on a critical error.

```typescript
import { bitraverse } from '@jacob-alford/bifold-traverse/Separated'
import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import * as RA from 'fp-ts/ReadonlyArray'
import * as Sep from 'fp-ts/Separated'
import { flow } from 'fp-ts/function'

type RelevantError = { readonly _tag: 'relevant-error'; message: string }

type IrrelevantError = { readonly _tag: 'irrelevant-error' }

type CriticalError = { readonly _tag: 'critical-error'; reason: string }

type Error = RelevantError | IrrelevantError | CriticalError

const relevantError: (message: string) => Error = message => ({
  _tag: 'relevant-error',
  message,
})

const irrelevantError: Error = { _tag: 'irrelevant-error' }

const criticalError: (reason: string) => Error = reason => ({
  _tag: 'critical-error',
  reason,
})

const parseSemicolonList: (s: string) => O.Option<ReadonlyArray<string>> = flow(
  O.fromPredicate(s => /^((.*);)(.*)(;?)$/.test(s)),
  O.map(s => s.split(';')),
)

const collectErrorsAndParseSuccesses: (
  fa: Sep.Separated<ReadonlyArray<Error>, ReadonlyArray<string>>,
) => E.Either<
  CriticalError,
  Sep.Separated<ReadonlyArray<RelevantError>, ReadonlyArray<string>>
> = bitraverse(E.Applicative)(
  flow(
    E.traverseArray(
      E.fromPredicate(
        (err): err is RelevantError | IrrelevantError => err._tag !== 'critical-error',
        err => (err._tag === 'critical-error' ? `Error: ${err.reason}` : `Error`),
      ),
    ),
    E.bimap(
      err => ({ _tag: 'critical-error', reason: err }),
      RA.filter((err): err is RelevantError => err._tag === 'relevant-error'),
    ),
  ),
  flow(
    O.traverseArray(parseSemicolonList),
    O.map(RA.flatten),
    E.fromOption(() => ({
      _tag: 'critical-error',
      reason: 'failed to parse string',
    })),
  ),
)

assert.deepStrictEqual(
  collectErrorsAndParseSuccesses(
    Sep.separated(
      [relevantError('first error'), relevantError('second error'), irrelevantError],
      ['foo;bar;baz', 'qux;quux;quuz'],
    ),
  ),
  E.right(
    Sep.separated(
      [relevantError('first error'), relevantError('second error')],
      ['foo', 'bar', 'baz', 'qux', 'quux', 'quuz'],
    ),
  ),
)

assert.deepStrictEqual(
  collectErrorsAndParseSuccesses(
    Sep.separated(
      [
        relevantError('first error'),
        relevantError('second error'),
        criticalError('critical error'),
      ],
      ['foo;bar;baz', 'qux;quux;quuz'],
    ),
  ),
  E.left(criticalError('Error: critical error')),
)
```

`bisequence` here is useful for the same reasons as `bitraverse` but for when the inner HKT is already established.
