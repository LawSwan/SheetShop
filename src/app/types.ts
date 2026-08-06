export interface Score {
  id: number;
  title: string;
  composer: string;
  instrument: string;
  genre: string;
  price: number;
  difficulty: number;
  pages: number;
  youtubeId: string;
  unsplashId: string;
  previewPages: string[];
}

export interface GenreDatum {
  genre: string;
  count: number;
}
