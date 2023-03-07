import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { checkUrl } from '../../helpers/urlChecker';

type Props = {
  onAdd: (movie: Movie) => void
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const isDisabled = () => {
    return !title
      || !imgUrl
      || checkUrl(imgUrl) === false
      || checkUrl(imdbUrl) === false
      || !imdbUrl
      || !imdbId;
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const handleSumbit = () => {
    setCount(state => state + 1);

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    resetForm();
  };

  return (
    <form className="NewMovie" key={count}>
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
        onChange={setDescription}
        value={description}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        onChange={setImgUrl}
        onValidation={checkUrl}
        value={imgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        onChange={setImdbUrl}
        onValidation={checkUrl}
        value={imdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        onChange={setImdbId}
        value={imdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="button"
            data-cy="submit-button"
            className="button is-link"
            onClick={handleSumbit}
            disabled={isDisabled()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
