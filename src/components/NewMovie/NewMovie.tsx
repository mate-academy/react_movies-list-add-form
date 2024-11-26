import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

const isValid = (value: string): boolean => {
  return value.trim().length > 0;
};

enum Fields {
  title = 'Title',
  description = 'Description',
  imgUrl = 'Image URL',
  imdbUrl = 'Imdb URL',
  imdbId = 'Imdb ID',
}

export const NewMovie: React.FC<Props> = props => {
  const { onAdd } = props;

  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const onNewMovieSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setCount(currentCount => currentCount + 1);
    onAdd({
      title: title.trim(),
      description: description.trim(),
      imgUrl: imgUrl.trim(),
      imdbUrl: imdbUrl.trim(),
      imdbId: imdbId.trim(),
    });

    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  return (
    <form className="NewMovie" key={count} onSubmit={onNewMovieSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label={Fields.title}
        value={title}
        onChange={event => setTitle(event.target.value)}
        required
      />

      <TextField
        name="description"
        label={Fields.description}
        value={description}
        onChange={event => setDescription(event.target.value)}
      />

      <TextField
        name="imgUrl"
        label={Fields.imgUrl}
        value={imgUrl}
        onChange={event => setImgUrl(event.target.value)}
        required
      />

      <TextField
        name="imdbUrl"
        label={Fields.imdbUrl}
        value={imdbUrl}
        onChange={event => setImdbUrl(event.target.value)}
        required
      />

      <TextField
        name="imdbId"
        label={Fields.imdbId}
        value={imdbId}
        onChange={event => setImdbId(event.target.value)}
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
