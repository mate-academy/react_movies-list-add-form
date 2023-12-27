import React, { useEffect, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

function checkValidation(pattern: RegExp, url: string): boolean {
  return url === '' || pattern.test(url);
}

// eslint-disable-next-line max-len
const urlValidationPattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setNewMovie((prevMovie) => ({ ...prevMovie, [name]: value }));
  };

  const [checkedImgUrl, setCheckedImgUrl] = useState(false);
  const [checkedImdbUrl, setCheckedImdbUrl] = useState(false);

  const isDisabled = !newMovie.title
    || !newMovie.imgUrl
    || !newMovie.imdbUrl
    || !newMovie.imdbId
    || !checkedImgUrl
    || !checkedImdbUrl;

  useEffect(() => {
    setCheckedImgUrl(
      checkValidation(urlValidationPattern, newMovie.imgUrl),
    );

    setCheckedImdbUrl(
      checkValidation(urlValidationPattern, newMovie.imdbUrl),
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newMovie.imgUrl, newMovie.imdbUrl]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd(newMovie);

    setCount(currentCount => currentCount + 1);

    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
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
        value={newMovie.title}
        required
        onChange={handleChange}
      />

      <TextField
        name="description"
        label="description"
        value={newMovie.description}
        onChange={handleChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        required
        checkValidationUrl
        checkedUrl={checkedImgUrl}
        onChange={handleChange}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        required
        checkValidationUrl
        checkedUrl={checkedImdbUrl}
        onChange={handleChange}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        required
        onChange={handleChange}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
