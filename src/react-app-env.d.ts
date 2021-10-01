/// <reference types="react-scripts" />

interface Movie {
  'title': string;
  'description': string;
  'imgUrl': string;
  'imdbUrl': string;
  'imdbId': string;
}

interface State extends Movie {
  errors: {
    'title'?: boolean,
    'description'?: boolean,
    'imgUrl'?: boolean,
    'imdbUrl'?: boolean,
    'imdbId'?: boolean,
  };
}