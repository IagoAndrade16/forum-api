import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DeleteAnswerCommentUseCase } from '../delete-answer-comment'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answers-comment-repository'
import { makeAnswerComment } from 'test/factories/make-answer-comment'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: DeleteAnswerCommentUseCase

beforeEach(() => {
  inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
  sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository)
})

describe('Delete answer commment', () => {
  it('should be able to delete answer', async () => {
    const answerComment = makeAnswerComment()

    await inMemoryAnswerCommentsRepository.create(answerComment)

    await sut.execute({
      answerCommentId: answerComment.id.toString(),
      authorId: answerComment.authorId.toString(),
    })

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete another user answer comment', async () => {
    const answerComment = makeAnswerComment({
      authorId: new UniqueEntityID('1'),
    })

    await inMemoryAnswerCommentsRepository.create(answerComment)

    expect(() => {
      return sut.execute({
        answerCommentId: answerComment.id.toString(),
        authorId: '2',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
