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

- [@jacob-alford/bifold-traverse](https://jacob-alford.github.io/schemata-ts/docs/modules)
- [fp-ts](https://gcanti.github.io/fp-ts/modules/)
