import { FC, useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';
import { validateUrl } from './validation';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCounter] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setUrl] = useState('');
  const [imdbId, setId] = useState('');

  const isValidForm = () => {
    return !(
      !title
      || !description
      || !imgUrl
      || !imdbUrl
      || !imdbId
      || !validateUrl(imdbUrl)
      || !validateUrl(imgUrl)
    );
  };

  const reset = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setUrl('');
    setId('');
  };

  const onSubmit = () => {
    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });
    setCounter(prevState => prevState + 1);
    reset();
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={onSubmit}
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
        onChange={setImgUrl}
        required
        validate={validateUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setUrl}
        required
        validate={validateUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isValidForm()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
