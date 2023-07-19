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

  const isButtonDisabled = !title || !imgUrl || !imdbUrl || !imdbId;

  const newMovie: Movie = {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  };

  const onTitleChange = (value: string) => {
    setTitle(value);
  };

  const onImgUrlChange = (value: string) => {
    setImgUrl(value);
  };

  const onImdbUrlChange = (value: string) => {
    setImdbUrl(value);
  };

  const onImdbIdChange = (value: string) => {
    setImdbId(value);
  };

  const resetFields = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setCount(count + 1);
  };

  const onSubmit = () => {
    if (newMovie.title.trim() !== ''
      && newMovie.imgUrl.trim() !== ''
      && newMovie.imdbUrl.trim() !== ''
      && newMovie.imdbId.trim() !== ''
    ) {
      onAdd(newMovie);
    }

    resetFields();
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
