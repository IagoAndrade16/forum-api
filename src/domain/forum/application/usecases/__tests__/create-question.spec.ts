import { Question } from '@/domain/forum/enterprise/entities/question'
import { QuestionsRepository } from '@/domain/forum/enterprise/repositories/questions-repository'
import { CreateQuestionUseCase } from '../create-question'

const fakeQuestionsRepository: QuestionsRepository = {
  create: async (question: Question) => {},
}

test('create a question', async () => {
  const createQuestion = new CreateQuestionUseCase(fakeQuestionsRepository)

  const { question } = await createQuestion.execute({
    authorId: '1',
    title: 'new question',
    content: 'conteudo da pergunta',
  })

  expect(question.id).toBeTruthy()
})
