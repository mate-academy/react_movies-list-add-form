/// <reference types="react-scripts" />

interface Movie {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}

type ForHandleChange = {
  inputTitle: string;
  inputDescription: string;
  inputImgUrl: string;
  inputImdbUrl: string;
  inputImdbId: string;
};
