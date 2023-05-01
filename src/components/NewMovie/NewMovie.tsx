import { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';
import { pattern } from '../../utils';

type Props = {
  onAdd: (movie: Movie) => void
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitile] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setimdbId] = useState('');

  const isImgUrlValid = pattern.test(imgUrl);
  const isImdbUrlValid = pattern.test(imdbUrl);

  const isButtonDisabled = !(
    title && isImgUrlValid && isImdbUrlValid && imdbId
  );

  function clearForm() {
    setTitile('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setimdbId('');
  }

  const createNewMovie = (event: React.FormEvent) => {
    event.preventDefault();

    const newMovie: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);
    clearForm();
    setCount(prevCount => prevCount + 1);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={createNewMovie}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitile}
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
        onChange={setimdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isButtonDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
