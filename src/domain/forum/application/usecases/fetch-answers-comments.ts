import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentsRepository } from '../../enterprise/repositories/answer-comments-repository'

interface FetchAnswersCommentsUseCaseRequest {
  page: number
  answerId: string
}

interface FetchAnswersCommentsUseCaseResponse {
  answerComments: AnswerComment[] | null
}

export class FetchAnswersCommentsUseCase {
  constructor(private answerscommentsRepository: AnswerCommentsRepository) {}

  async execute({
    page,
    answerId,
  }: FetchAnswersCommentsUseCaseRequest): Promise<FetchAnswersCommentsUseCaseResponse> {
    const answerComments =
      await this.answerscommentsRepository.findManyByAnswersId(answerId, {
        page,
      })

    return { answerComments }
  }
}
