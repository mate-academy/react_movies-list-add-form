/// <reference types="react-scripts" />

interface Movie {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}

type OnBlurHasError = {
  hasTitleError: boolean;
  hasImgUrlError: boolean;
  hasImdbUrlError: boolean;
  hasImdbIdError: boolean;
};
