import React, { useState } from 'react';
import { TextField } from '../TextField';

type Movie = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

interface NewProps {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<NewProps> = ({ onAdd }) => {
  const pattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,6})(\/\S*)?$/;

  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const isFormal =
    title.trim() && imgUrl.trim() && imdbUrl.trim() && imdbId.trim();

  const allClear = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newMovie = { title, description, imgUrl, imdbUrl, imdbId };

    onAdd(newMovie);
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setErrors({});
  };

  return (
    <form className="NewMovie" onSubmit={allClear}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(value: string) => setTitle(value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(value: string) => setDescription(value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(value: string) => setImgUrl(value)}
        validate={value => {
          const error = pattern.test(value) ? null : 'Bad Url';

          setErrors(prev => ({ ...prev, imgUrl: error }));

          return error;
        }}
        error={errors.imgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(value: string) => setImdbUrl(value)}
        validate={value => {
          const error = pattern.test(value) ? null : 'Invalid URL';

          setErrors(prev => ({ ...prev, imdbUrl: error }));

          return error;
        }}
        error={errors.imdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(value: string) => setImdbId(value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormal}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
