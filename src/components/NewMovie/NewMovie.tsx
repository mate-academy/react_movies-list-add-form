import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie = ({ onAdd }: Props) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const isFiledRequiredTextField =
    title.trim() && imgUrl.trim() && imdbUrl.trim() && imdbId.trim();

  function handlerSubmitForm(event: React.FormEvent) {
    event.preventDefault();

    if (isFiledRequiredTextField) {
      onAdd({ title, description, imgUrl, imdbUrl, imdbId });

      setTitle('');
      setDescription('');
      setImgUrl('');
      setImdbId('');
      setImdbUrl('');

      setCount(prev => prev + 1);
    }
  }

  const handleSetTitle = (newValue: string) => {
    setTitle(newValue);
  };

  const handleSetDescription = (newValue: string) => {
    setDescription(newValue);
  };

  const handleSetImgUrl = (newValue: string) => {
    setImgUrl(newValue);
  };

  const handleSetImdbUrl = (newValue: string) => {
    setImdbUrl(newValue);
  };

  const handleSetImdbId = (newValue: string) => {
    setImdbId(newValue);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handlerSubmitForm}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleSetTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleSetDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleSetImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleSetImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleSetImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFiledRequiredTextField}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
