export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  bio: string;
  role: UserRole;
  photo?: string;
  createdAt: string;
  updatedAt: string;
}

export enum UserRolesEnum {
  USER = 'user',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin'
}

export type UserRole = UserRolesEnum.USER | UserRolesEnum.ADMIN | UserRolesEnum.SUPER_ADMIN;

export interface IAuthor {
  author: IUser;
}

export interface ICommentWithAuthor extends IComment, IAuthor {}
export interface IReactionWithUser extends IReaction {
  user: IUser;
}

export interface IArticle {
  id: string;
  title: string;
  rating: number;
  authorId: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

export interface IArticleWithInfo extends IArticle, IAuthor {
  comments: ICommentWithAuthor[];
  reactions: IReactionWithUser[];
}

export interface IComment {
  id: string;
  authorId: string;
  articleId: string;
  text: string;
  createdAt: string;
  updatedAt: string;
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
  createdAt: string;
  updatedAt: string;
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

export interface IReactionBody {
  commentId?: string;
  articleId?: string;
  reactionType: ReactionType;
  sourceType: SourceType;
}
