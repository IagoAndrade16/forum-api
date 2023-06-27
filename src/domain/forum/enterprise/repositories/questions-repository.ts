import { PaginationParams } from '@/core/repositories/pagination-params'
import { Question } from '../entities/question'

export interface QuestionsRepository {
  findById(id: string): Promise<Question | null>
  create(question: Question): Promise<void>
  findBySlug(slug: string): Promise<Question | null>
  findManyRecent(params: PaginationParams): Promise<Question[] | null>
  delete(question: Question): Promise<void>
  save(question: Question): Promise<void>
}
