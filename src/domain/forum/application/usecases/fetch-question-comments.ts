import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentsRepository } from '../../enterprise/repositories/question-comments-repository'

interface FetchQuestionCommentsUseCaseRequest {
  page: number
  questionId: string
}

interface FetchQuestionCommentsUseCaseResponse {
  questionComments: QuestionComment[] | null
}

export class FetchQuestionCommentsUseCase {
  constructor(private questioncommentsRepository: QuestionCommentsRepository) {}

  async execute({
    page,
    questionId,
  }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
    const questionComments =
      await this.questioncommentsRepository.findManyByQuestionId(questionId, {
        page,
      })

    return { questionComments }
  }
}
