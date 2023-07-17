import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const onTitleChange = (value: string) => {
    setTitle(value);
    setIsButtonDisabled(!value || !imgUrl || !imdbUrl || !imdbId);
  };

  const onImgUrlChange = (value: string) => {
    setImgUrl(value);
    setIsButtonDisabled(!title || !value || !imdbUrl || !imdbId);
  };

  const onImdbUrlChange = (value: string) => {
    setImdbUrl(value);
    setIsButtonDisabled(!title || !imgUrl || !value || !imdbId);
  };

  const onImdbIdChange = (value: string) => {
    setImdbId(value);
    setIsButtonDisabled(!title || !imgUrl || !imdbUrl || !value);
  };

  const onSubmit = () => {
    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setIsButtonDisabled(true);
    setCount(count + 1);
  };

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={onTitleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={value => setDescription(value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={onImgUrlChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={onImdbUrlChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={onImdbIdChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isButtonDisabled}
            onClick={onSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
