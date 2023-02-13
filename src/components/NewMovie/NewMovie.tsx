import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  let isDisabled = true;

  const handleInputTitle = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleInputDescription = (newDescription: string) => {
    setDescription(newDescription);
  };

  const handleImgUrl = (newImgUrl: string) => {
    setImgUrl(newImgUrl);
  };

  const handleImdbUrl = (newImdbUrl: string) => {
    setImdbUrl(newImdbUrl);
  };

  const handleImdbId = (newImdbId: string) => {
    setImdbId(newImdbId);
  };

  const reset = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const handlerSubmit = () => {
    const movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(movie);
    setCount((prevCount) => prevCount + 1);
    reset();
  };

  if (title && imgUrl && imdbUrl && imdbId) {
    isDisabled = false;
  }

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handlerSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleInputTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleInputDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
