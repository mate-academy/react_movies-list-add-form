import React, { useState } from 'react';

type Props = {
  onAdd: (movieTitle: string,
    movieDescription: string,
    movieImgUrl: string,
    movieImdbUrl: string,
    movieImdbId: string) => void
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [movieTitle, setMovieTitle] = useState('');
  const [movieDescription, setMovieDescription] = useState('');
  const [movieImgUrl, setMovieImgUrl] = useState('');
  const [movieImdbUrl, setMovieImdbUrl] = useState('');
  const [movieImdbId, setMovieImdbId] = useState('');

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        if (movieTitle
          && movieDescription
          && movieImgUrl
          && movieImdbUrl
          && movieImdbId) {
          onAdd(movieTitle,
            movieDescription,
            movieImgUrl,
            movieImdbUrl,
            movieImdbId);
          setMovieTitle('');
          setMovieDescription('');
          setMovieImgUrl('');
          setMovieImdbUrl('');
          setMovieImdbId('');
        }
      }}
    >
      <p>
        <input
          type="text"
          placeholder="Enter a movie title"
          value={movieTitle}
          onChange={(event) => {
            setMovieTitle(event.target.value);
          }}
        />
      </p>
      <p>
        <input
          type="text"
          placeholder="Enter a movie description"
          value={movieDescription}
          onChange={(event) => {
            setMovieDescription(event.target.value);
          }}
        />
      </p>
      <p>
        <input
          type="text"
          placeholder="Enter a movie imgUrl"
          value={movieImgUrl}
          onChange={(event) => {
            setMovieImgUrl(event.target.value);
          }}
        />
      </p>
      <p>
        <input
          type="text"
          placeholder="Enter a movie imdbUrl"
          value={movieImdbUrl}
          onChange={(event) => {
            setMovieImdbUrl(event.target.value);
          }}
        />
      </p>
      <p>
        <input
          type="text"
          placeholder="Enter a movie imdbId"
          value={movieImdbId}
          onChange={(event) => {
            setMovieImdbId(event.target.value);
          }}
        />
      </p>
      <button type="submit">Add movie</button>
    </form>
  );
};
