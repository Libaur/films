import { Genre } from 'src/app/shared-contracts';

interface Collection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

interface Company {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

interface Country {
  iso_3166_1: string;
  name: string;
}

interface Language {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface DetailedFilm {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: Collection | null;
  budget: number;
  genres: Genre[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: Company[];
  production_countries: Country[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: Language[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
