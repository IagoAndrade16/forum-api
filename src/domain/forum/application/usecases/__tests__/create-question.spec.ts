import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { CreateQuestionUseCase } from '../create-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

beforeEach(() => {
  inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
  sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
})

describe('Create question', () => {
  it('should be able to create a question', async () => {
    const result = await sut.execute({
      authorId: '1',
      title: 'new question',
      content: 'conteudo da pergunta',
      attachmentsIds: ['1', '2'],
    })

    expect(result.isRigth()).toBe(true)
    expect(inMemoryQuestionsRepository.items[0]).toEqual(result.value?.question)
    expect(inMemoryQuestionsRepository.items[0].attachments).toHaveLength(2)
    expect(inMemoryQuestionsRepository.items[0].attachments).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('2') }),
    ])
  })
})
