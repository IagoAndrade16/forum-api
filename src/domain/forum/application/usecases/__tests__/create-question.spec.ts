import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { CreateQuestionUseCase } from '../create-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

beforeEach(() => {
  inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
  sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
})

describe('Create question', () => {
  it('should be able to create a question', async () => {
    const { question } = await sut.execute({
      authorId: '1',
      title: 'new question',
      content: 'conteudo da pergunta',
    })

    expect(question.id).toBeTruthy()
  })
})
