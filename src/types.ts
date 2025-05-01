import { ObjectId } from "mongodb";

export interface AuthErrors {
  email?: string[];
  password?: string[];
}

export interface AuthActionState {
  errors?: AuthErrors;
  email?: string;
  message?: string;
}

export interface FormErrors {
  email?: string[];
  password?: string[];
  confirmPassword?: string[];
}

export interface ActionState {
  errors?: FormErrors;
  email?: string;
  error?: string;
}

export interface WatchlistMovie {
  _id: ObjectId;
  movieId: number;
  title: string;
  posterPath: string;
  releaseDate: string;
  voteAverage: number;
}

export interface MovieCast {
  name: string;
  character: string;
  profile_path: string | null;
}

export interface MovieDetails {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  runtime: number;
  overview: string;
  credits?: {
    cast: MovieCast[];
  };
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  query?: string;
}

export interface NavLinkProps {
  label: string;
  href: string;
}

export interface AuthUser {
  userId?: string;
}

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  runtime?: number;
  overview?: string;
  credits?: {
    cast: {
      name: string;
      profile_path: string | null;
      character: string;
      id?: number;
      order?: number;
    }[];
  };
}
export interface UserSavedMovie {
  _id: ObjectId;
  movieId: number;
  title: string;
  posterPath: string | null;
  releaseDate: string;
  voteAverage: number;
}

export interface Review {
  id: string;
  author: string;
  content: string;
  created_at: string;
}

export interface JWTPayload extends Record<string, unknown> {
  userId: string;
  expiresAt: Date;
}
