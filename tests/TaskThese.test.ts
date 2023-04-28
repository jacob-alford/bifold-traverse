import { pipe } from 'fp-ts/function'
import * as T from 'fp-ts/Task'
import * as TT from 'fp-ts/TaskThese'
import * as Th from 'fp-ts/These'

import { bisequence, bitraverse } from '../src/TaskThese'

describe('IOEither', () => {
  describe('bisequence', () => {
    test('Left', async () => {
      const test = pipe(TT.left(T.of('test')), bisequence(T.MonadTask))
      expect(await (await test())()).toEqual(Th.left('test'))
    })
    test('Right', async () => {
      const test = pipe(TT.right(T.of('test')), bisequence(T.MonadTask))
      expect(await (await test())()).toEqual(Th.right('test'))
    })
    test('Both', async () => {
      const test = pipe(TT.both(T.of('test'), T.of('test')), bisequence(T.MonadTask))
      expect(await (await test())()).toEqual(Th.both('test', 'test'))
    })
  })
  describe('bitraverse', () => {
    test('Left', async () => {
      const test = pipe(
        TT.left('test'),
        bitraverse(T.MonadTask)(
          a => T.of(a),
          a => T.of(a),
        ),
      )
      expect(await (await test())()).toEqual(Th.left('test'))
    })
    test('Right', async () => {
      const test = pipe(
        TT.right('test'),
        bitraverse(T.MonadTask)(
          a => T.of(a),
          a => T.of(a),
        ),
      )
      expect(await (await test())()).toEqual(Th.right('test'))
    })
    test('Both', async () => {
      const test = pipe(
        TT.both('test', 'test'),
        bitraverse(T.MonadTask)(
          a => T.of(a),
          a => T.of(a),
        ),
      )
      expect(await (await test())()).toEqual(Th.both('test', 'test'))
    })
  })
})
