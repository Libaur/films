export interface AuthDialogContent {
  title: string;
  label: string;
  buttonText: string;
  type: string;
}

export interface AuthDialogProps {
  content: AuthDialogContent;
  isModalOpen: boolean;
  handleModalClose: () => void;
  nextModalOpen?: () => void;
}

type Avatar = {
  gravatar: {
    hash: string;
  };
  tmdb: {
    avatar_path: string | null;
  };
};

export type User = {
  avatar: Avatar;
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
};
