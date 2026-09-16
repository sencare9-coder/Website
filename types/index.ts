export type NewsItem = {
  id: string;
  date: string;
  title: string;
  category: string;
  href?: string;
};

export type Work = {
  id: string;
  title: string;
  year: string;
  type: string;
  image: string;
};

export type MusicVideo = {
  id: string;
  youtubeId: string;
  title: string;
};

export type LiveEvent = {
  id: string;
  date: string;
  title: string;
  venue: string;
  city: string;
  href?: string;
  status?: "upcoming" | "soldout" | "ended";
};

export type Member = {
  part: string;
  name: string;
};

export type SocialLink = {
  label: string;
  href: string;
};
