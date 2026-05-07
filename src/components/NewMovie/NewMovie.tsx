import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [titleField, setTitleField] = useState<Movie['title']>('');
  const [descriptionField, setDescriptionField] =
    useState<Movie['description']>('');
  const [imgUrlField, setImgUrlField] = useState<Movie['imgUrl']>('');
  const [imdbUrlField, setImdbUrlField] = useState<Movie['imdbUrl']>('');
  const [imdbIdField, setImdbIdField] = useState<Movie['imdbId']>('');

  const isFormValid: boolean = Boolean(
    titleField && imgUrlField && imdbIdField && imdbUrlField,
  );

  const resetForm = () => {
    setTitleField('');
    setDescriptionField('');
    setImgUrlField('');
    setImdbUrlField('');
    setImdbIdField('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCount(prevCount => prevCount + 1);
    const newMovie: Movie = {
      title: titleField,
      description: descriptionField,
      imgUrl: imgUrlField,
      imdbUrl: imdbUrlField,
      imdbId: imdbIdField,
    };

    onAdd(newMovie);
    resetForm();
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={event => handleSubmit(event)}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={titleField}
        onChange={setTitleField}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={descriptionField}
        onChange={setDescriptionField}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrlField}
        onChange={setImgUrlField}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrlField}
        onChange={setImdbUrlField}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbIdField}
        onChange={setImdbIdField}
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
