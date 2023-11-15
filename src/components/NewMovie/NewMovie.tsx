import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface NewMovieProps {
  onAdd: (details: Movie) => void;
}

export const NewMovie:React.FC<NewMovieProps> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [currTitle, setCurrTitle] = useState('');
  const [currDescription, setCurrDescription] = useState('');
  const [currImgUrl, setCurrImgUrl] = useState('');
  const [currImdbUrl, setCurrImdbUrl] = useState('');
  const [currImdbId, setCurrImdbId] = useState('');

  const disabledButton = currTitle !== ''
  && currImgUrl !== '' && currImdbUrl !== '' && currImdbId !== '';

  const handleButton = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd({
      title: currTitle,
      description: currDescription,
      imgUrl: currImgUrl,
      imdbUrl: currImdbUrl,
      imdbId: currImdbId,
    });

    setCurrTitle('');
    setCurrDescription('');
    setCurrImgUrl('');
    setCurrImdbUrl('');
    setCurrImdbId('');
    setCount(count + 1);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleButton}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={currTitle}
        onChange={(even) => setCurrTitle(even)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={currDescription}
        onChange={(even) => setCurrDescription(even)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={currImgUrl}
        onChange={(even) => setCurrImgUrl(even)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={currImdbUrl}
        onChange={(even) => setCurrImdbUrl(even)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={currImdbId}
        onChange={(even) => setCurrImdbId(even)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!disabledButton}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
