import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

const defaultFieldsTitle: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

const pattern =
  // eslint-disable-next-line max-len
  /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

export const NewMovie = ({ onAdd }: Props) => {
  const [count, setConut] = useState(0);
  const [newMovie, setNewMovie] = useState(defaultFieldsTitle);
  const { title, description, imgUrl, imdbUrl, imdbId } = newMovie;

  const canSubmit = Object.entries(newMovie).every(field => {
    const [fieldName, fieldTitle] = field;

    if (fieldName === 'description') {
      return true;
    }

    if (fieldName === 'imgUrl' || fieldName === 'imdbUrl') {
      return pattern.test(fieldTitle.trim());
    }

    return fieldTitle.trim() !== '';
  });

  const handleSubmitNewMovie = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setConut(prev => prev + 1);
    onAdd(newMovie);
    setNewMovie(defaultFieldsTitle);
  };

  const handleChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewMovie((prev: Movie) => ({ ...prev, [name]: value }));
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmitNewMovie}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleChangeField}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleChangeField}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleChangeField}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleChangeField}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleChangeField}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!canSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
