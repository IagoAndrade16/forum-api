import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'
import { AnswerCommentsRepository } from '@/domain/forum/enterprise/repositories/answer-comments-repository'

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  public items: AnswerComment[] = []

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment)
  }

  async findById(id: string) {
    const answerComment = this.items.find((item) => item.id.toString() === id)

    if (!answerComment) {
      return null
    }

    return answerComment
  }

  async delete(answerComment: AnswerComment) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === answerComment.id,
    )

    this.items.splice(itemIndex, 1)
  }

  async findManyByAnswersId(answersId: string, { page }: PaginationParams) {
    const answersComments = this.items
      .filter((item) => item.answerId.toString() === answersId)
      .slice((page - 1) * 20, page * 20)

    return answersComments
  }
}
