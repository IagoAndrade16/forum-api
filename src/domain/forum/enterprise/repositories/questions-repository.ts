import { Question } from '../entities/question'

export interface QuestionsRepository {
  create(question: Question): Promise<void>
}
