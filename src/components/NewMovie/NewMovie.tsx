import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  function isValidHttpUrl(string: string): boolean {
    let url;

    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }

    return url.protocol === 'http:' || url.protocol === 'https:';
  }

  const [movieParams, setMovieParams] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [paramsErrors, setParamsErrors] = useState({
    title: false,
    imgUrl: false,
    imdbUrl: false,
    imdbId: false,
  });

  const handleChange = (value: string, param: keyof typeof movieParams) => {
    setMovieParams((prevParams) => ({
      ...prevParams,
      [param]: value,
    }));
    setParamsErrors((prevErrors) => ({
      ...prevErrors,
      [param]: false,
    }));
  };

  const [count, setCount] = useState(0);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setParamsErrors(() => ({
      title: !movieParams.title,
      imgUrl: !movieParams.imgUrl,
      imdbUrl: !movieParams.imdbUrl,
      imdbId: !movieParams.imdbId,
    }));

    if (paramsErrors.title || paramsErrors.imgUrl
      || paramsErrors.imdbUrl || paramsErrors.imdbId
      || !isValidHttpUrl(movieParams.imdbUrl)
      || !isValidHttpUrl(movieParams.imgUrl)) {
      return;
    }

    onAdd({
      title: movieParams.title,
      description: movieParams.description,
      imgUrl: movieParams.imgUrl,
      imdbUrl: movieParams.imdbUrl,
      imdbId: movieParams.imdbId,
    });
    setMovieParams({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
    setCount(count + 1);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movieParams.title}
        onChange={handleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movieParams.description}
        onChange={handleChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movieParams.imgUrl}
        onChange={handleChange}
        required
        hasInvalidLink={!isValidHttpUrl(movieParams.imgUrl)}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movieParams.imdbUrl.trim()}
        onChange={handleChange}
        required
        hasInvalidLink={!isValidHttpUrl(movieParams.imdbUrl)}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movieParams.imdbId}
        onChange={handleChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!movieParams.title.trim() || !movieParams.imgUrl
              || !movieParams.imdbUrl || !movieParams.imdbId
              || !isValidHttpUrl(movieParams.imgUrl)
              || !isValidHttpUrl(movieParams.imdbUrl)}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
