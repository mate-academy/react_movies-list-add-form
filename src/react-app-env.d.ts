/// <reference types="react-scripts" />

interface Movie {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}

interface Validation {
  isTitleFilled: boolean,
  isImdbIdFilled: boolean,
  isImgUrlFilled: boolean,
  isImdbUrlFilled: boolean,
  isImgUrlValid: boolean,
  isImdbUrlValid: boolean,
}
