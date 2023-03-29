import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, SetCount] = useState(0);
  const [title, SetTitle] = useState('');
  const [description, SetDescription] = useState('');
  const [imgUrl, SetImgUrl] = useState('');
  const [imdbUrl, SetimdbUrl] = useState('');
  const [imdbId, SetimdbId] = useState('');

  const buttonEnable = title && imgUrl && imdbId && imdbUrl;

  const clearForm = () => {
    SetTitle('');
    SetDescription('');
    SetImgUrl('');
    SetimdbUrl('');
    SetimdbId('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newMovie: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);
    SetCount((currentCount) => currentCount + 1);
    clearForm();
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
        onChange={SetTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={SetDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={SetImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={SetimdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={SetimdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!buttonEnable}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
