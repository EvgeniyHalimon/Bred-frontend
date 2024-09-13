export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  bio: string;
  role: UserRole;
  photo: string | null;
  articles?: IArticle[];
  comments?: IComment[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

export enum UserRolesEnum {
  USER = 'user',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin'
}

export type UserRole = UserRolesEnum.USER | UserRolesEnum.ADMIN | UserRolesEnum.SUPER_ADMIN;

export interface IArticle {
  id: string;
  title: string;
  rating: number;
  authorId: string;
  text: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface IComment {
  id: string;
  authorId: string;
  text: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export type OrderType = 'ASC' | 'DESC';

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface ISingInResponse extends ITokens {
  user: IUser;
}

export interface IReaction {
  id: string;
  userId: string;
  commentId?: string;
  articleId?: string;
  reactionType: ReactionType;
  sourceType: SourceType;
  createdAt: Date | string;
  updatedAt: Date | string;
}
export enum ReactionTypeEnum {
  UPVOTE = 'upvote',
  DOWNVOTE = 'downvote',
  LIKE = 'like',
  DISLIKE = 'dislike'
}

export enum SourceTypeEnum {
  ARTICLE = 'article',
  COMMENT = 'comment'
}
export type ReactionType =
  | ReactionTypeEnum.UPVOTE
  | ReactionTypeEnum.DOWNVOTE
  | ReactionTypeEnum.LIKE
  | ReactionTypeEnum.DISLIKE;

export type SourceType = SourceTypeEnum.ARTICLE | SourceTypeEnum.COMMENT;

export interface ICount {
  count: number;
}
