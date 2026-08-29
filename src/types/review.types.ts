export type TReviewStatus = "PENDING"|"APPROVED"|"REJECTED";

export type TVoteType = "HELPFUL" | "UNHELPFUL";

export interface IReviewImage {
  url: string;
  publicId?: string;
}

export interface IAdminReply {
  comment: string;
  repliedBy: string;
  repliedAt: string;
}

export interface IReviewUser {
  _id: string;
  name: string;
  avatar?: string;
}

export interface IReview {
  _id: string;
  productId: string;
  userId: string;
  orderId?: string;

  rating: number;
  title?: string;
  comment?: string;

  isVerifiedPurchase: boolean;

  images?: IReviewImage[];
  status:  TReviewStatus;
  helpfulVote: string[];
  unhelpfulVote: string[];
  adminReply?: IAdminReply;

  user?: IReviewUser; // populated by backend on read endpoints

  createdAt: string;
  updatedAt: string;
}

export interface IRatingBreakdown {
  "1": number;
  "2": number;
  "3": number;
  "4": number;
  "5": number;
}

export interface IRatingSummary {
  average: number;
  count: number;
  breakdown: IRatingBreakdown;
}

export interface IGetProductReviewsResponse {
  reviews: IReview[];
  summary: IRatingSummary;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
}

export type TReviewSort = "newest" | "highest" | "lowest" | "helpful";

export interface IGetProductReviewsParams {
  productId: string;
  page?: number;
  limit?: number;
  sort?: TReviewSort;
  rating?: number; // filter by star value
}

export type TCreateReviewPayload = Pick<
  IReview,
  "productId" | "rating" | "title" | "comment" | "images"
>;

export type TUpdateReviewPayload = Partial<
  Pick<IReview, "rating" | "title" | "comment" | "images">
>;

export interface IVoteReviewPayload {
  id: string;
  voteType:  TVoteType;
}

export interface IModerateReviewPayload {
  id: string;
  status: "APPROVED" | "REJECTED";
}

export interface IAdminReplyPayload {
  id: string;
  comment: string;
}

