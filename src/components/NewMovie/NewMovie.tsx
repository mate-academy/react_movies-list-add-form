/* eslint-disable max-len */
import { SyntheticEvent, useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const isDisabled = !title.trim() || !imgUrl || !imdbUrl || !imdbId;
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const urlValidation = (url: string) => {
    if (pattern.test(url)) {
      return true;
    }

    return false;
  };

  const handleChangeTitle = (e: string) => {
    setTitle(e);
  };

  const handleChangeDescription = (e: string) => {
    setDescription(e);
  };

  const handleChangeImgUrl = (e: string) => {
    setImgUrl(e);
  };

  const handleChangeImdbUrl = (e: string) => {
    setImdbUrl(e);
  };

  const handleChangeImdbId = (e: string) => {
    setImdbId(e);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);
    setCount(prev => prev + 1);
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
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
        value={title}
        onChange={handleChangeTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleChangeDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleChangeImgUrl}
        urlValidation={urlValidation}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleChangeImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleChangeImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={isDisabled}
            type="submit"
            data-cy="submit-button"
            className="button is-link"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
