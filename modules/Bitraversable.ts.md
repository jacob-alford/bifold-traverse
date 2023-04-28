---
title: Bitraversable.ts
nav_order: 2
parent: Modules
---

## Bitraversable overview

A typeclass for applicative traversal over a two-parameter data type.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Pipeable](#pipeable)
  - [PipeableBitraverse (type alias)](#pipeablebitraverse-type-alias)
- [Typeclass](#typeclass)
  - [Bitraversable (interface)](#bitraversable-interface)
  - [Bitraversable2 (interface)](#bitraversable2-interface)

---

# Pipeable

## PipeableBitraverse (type alias)

A definition for a pipeable version of `bitraverse`

**Signature**

```ts
export type PipeableBitraverse<T extends URIS2> = {
  <F extends URIS4>(F: Applicative4<F>): <S, R, E, A, B, C, D>(
    f: (a: A) => Kind4<F, S, R, E, C>,
    g: (b: B) => Kind4<F, S, R, E, D>
  ) => (fa: Kind2<T, A, B>) => Kind4<F, S, R, E, Kind2<T, C, D>>
  <F extends URIS3>(F: Applicative3<F>): <R, E, A, B, C, D>(
    f: (a: A) => Kind3<F, R, E, C>,
    g: (b: B) => Kind3<F, R, E, D>
  ) => (fa: Kind2<T, A, B>) => Kind3<F, R, E, Kind2<T, C, D>>
  <F extends URIS2>(F: Applicative2<F>): <E, A, B, C, D>(
    f: (a: A) => Kind2<F, E, C>,
    g: (b: B) => Kind2<F, E, D>
  ) => (fa: Kind2<T, A, B>) => Kind2<F, E, Kind2<T, C, D>>
  <F extends URIS>(F: Applicative1<F>): <A, B, C, D>(
    f: (a: A) => Kind<F, C>,
    g: (b: B) => Kind<F, D>
  ) => (fa: Kind2<T, A, B>) => Kind<F, Kind2<T, C, D>>
  <F>(F: Applicative<F>): <A, B, C, D>(
    f: (a: A) => HKT<F, C>,
    g: (b: B) => HKT<F, D>
  ) => (fa: Kind2<T, A, B>) => HKT<F, Kind2<T, C, D>>
}
```

Added in v1.0.0

# Typeclass

## Bitraversable (interface)

**Signature**

```ts
export interface Bitraversable<T> extends Bifoldable<T>, Bifunctor<T> {
  readonly bitraverse: {
    <F extends URIS4>(F: Applicative4<F>): <S, R, E, A, B, C, D>(
      fa: HKT2<T, A, B>,
      f: (a: A) => Kind4<F, S, R, E, C>,
      g: (b: B) => Kind4<F, S, R, E, D>
    ) => Kind4<F, S, R, E, HKT2<T, C, D>>
    <F extends URIS3>(F: Applicative3<F>): <R, E, A, B, C, D>(
      fa: HKT2<T, A, B>,
      f: (a: A) => Kind3<F, R, E, C>,
      g: (b: B) => Kind3<F, R, E, D>
    ) => Kind3<F, R, E, HKT2<T, C, D>>
    <F extends URIS2>(F: Applicative2<F>): <E, A, B, C, D>(
      fa: HKT2<T, A, B>,
      f: (a: A) => Kind2<F, E, C>,
      g: (b: B) => Kind2<F, E, D>
    ) => Kind2<F, E, HKT2<T, C, D>>
    <F extends URIS>(F: Applicative1<F>): <A, B, C, D>(
      fa: HKT2<T, A, B>,
      f: (a: A) => Kind<F, C>,
      g: (b: B) => Kind<F, D>
    ) => Kind<F, HKT2<T, C, D>>
    <F>(F: Applicative<F>): <A, B, C, D>(
      fa: HKT2<T, A, B>,
      f: (a: A) => HKT<F, C>,
      g: (b: B) => HKT<F, D>
    ) => HKT<F, HKT2<T, C, D>>
  }
  readonly bisequence: {
    <F extends URIS4>(F: Applicative4<F>): <S, R, E, A, B>(
      fga: HKT2<T, Kind4<F, S, R, E, A>, Kind4<F, S, R, E, B>>
    ) => Kind4<F, S, R, E, HKT2<T, A, B>>
    <F extends URIS3>(F: Applicative3<F>): <R, E, A, B>(
      fga: HKT2<T, Kind3<F, R, E, A>, Kind3<F, R, E, B>>
    ) => Kind3<F, R, E, HKT2<T, A, B>>
    <F extends URIS2>(F: Applicative2<F>): <E, A, B>(
      fga: HKT2<T, Kind2<F, E, A>, Kind2<F, E, B>>
    ) => Kind2<F, E, HKT2<T, A, B>>
    <F extends URIS>(F: Applicative1<F>): <A, B>(fga: HKT2<T, Kind<F, A>, Kind<F, B>>) => Kind<F, HKT2<T, A, B>>
    <F>(F: Applicative<F>): <A, B>(fga: HKT2<T, HKT<F, A>, HKT<F, B>>) => HKT<F, HKT2<T, A, B>>
  }
}
```

Added in v1.0.0

## Bitraversable2 (interface)

**Signature**

```ts
export interface Bitraversable2<T extends URIS2> extends Bifoldable2<T>, Bifunctor2<T> {
  readonly bitraverse: {
    <F extends URIS4>(F: Applicative4<F>): <S, R, E, A, B, C, D>(
      fa: Kind2<T, A, B>,
      f: (a: A) => Kind4<F, S, R, E, C>,
      g: (b: B) => Kind4<F, S, R, E, D>
    ) => Kind4<F, S, R, E, Kind2<T, C, D>>
    <F extends URIS3>(F: Applicative3<F>): <R, E, A, B, C, D>(
      fa: Kind2<T, A, B>,
      f: (a: A) => Kind3<F, R, E, C>,
      g: (b: B) => Kind3<F, R, E, D>
    ) => Kind3<F, R, E, Kind2<T, C, D>>
    <F extends URIS2>(F: Applicative2<F>): <E, A, B, C, D>(
      fa: Kind2<T, A, B>,
      f: (a: A) => Kind2<F, E, C>,
      g: (b: B) => Kind2<F, E, D>
    ) => Kind2<F, E, Kind2<T, C, D>>
    <F extends URIS>(F: Applicative1<F>): <A, B, C, D>(
      fa: Kind2<T, A, B>,
      f: (a: A) => Kind<F, C>,
      g: (b: B) => Kind<F, D>
    ) => Kind<F, Kind2<T, C, D>>
    <F>(F: Applicative<F>): <A, B, C, D>(
      fa: Kind2<T, A, B>,
      f: (a: A) => HKT<F, C>,
      g: (b: B) => HKT<F, D>
    ) => HKT<F, Kind2<T, C, D>>
  }
  readonly bisequence: {
    <F extends URIS4>(F: Applicative4<F>): <S, R, E, A, B>(
      fga: Kind2<T, Kind4<F, S, R, E, A>, Kind4<F, S, R, E, B>>
    ) => Kind4<F, S, R, E, Kind2<T, A, B>>
    <F extends URIS3>(F: Applicative3<F>): <R, E, A, B>(
      fga: Kind2<T, Kind3<F, R, E, A>, Kind3<F, R, E, B>>
    ) => Kind3<F, R, E, Kind2<T, A, B>>
    <F extends URIS2>(F: Applicative2<F>): <E, A, B>(
      fga: Kind2<T, Kind2<F, E, A>, Kind2<F, E, B>>
    ) => Kind2<F, E, Kind2<T, A, B>>
    <F extends URIS>(F: Applicative1<F>): <A, B>(fga: Kind2<T, Kind<F, A>, Kind<F, B>>) => Kind<F, Kind2<T, A, B>>
    <F>(F: Applicative<F>): <A, B>(fga: Kind2<T, HKT<F, A>, HKT<F, B>>) => HKT<T, Kind2<T, A, B>>
  }
}
```

Added in v1.0.0
