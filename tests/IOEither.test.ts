import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import * as IO from 'fp-ts/IO'

import { bisequence, bitraverse } from '../src/IOEither'

describe('IOEither', () => {
  describe('bisequence', () => {
    test('Left', () => {
      const test = pipe(() => E.left(() => 'test'), bisequence(IO.MonadIO))
      expect(test()()).toEqual(E.left('test'))
    })
    test('Right', () => {
      const test = pipe(() => E.right(() => 'test'), bisequence(IO.MonadIO))
      expect(test()()).toEqual(E.right('test'))
    })
  })
  describe('bitraverse', () => {
    test('Left', () => {
      const test = pipe(
        () => E.left('test'),
        bitraverse(IO.MonadIO)(
          a => () => a,
          a => () => a,
        ),
      )
      expect(test()()).toEqual(E.left('test'))
    })
    test('Right', () => {
      const test = pipe(
        () => E.right('test'),
        bitraverse(IO.MonadIO)(
          a => () => a,
          a => () => a,
        ),
      )
      expect(test()()).toEqual(E.right('test'))
    })
  })
})
