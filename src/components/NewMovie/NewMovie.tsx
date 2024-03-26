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
  const handleTitleChange = (newTitlte: string) => {
    setTitle(newTitlte);
  };

  const [description, setDescription] = useState('');
  const handleDescriptionChange = (newDescription: string) => {
    setDescription(newDescription);
  };

  const [imgUrl, setImgUrl] = useState('');
  const handleImgUrlChange = (newImgUrl: string) => {
    setImgUrl(newImgUrl);
  };

  const [imdbUrl, setImdbUrl] = useState('');
  const handleImdbUrlChange = (newImdbUrl: string) => {
    setImdbUrl(newImdbUrl);
  };

  const [imdbId, setImdbId] = useState('');
  const handleImdbIdChange = (newImdbId: string) => {
    setImdbId(newImdbId);
  };

  const newMovie: Movie = {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  };

  let isNewMovieFill = true;

  const keysOfNewMovie = Object.keys(newMovie);

  isNewMovieFill = keysOfNewMovie.every(key => {
    if (key === 'description') {
      return true;
    }
    return newMovie[key] !== ''
  });

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
            disabled={!isNewMovieFill}
            onClick={event => {
              event.preventDefault();
              onAdd(newMovie);
              setCount(count + 1);
              setTitle('');
              setDescription('');
              setImgUrl('');
              setImdbUrl('');
              setImdbId('');
            }}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
