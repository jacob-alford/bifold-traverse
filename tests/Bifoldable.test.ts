import * as B from 'fp-ts/boolean'
import { pipe } from 'fp-ts/function'
import { getBooleanAlgebra } from 'fp-ts/function'
import * as Sep from 'fp-ts/Separated'

import { biall, biany } from '../src/Bifoldable'
import { Bifoldable } from '../src/Separated'

describe('biany', () => {
  test('boolean', () => {
    const test = pipe(
      Sep.separated('abc', 'abcdefg'),
      biany(Bifoldable, B.BooleanAlgebra)(
        s => s.length > 5,
        s => s.length > 2,
      ),
    )
    expect(test).toEqual(true)
  })
  test('function boolean', () => {
    const test = pipe(
      Sep.separated('abc', 'abcdefg'),
      biany(Bifoldable, getBooleanAlgebra(B.BooleanAlgebra)<string>())(
        s => input => input.length < s.length,
        s => input => input.length > s.length,
      ),
    )
    expect(test('abcd')).toEqual(false)
  })
})

describe('biall', () => {
  test('boolean', () => {
    const test = pipe(
      Sep.separated('abc', 'abcdefg'),
      biall(Bifoldable, B.BooleanAlgebra)(
        s => s.length > 2,
        s => s.length < 8,
      ),
    )
    expect(test).toEqual(true)
  })
  test('function boolean', () => {
    const test = pipe(
      Sep.separated('abc', 'abcdefg'),
      biall(Bifoldable, getBooleanAlgebra(B.BooleanAlgebra)<string>())(
        s => input => input.length > s.length,
        s => input => input.length < s.length,
      ),
    )
    expect(test('abcd')).toEqual(true)
  })
})
