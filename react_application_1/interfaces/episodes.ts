export type IEpisode = {
  id: string;
  title: string;
  members: string[];
  published_at: string;
  thumbnail: string;
  description: string;
  file: {
    url: string;
    type: string;
    duration: number;
  };
  publishedAt?: string;
  duration?: number;
  durationAsString: string;
  url?: string;
};
