import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void,
};

// eslint-disable-next-line max-len
const urlIsValid = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (newMovie.title.trim() !== ''
      && newMovie.description.trim() !== ''
      && newMovie.imgUrl.trim() !== ''
      && newMovie.imdbUrl.trim() !== ''
      && newMovie.imdbId.trim() !== ''
    ) {
      onAdd(newMovie);
      setCount(prevState => prevState + 1);
      setIsDisabled(true);
      setNewMovie({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      });
    }
  };

  const handleInputChange = (name: string, value: string): void => {
    setNewMovie({
      ...newMovie,
      [name]: value,
    });

    const {
      title,
      imgUrl,
      imdbUrl,
      imdbId,
    } = newMovie;

    const allInputAreValid = title
      && urlIsValid.test(imgUrl)
      && urlIsValid.test(imdbUrl) && imdbId;

    if (allInputAreValid) {
      setIsDisabled(false);
    }
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
        onChange={handleInputChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={handleInputChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={handleInputChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={handleInputChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={handleInputChange}
        required
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
