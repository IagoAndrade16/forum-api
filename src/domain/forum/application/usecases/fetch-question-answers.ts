import { Answer } from '../../enterprise/entities/answer'
import { AnswerRepository } from '../../enterprise/repositories/answers-repository'

interface FetchAnswersUseCaseRequest {
  page: number
  questionId: string
}

interface FetchAnswersUseCaseResponse {
  answers: Answer[] | null
}

export class FetchAnswersUseCase {
  constructor(private answersRepository: AnswerRepository) {}

  async execute({
    page,
    questionId,
  }: FetchAnswersUseCaseRequest): Promise<FetchAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByTopicId(
      { page },
      questionId,
    )

    return { answers }
  }
}
