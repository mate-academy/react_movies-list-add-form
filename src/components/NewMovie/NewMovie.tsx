import classNames from 'classnames';
import { useState } from 'react';

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

  function clearForm() {
    setMovie(
      {
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      },
    );
  }

  const chekErrors = () => {
    setMovieErr({
      title: !(movie.title),
      imdbId: !(movie.imdbId),
      imdbUrl: !(movie.imdbUrl),
      imgUrl: !(movie.imgUrl),
    });
  };

  return (
    <form
      className="form"
      onSubmit={
        (event) => {
          chekErrors();
          if (
            !movieErr.title
            && !movieErr.imdbId
            && !movieErr.imdbUrl
            && !movieErr.imgUrl
          ) {
            props.addNew(movie);
            clearForm();
          }

          event.preventDefault();
        }
      }
    >
      <input
        className={classNames({ error: movieErr.title })}
        type="text"
        placeholder="title"
        value={movie.title}
        onChange={(event) => {
          setMovie({ ...movie, title: event.target.value });
          setMovieErr({ ...movieErr, title: false });
          chekErrors();
        }}
      />
      <input
        type="text"
        placeholder="description"
        value={movie.description}
        onChange={(event) => {
          setMovie({ ...movie, description: event.target.value });
        }}
      />
      <input
        className={classNames({ error: movieErr.imgUrl })}
        type="text"
        placeholder="imgUrl"
        value={movie.imgUrl}
        onChange={(event) => {
          setMovie({ ...movie, imgUrl: event.target.value });
          setMovieErr({ ...movieErr, imgUrl: false });
        }}
      />
      <input
        className={classNames({ error: movieErr.imdbUrl })}
        type="text"
        placeholder="imdbUrl"
        value={movie.imdbUrl}
        onChange={(event) => {
          setMovie({ ...movie, imdbUrl: event.target.value });
          setMovieErr({ ...movieErr, imdbUrl: false });
        }}
      />
      <input
        className={classNames({ error: movieErr.imdbId })}
        type="text"
        placeholder="imdbId"
        value={movie.imdbId}
        onChange={(event) => {
          setMovie({ ...movie, imdbId: event.target.value });
          setMovieErr({ ...movieErr, imdbId: false });
        }}
      />
      <button
        type="submit"
      >
        Add
      </button>
    </form>
  );
};
