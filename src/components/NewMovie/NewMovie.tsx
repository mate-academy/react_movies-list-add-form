import React, { useState } from 'react';

import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';
import { validateUrl } from '../../utils/validation';

const INITIAL_NEW_MOVIE_STATE: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState<Movie>(INITIAL_NEW_MOVIE_STATE);

  const handleInputChange = (newValue: string, field: keyof Movie) => {
    setNewMovie(prevMovie => {
      return {
        ...prevMovie,
        [field]: newValue,
      };
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd(newMovie);
    setCount(prevCount => prevCount + 1);
    setNewMovie(INITIAL_NEW_MOVIE_STATE);
  };

  const getIsFormValid = () => {
    const { title, imgUrl, imdbUrl, imdbId } = newMovie;

    return (
      title.trim() &&
      imgUrl.trim() &&
      imdbUrl.trim() &&
      imdbId.trim() &&
      validateUrl(imgUrl) &&
      validateUrl(imdbUrl)
    );
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={newValue => handleInputChange(newValue, 'title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={newValue => handleInputChange(newValue, 'description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={newValue => handleInputChange(newValue, 'imgUrl')}
        required
        validate={() => validateUrl(newMovie.imgUrl)}
        validationErrorMessage="Image URL should be valid URL."
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={newValue => handleInputChange(newValue, 'imdbUrl')}
        required
        validate={() => validateUrl(newMovie.imdbUrl)}
        validationErrorMessage="Imdb URL should be valid URL."
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={newValue => handleInputChange(newValue, 'imdbId')}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!getIsFormValid()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
