import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

enum Fields {
  title = 'Title',
  description = 'Description',
  imgUrl = 'Image URL',
  imdbUrl = 'Imdb URL',
  imdbId = 'Imdb ID',
}

const isValid = (value: string): boolean => {
  return value.trim().length > 0;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const reset = () => {
    setCount(0);
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const handleFormSubmit = (event: React.FormEvent): void => {
    event.preventDefault();

    const newMovie = {
      title: title.trim(),
      description: description.trim(),
      imgUrl: imgUrl.trim(),
      imdbUrl: imdbUrl.trim(),
      imdbId: imdbId.trim(),
    };

    onAdd(newMovie);

    setCount(count + 1);
    reset();
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleFormSubmit}
      onReset={reset}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label={Fields.title}
        value={title}
        onChange={(newValue: string) => setTitle(newValue)}
        required
      />

      <TextField
        name="description"
        label={Fields.description}
        value={description}
        onChange={(newValue: string) => setDescription(newValue)}
      />

      <TextField
        name="imgUrl"
        label={Fields.imgUrl}
        value={imgUrl}
        onChange={(newValue: string) => setImgUrl(newValue)}
        required
      />

      <TextField
        name="imdbUrl"
        label={Fields.imdbUrl}
        value={imdbUrl}
        onChange={(newValue: string) => setImdbUrl(newValue)}
        required
      />

      <TextField
        name="imdbId"
        label={Fields.imdbId}
        value={imdbId}
        onChange={(newValue: string) => setImdbId(newValue)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={
              !isValid(title) ||
              !isValid(imgUrl) ||
              !isValid(imdbUrl) ||
              !isValid(imdbId)
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
