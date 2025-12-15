import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [values, setValues] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleValues = (field: string, value: string) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };

  const hasErrors =
    !values.title.trim() ||
    !values.imgUrl.trim() ||
    !values.imdbId.trim() ||
    !values.imdbUrl.trim();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setCount(prev => prev + 1);

    onAdd(values);

    setValues({
      title: '',
      description: '',
      imgUrl: '',
      imdbId: '',
      imdbUrl: '',
    });
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={values.title}
        onChange={title => handleValues('title', title)}
        required={true}
      />

      <TextField
        name="description"
        label="Description"
        value={values.description}
        onChange={descr => handleValues('description', descr)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={values.imgUrl}
        onChange={url => handleValues('imgUrl', url)}
        required={true}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={values.imdbUrl}
        onChange={url => handleValues('imdbUrl', url)}
        required={true}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={values.imdbId}
        onChange={id => handleValues('imdbId', id)}
        required={true}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={hasErrors}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
