import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd?: (movie: Movie) => void;
};

export const NewMovie: React.FunctionComponent<Props>
  = ({ onAdd = () => {} }) => {
    // Increase the count after successful form submission
    // to reset touched status of all the `Field`s
    const [count, setCount] = useState(0);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [imdbUrl, setImdbUrl] = useState('');
    const [imdbId, setImdbId] = useState('');

    const reset = () => {
      setTitle('');
      setDescription('');
      setImdbId('');
      setImgUrl('');
      setImdbUrl('');
    };

    const isDisabled = () => {
      if (!title || !imgUrl || !imdbId || !imdbUrl) {
        return true;
      }

      return false;
    };

    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();

      const newMovie: Movie = {
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      };

      onAdd(newMovie);
      setCount(prevCount => prevCount + 1);
      reset();
    };

    return (
      <form
        className="NewMovie"
        key={count}
        onSubmit={handleSubmit}
      >
        <h2 className="title">Add a movie</h2>

        <TextField
          name="title"
          label="Title"
          value={title}
          onChange={newTitle => setTitle(newTitle)}
          required
        />

        <TextField
          name="description"
          label="Description"
          value={description}
          onChange={newDescription => setDescription(newDescription)}
        />

        <TextField
          name="imgUrl"
          label="Image URL"
          value={imgUrl}
          onChange={newImgUrl => setImgUrl(newImgUrl)}
          required
        />

        <TextField
          name="imdbUrl"
          label="Imdb URL"
          value={imdbUrl}
          onChange={newImdbUrl => setImdbUrl(newImdbUrl)}
          required
        />

        <TextField
          name="imdbId"
          label="Imdb ID"
          value={imdbId}
          onChange={newImdbId => setImdbId(newImdbId)}
          required
        />

        <div className="field is-grouped">
          <div className="control">
            <button
              type="submit"
              data-cy="submit-button"
              className="button is-link"
              disabled={isDisabled()}
            >
              Add
            </button>
          </div>
        </div>
      </form>
    );
  };
