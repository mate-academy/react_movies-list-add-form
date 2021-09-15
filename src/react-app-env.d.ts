/// <reference types="react-scripts" />

interface Movie {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}

type EventsForm = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>;
