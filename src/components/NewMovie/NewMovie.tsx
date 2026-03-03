import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd?: (movie: Movie) => void;
};

const urlRegex =
  // eslint-disable-next-line max-len
  /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

const createEmptyMovie = (): Movie => ({
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
});

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [form, setForm] = useState<Movie>(createEmptyMovie());
  const [count, setCount] = useState(0);

  const handleChange = (name: keyof Movie, value: string) => {
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const isTitleValid = form.title.trim().length > 0;
  const isImgUrlValid =
    form.imgUrl.trim().length > 0 && urlRegex.test(form.imgUrl);
  const isImdbUrlValid =
    form.imdbUrl.trim().length > 0 && urlRegex.test(form.imdbUrl);
  const isImdbIdValid = form.imdbId.trim().length > 0;

  const isFormValid =
    isTitleValid && isImgUrlValid && isImdbUrlValid && isImdbIdValid;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    onAdd?.(form);

    setForm(createEmptyMovie());
    setCount(prev => prev + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={form.title}
        onChange={value => handleChange('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={form.description}
        onChange={value => handleChange('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={form.imgUrl}
        onChange={value => handleChange('imgUrl', value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={form.imdbUrl}
        onChange={value => handleChange('imdbUrl', value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={form.imdbId}
        onChange={value => handleChange('imdbId', value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
