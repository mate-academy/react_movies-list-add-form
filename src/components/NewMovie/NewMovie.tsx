import classNames from 'classnames';
import React, { useState } from 'react';

type Props = { addNew: (movie: Movie) => void };

export const NewMovie: React.FC<Props> = (props) => {
  const [movie, setMovie] = useState(
    {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
  );

  const [movieErr, setMovieErr] = useState(
    {
      title: false,
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
    },
  );

  const clearForm = () => {
    setMovie(
      {
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      },
    );
  };

  const chekErrors = () => {
    setMovieErr({
      title: !(movie.title),
      imdbId: !(movie.imdbId),
      imdbUrl: !(movie.imdbUrl),
      imgUrl: !(movie.imgUrl),
    });
  };

  const onFormSubmit = () => {
    chekErrors();
    if (
      movie.title
      && movie.imdbId
      && movie.imdbUrl
      && movie.imgUrl
    ) {
      props.addNew(movie);
      clearForm();
    }
  };

  const atEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setMovie({ ...movie, [name]: value });
    setMovieErr({ ...movieErr, [name]: false });
  };

  return (
    <form
      className="form"
      onSubmit={
        (event) => {
          event.preventDefault();
          onFormSubmit();
        }
      }
    >
      <input
        className={classNames({ error: movieErr.title })}
        type="text"
        placeholder={!movieErr.title ? 'title' : 'Please enter title'}
        name="title"
        value={movie.title}
        onChange={(event) => {
          atEvent(event);
        }}
      />
      <input
        type="text"
        placeholder="description"
        name="description"
        value={movie.description}
        onChange={(event) => {
          setMovie({ ...movie, description: event.target.value });
        }}
      />
      <input
        className={classNames({ error: movieErr.imgUrl })}
        type="text"
        placeholder={!movieErr.imgUrl ? 'imgUrl' : 'Please enter imgUrl'}
        name="imgUrl"
        value={movie.imgUrl}
        onChange={(event) => {
          atEvent(event);
        }}
      />
      <input
        className={classNames({ error: movieErr.imdbUrl })}
        type="text"
        placeholder={!movieErr.imdbUrl ? 'imdbUrl' : 'Please enter imdbUrl'}
        name="imdbUrl"
        value={movie.imdbUrl}
        onChange={(event) => {
          atEvent(event);
        }}
      />
      <input
        className={classNames({ error: movieErr.imdbId })}
        type="text"
        placeholder={!movieErr.imdbId ? 'imdbId' : 'Please enter imdbId'}
        name="imdbId"
        value={movie.imdbId}
        onChange={(event) => {
          atEvent(event);
        }}
      />
      <button type="submit">
        Add Film
      </button>
    </form>
  );
};
