import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { CommentOnAnswerUseCase } from '../comment-on-answer'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answers-comment-repository'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: CommentOnAnswerUseCase

beforeEach(() => {
  inMemoryAnswersRepository = new InMemoryAnswersRepository()
  inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
  sut = new CommentOnAnswerUseCase(
    inMemoryAnswersRepository,
    inMemoryAnswerCommentsRepository,
  )
})

describe('Comment on answer', () => {
  it('should be able to comment on answer', async () => {
    const answer = makeAnswer()

    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: 'Comentario teste',
    })

    expect(inMemoryAnswerCommentsRepository.items[0].content).toEqual(
      'Comentario teste',
    )
  })
})
