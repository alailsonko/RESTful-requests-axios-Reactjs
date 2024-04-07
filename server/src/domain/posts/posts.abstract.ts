export abstract class PostAbstract {
  abstract get id(): string;
  abstract set id(value: string);

  abstract get content(): string;
  abstract set content(value: string);

  abstract get userId(): string;
  abstract set userId(value: string);

  abstract get createdAt(): Date;
  abstract set createdAt(value: Date);

  abstract get updatedAt(): Date;
  abstract set updatedAt(value: Date);
}
