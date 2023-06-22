import { FC, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie :Movie) => void;
}

export const NewMovie:FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [description, setDescription] = useState('');

  const handleChangeTitle = (text: string) => {
    setTitle(text);
  };

  const handleChangeImdbUrl = (text: string) => {
    setImdbUrl(text);
  };

  const handleChangeImgUrl = (text: string) => {
    setImgUrl(text);
  };

  const handleChangeImdbId = (text: string) => {
    setImdbId(text);
  };

  const handleChangeDescription = (text: string) => {
    setDescription(text);
  };

  const isAllRequiredFilled = () => {
    const fields = [title, imdbUrl, imgUrl, imdbId];

    return fields.every(field => field);
  };

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setImdbId('');
    setImdbUrl('');
    setImgUrl('');
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();

    clearForm();
    setCount((currentCount) => currentCount + 1);

    const newMovie = {
      title,
      imdbUrl,
      imgUrl,
      imdbId,
      description,
    };

    onAdd(newMovie);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(e) => handleSubmitForm(e)}
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
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isAllRequiredFilled()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
