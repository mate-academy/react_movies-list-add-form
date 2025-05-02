import { useState } from 'react';
import { TextField } from '../TextField';
import React from 'react';
import { Movie } from '../../App';

type NewMovieProps = {
  onAdd: (newMovie: Movie) => void;
};

export function NewMovie({ onAdd }: NewMovieProps) {
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [description, setDescription] = useState('');

  const handlyButton = title && description && imgUrl && imdbUrl && imdbId;

  const urlEror = (url: string): boolean => {
    const pattern =
      /* eslint-disable-next-line max-len */
      /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    if (pattern.test(url)) {
      return true;
    }

    return false;
  };

  return (
    <form
      key={count}
      className="NewMovie"
      onSubmit={e => {
        e.preventDefault();
        onAdd({ title, imgUrl, imdbId, imdbUrl, description });

        setCount(prev => prev + 1);

        setTitle('');
        setImgUrl('');
        setImdbId('');
        setImdbUrl('');
        setDescription('');
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
        required
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        urlEror={urlEror}
        onChange={setImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        urlEror={urlEror}
        onChange={setImdbUrl}
        required
      />

      <TextField
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
            disabled={!handlyButton}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
}
