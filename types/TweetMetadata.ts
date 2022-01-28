export interface TweetAttribute {
  display_type: string;
  trait_type: string;
  value: string | number;
}

export interface TweetMetadata {
  name: string;
  description: string;
  image: string;
  attributes: TweetAttribute[];
}

export interface TweetFirebaseObject extends TweetMetadata {
  created_date: string;
  minted: boolean;
}
