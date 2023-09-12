import { FormEventHandler, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie = ({ onAdd } : Props) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setimdbUrl] = useState('');
  const [imdbId, setimdbId] = useState('');
  const [addMovie, setAddMovie] = useState({
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  });

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    onAdd(addMovie);
    setCount(count + 1);
    setTitle('');
    setDescription('');
    setImgUrl('');
    setimdbUrl('');
    setimdbId('');
  };

  const handleClick = () => {
    setAddMovie({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });
  };

  const isAllFilled = title !== ''
  && imgUrl !== ''
  && imdbUrl !== ''
  && imdbId !== '';

  return (
    <form className="NewMovie" key={count} onSubmit={(e) => handleSubmit(e)}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(event) => setTitle(event)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(event) => setDescription(event)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(event) => setImgUrl(event)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(event) => setimdbUrl(event)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(event) => setimdbId(event)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={handleClick}
            disabled={!isAllFilled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
