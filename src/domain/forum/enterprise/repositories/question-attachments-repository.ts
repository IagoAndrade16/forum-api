import { QuestionAttachment } from '../entities/question-attachment'

export interface QuestionAttachmentsRepository {
  findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]>
  deleteManyBiQuestionId(questionId: string): Promise<void>
}
