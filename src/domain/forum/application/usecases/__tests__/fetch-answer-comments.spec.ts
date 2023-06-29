import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answers-comment-repository'
import { FetchAnswersCommentsUseCase } from '../fetch-answers-comments'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: FetchAnswersCommentsUseCase

beforeEach(() => {
  inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
  sut = new FetchAnswersCommentsUseCase(inMemoryAnswerCommentsRepository)
})

describe('Fetch answer comments', () => {
  it('should be able to fetch answer comments', async () => {
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityID('answer-1'),
      }),
    )
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityID('answer-1'),
      }),
    )
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityID('answer-1'),
      }),
    )

    const { answerComments } = await sut.execute({
      page: 1,
      answerId: 'answer-1',
    })

    expect(answerComments).toHaveLength(3)
  })

  it('should be able to fetch paginated answer answercomments', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({
          answerId: new UniqueEntityID('answer-1'),
        }),
      )
    }

    const { answerComments } = await sut.execute({
      page: 2,
      answerId: 'answer-1',
    })

    expect(answerComments).toHaveLength(2)
  })
})
