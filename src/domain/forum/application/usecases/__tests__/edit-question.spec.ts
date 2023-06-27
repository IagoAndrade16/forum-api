import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { EditQuestionUseCase } from '../edit-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

beforeEach(() => {
  inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
  sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
})

describe('Editr question', () => {
  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      authorId: 'author-1',
      title: 'Pergunta teste',
      content: 'conteudo teste',
      questionId: newQuestion.id.toValue(),
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'Pergunta teste',
      content: 'conteudo teste',
    })
  })

  it('should not be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    inMemoryQuestionsRepository.create(newQuestion)

    expect(() => {
      return sut.execute({
        authorId: 'author-2',
        title: 'Pergunta teste',
        content: 'conteudo teste',
        questionId: newQuestion.id.toValue(),
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
