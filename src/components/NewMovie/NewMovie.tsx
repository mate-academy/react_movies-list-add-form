import { FormEventHandler, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

// eslint-disable-next-line @typescript-eslint/naming-convention
type onAddProps = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie = ({ onAdd }: onAddProps) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [titleMovie, setTitleMovie] = useState('');
  const [descriptionMovie, setDescriptionsMovie] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [imdbURL, setImdbURL] = useState('');
  const [imdbId, setImdbId] = useState('');

  const fieldChecking = () => {
    if (
      titleMovie.length > 0 &&
      imageURL.length > 0 &&
      imdbURL.length > 0 &&
      imdbId.length > 0
    ) {
      return true;
    }

    return false;
  };

  const handlerSubmit: FormEventHandler = event => {
    event.preventDefault();
    if (fieldChecking()) {
      onAdd({
        title: titleMovie,
        description: descriptionMovie,
        imgUrl: imageURL,
        imdbUrl: imdbURL,
        imdbId: imdbId,
      });

      setCount(prev => prev + 1);

      setTitleMovie('');
      setDescriptionsMovie('');
      setImageURL('');
      setImdbURL('');
      setImdbId('');
    }
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handlerSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={titleMovie}
        onChange={setTitleMovie}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={descriptionMovie}
        onChange={setDescriptionsMovie}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imageURL}
        onChange={setImageURL}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbURL}
        onChange={setImdbURL}
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
            disabled={fieldChecking() === false}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
