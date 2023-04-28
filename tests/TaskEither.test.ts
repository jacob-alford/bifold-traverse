import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import * as T from 'fp-ts/Task'
import * as TE from 'fp-ts/TaskEither'

import { bisequence, bitraverse } from '../src/TaskEither'

describe('IOEither', () => {
  describe('bisequence', () => {
    test('Left', async () => {
      const test = pipe(TE.left(T.of('test')), bisequence(T.MonadTask))
      expect(await (await test())()).toEqual(E.left('test'))
    })
    test('Right', async () => {
      const test = pipe(TE.right(T.of('test')), bisequence(T.MonadTask))
      expect(await (await test())()).toEqual(E.right('test'))
    })
  })
  describe('bitraverse', () => {
    test('Left', async () => {
      const test = pipe(
        TE.left('test'),
        bitraverse(T.MonadTask)(
          a => T.of(a),
          a => T.of(a),
        ),
      )
      expect(await (await test())()).toEqual(E.left('test'))
    })
    test('Right', async () => {
      const test = pipe(
        TE.right('test'),
        bitraverse(T.MonadTask)(
          a => T.of(a),
          a => T.of(a),
        ),
      )
      expect(await (await test())()).toEqual(E.right('test'))
    })
  })
})
