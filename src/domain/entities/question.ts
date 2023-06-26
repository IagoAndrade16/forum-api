import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Optional } from "@/core/types/optional"
import dayjs from "dayjs"
import { Slug } from "./value-objects/slug"

interface QuestionProps {
  title: string, 
  content: string, 
  authorId: UniqueEntityID,
  slug: Slug,
  bestAnswerId?: UniqueEntityID,
  createdAt: Date,
  updatedAt?: Date
}
export class Question extends Entity<QuestionProps> {
  get content() {
    return this.props.content
  }

  get authorId() {
    return this.props.authorId
  }

  get questionId() {
    return this.props.questionId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get bestAnswerId() {
    return this.props.bestAnswerId
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get title() {
    return this.props.title
  }

  get slug() {
    return this.props.slug
  }

  get isNew(): boolean {
    return dayjs().diff(this.createdAt, 'days') <= 3
  }

  get excerpt() {
    return this.props.content
      .substring(0, 120)
      .trimEnd()
      .concat('...')
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  set title(title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)
    this.touch()
  }

  set bestAnswerId(bestAnswerId: UniqueEntityID | undefined) {
    this.props.bestAnswerId = bestAnswerId
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(props: Optional<QuestionProps, 'createdAt' | 'slug'>, id?: UniqueEntityID) {
    const question = new Question({
      ...props,
      slug: props.slug ?? Slug.createFromText(props.title),
      createdAt: new Date()
    }, id)

    return question
  }
}