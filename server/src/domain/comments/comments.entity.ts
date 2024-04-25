import { CommentAbstract } from './comments.abstract';

export class CommentEntity implements CommentAbstract {
  private _id: string;
  private _content: string;
  private _userId: string;
  private _postId: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }

  get content(): string {
    return this._content;
  }
  set content(value: string) {
    this._content = value;
  }

  get userId(): string {
    return this._userId;
  }
  set userId(value: string) {
    this._userId = value;
  }

  get postId(): string {
    return this._postId;
  }
  set postId(value: string) {
    this._postId = value;
  }

  get createdAt(): Date {
    return this._createdAt;
  }
  set createdAt(value: Date) {
    this._createdAt = value;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }
  set updatedAt(value: Date) {
    this._updatedAt = value;
  }

  public static create(data: CommentAbstract): CommentEntity {
    const entity = new CommentEntity();
    entity.id = data.id;
    entity.content = data.content;
    entity.userId = data.userId;
    entity.postId = data.postId;
    entity.createdAt = data.createdAt;
    entity.updatedAt = data.updatedAt;
    return entity;
  }

  public toObject(): CommentAbstract {
    return {
      id: this.id,
      content: this.content,
      userId: this.userId,
      postId: this.postId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
