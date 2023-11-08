import React, { useEffect, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd(movie: Movie): void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isImdbUrlWrong, setIsImdbUrlWrong] = useState(false);
  const [isImgUrlWrong, setIsImgUrlWrong] = useState(false);

  const reset = () => {
    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // eslint-disable-next-line max-len
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    let isUrlWrong = false;

    if (!pattern.test(newMovie.imdbUrl.trim())) {
      setIsImdbUrlWrong(true);
      isUrlWrong = true;
    }

    if (!pattern.test(newMovie.imgUrl.trim())) {
      setIsImgUrlWrong(true);
      isUrlWrong = true;
    }

    if (isUrlWrong) {
      return;
    }

    setCount(count + 1);

    onAdd(newMovie);

    reset();
  };

  useEffect(() => {
    if (newMovie.title.trim() && newMovie.imdbId.trim()
    && newMovie.imdbUrl.trim() && newMovie.imgUrl.trim()) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setNewMovie({ ...newMovie, [name]: value });
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={onSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={(event) => handleChange(event)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={(event) => handleChange(event)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={(event) => handleChange(event)}
        urlChecker={{
          isUrlWrong: isImgUrlWrong,
          setIsUrlWrong: setIsImgUrlWrong,
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={(event) => handleChange(event)}
        urlChecker={{
          isUrlWrong: isImdbUrlWrong,
          setIsUrlWrong: setIsImdbUrlWrong,
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={(event) => handleChange(event)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={buttonDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
