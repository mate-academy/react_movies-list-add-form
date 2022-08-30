import { FormEvent, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (value: Movie) => void;
};

const createNewMovie = (
  inputTitle: string,
  inputImgUrl: string,
  inputImdbUrl: string,
  inputImdbId: string,
  inputDescription: string,
): Movie => {
  return {
    title: inputTitle,
    imgUrl: inputImgUrl,
    imdbUrl: inputImdbUrl,
    imdbId: inputImdbId,
    description: inputDescription,
  };
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const buttonActive = () => {
    if (title && imgUrl && imdbUrl && imdbId) {
      return true;
    }

    return false;
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (buttonActive()) {
      onAdd(createNewMovie(title, imgUrl, imdbUrl, imdbId, description));
    }

    setCount(prevState => prevState + 1);
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
      onSubmit={handleFormSubmit}
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
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={setImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!buttonActive()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
