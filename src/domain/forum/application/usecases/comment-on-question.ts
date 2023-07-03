import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentsRepository } from '../../enterprise/repositories/question-comments-repository'
import { QuestionsRepository } from '../../enterprise/repositories/questions-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { Either, left, rigth } from '@/core/either'

interface CommentOnQuestionUseCaseRequest {
  authorId: string
  content: string
  questionId: string
}

type CommentOnQuestionUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    questionComment: QuestionComment
  }
>

export class CommentOnQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionsCommentsRepository: QuestionCommentsRepository,
  ) {}

  async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityID(authorId),
      content,
      questionId: new UniqueEntityID(questionId),
      updatedAt: new Date(),
    })

    await this.questionsCommentsRepository.create(questionComment)

    return rigth({ questionComment })
  }
}
