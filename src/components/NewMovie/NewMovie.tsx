import React, { useState } from 'react';
import { Movie } from '../../types/Movie';
import { Field } from '../Field/Field';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase count after form submission to reset touched
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const data = {
    title: title.trim(),
    description: description.trim(),
    imgUrl: imgUrl.trim(),
    imdbUrl: imdbUrl.trim(),
    imdbId: imdbId.trim(),
  };

  const isFormValid = Boolean(
    data.title && data.imdbId && data.imdbUrl && data.imgUrl,
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    onAdd(data);

    setTitle('');
    setDescription('');
    setImdbId('');
    setImdbUrl('');
    setImgUrl('');

    setCount(n => n + 1);
  };

  return (
    <form className="NewMovie" onSubmit={handleSubmit} key={count}>
      <h2 className="title">Add a movie</h2>

      <Field
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        required
      />

      <Field
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
      />

      <Field
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={setImgUrl}
        required
      />

      <Field
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
      />

      <Field
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
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
