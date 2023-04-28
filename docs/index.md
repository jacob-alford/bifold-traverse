---
title: Home
permalink: /
has_children: false
nav_order: 1
---

# bifold-traverse

[![NPM Version](https://badge.fury.io/js/@jacob-alford/bifold-traverse.svg)](https://badge.fury.io/js/@jacob-alford/bifold-traverse)
[![Coverage Status](https://coveralls.io/repos/github/jacob-alford/bifold-traverse/badge.svg?branch=main)](https://coveralls.io/github/jacob-alford/bifold-traverse?branch=main)
![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/@jacob-alford/bifold-traverse)

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

### pnpm

```bash
pnpm add @jacob-alford/bifold-traverse
```

## Documentation

- [@jacob-alford/bifold-traverse](https://jacob-alford.github.io/schemata-ts/docs/modules)
- [fp-ts](https://gcanti.github.io/fp-ts/modules/)
