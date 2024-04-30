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

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    onAdd({
      title: title,
      description: description,
      imgUrl: imgUrl,
      imdbId: imdbId,
      imdbUrl: imdbUrl,
    });

    setCount(prev => prev + 1);
  };

  const isDisabledButton = () => {
    if (!title || !imdbId || !imdbUrl || !imgUrl) {
      return true;
    }

    return false;
  };

  const handleTitleChange = (newTitle: string): void => {
    setTitle(newTitle);
  };

  const handleDescriptionChange = (newDescription: string): void => {
    setDescription(newDescription);
  };

  const handleImgUrlChange = (newImgUrl: string): void => {
    setImgUrl(newImgUrl);
  };

  const handleImdbUrlChange = (newImdbUrl: string): void => {
    setImdbUrl(newImdbUrl);
  };

  const handleImdbIdChange = (newImdbId: string): void => {
    setImdbId(newImdbId);
  };

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleTitleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleDescriptionChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleImgUrlChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleImdbUrlChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleImdbIdChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={event => handleSubmit(event)}
            disabled={isDisabledButton()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
