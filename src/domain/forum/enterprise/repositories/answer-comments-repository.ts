import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerComment } from '../entities/answer-comment'

export interface AnswerCommentsRepository {
  create(answerComment: AnswerComment): Promise<void>
  findById(id: string): Promise<AnswerComment | null>
  delete(answersComment: AnswerComment): Promise<void>
  findManyByAnswersId(
    id: string,
    params: PaginationParams,
  ): Promise<AnswerComment[]>
}
