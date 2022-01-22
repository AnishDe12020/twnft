interface IEntitiesMentions {
  start: number;
  end: number;
  username: string;
  id: string;
}

interface IEntitiesURLImages {
  url: string;
  width: number;
  height: number;
}

export interface IEntitiesURLs {
  start: number;
  end: number;
  url: string;
  expanded_url: string;
  display_url: string;
  images: IEntitiesURLImages[];
  status: number;
  title: string;
  description: string;
  unwound_url: string;
}

interface IEntities {
  mentions?: IEntitiesMentions[];
  urls: IEntitiesURLs[];
}

interface IPublicMetrics {
  retweet_count: number;
  reply_count: number;
  like_count: number;
  quote_count: number;
}

interface IReferencedTweets {
  type: string;
  id: string;
}

export interface ITweetData {
  created_at: Date;
  author_id: string;
  text: string;
  id: string;
  entities?: IEntities;
  public_metrics: IPublicMetrics;
  referenced_tweets: IReferencedTweets[];
  in_reply_to_user_id?: string;
}

interface ITwitterUser {
  id: string;
  name: string;
  username: string;
  verified: boolean;
  profile_image_url: string;
}

interface ITwitterMedia {
  media_key: string;
  height: number;
  type: string;
  width: number;
  url: string;
  alt_text: string;
}

export interface ITweetIncludes {
  users: ITwitterUser[];
  media: ITwitterMedia[];
  tweets: ITweetObject[];
}

interface ITweetObject {
  data: ITweetData;
  includes: ITweetIncludes;
}

export default ITweetObject;
