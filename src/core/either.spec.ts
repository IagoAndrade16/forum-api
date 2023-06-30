import { Either, left, rigth } from './either'

function doSomething(x: boolean): Either<string, number> {
  if (x) {
    return rigth(10)
  } else {
    return left('error')
  }
}

test('success result', () => {
  const result = doSomething(true)

  if (result.isRigth()) {
    console.log(result.value)
  }

  expect(result.isRigth()).toBe(true)
  expect(result.isLeft()).toBe(false)
})

test('error result', () => {
  const result = doSomething(false)

  expect(result.isRigth()).toBe(false)
  expect(result.isLeft()).toBe(true)
})
