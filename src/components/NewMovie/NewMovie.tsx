import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

const EMPTY_MOVIE = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

// eslint-disable-next-line max-len
const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState<Movie>(EMPTY_MOVIE);
  const [isImgUrlValid, setIsImgUrlValid] = useState(true);
  const [isImdbIdValid, setIsImdbIdValid] = useState(true);

  const resetForm = () => {
    setCount(count + 1);
    setMovie(EMPTY_MOVIE);
  };

  const isFilled = !(
    movie.title.trim()
    && movie.imgUrl.trim()
    && movie.imdbUrl.trim()
    && movie.imdbId.trim()
  );

  const handleFieldChange = (field: string, value: string) => {
    if (field === 'imgUrl') {
      const isValid = pattern.test(value);

      setIsImgUrlValid(isValid);
    }

    if (field === 'imdbId') {
      const isValid = pattern.test(value);

      setIsImdbIdValid(isValid);
    }

    setMovie(newMovie => ({
      ...newMovie,
      [field]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (isFilled || !isImgUrlValid || !isImdbIdValid) {
      return;
    }

    onAdd(movie);

    resetForm();
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
        value={movie.title}
        onChange={
          (value) => handleFieldChange('title', value)
        }
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={
          (newDescription) => handleFieldChange('description', newDescription)
        }
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={
          (newImgUrl) => handleFieldChange('imgUrl', newImgUrl)
        }
        required
        pattern={pattern}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={
          (newImdbUrl) => handleFieldChange('imdbUrl', newImdbUrl)
        }
        required
        pattern={pattern}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={
          (newImdbId) => handleFieldChange('imdbId', newImdbId)
        }
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isFilled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
