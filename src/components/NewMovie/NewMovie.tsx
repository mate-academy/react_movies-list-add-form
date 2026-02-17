import { useEffect, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [valueTitle, setValueTitle] = useState('');
  const [valueDescription, setValueDescription] = useState('');
  const [valueImage, setValueImage] = useState('');
  const [valueImdb, setValueImdb] = useState('');
  const [valueID, setValueID] = useState('');

  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const requiredFields = [valueTitle, valueImage, valueImdb, valueID];
    const hasEmptyField = requiredFields.some(field => !field.trim());

    setHasError(hasEmptyField);
  }, [valueTitle, valueImage, valueImdb, valueID]);

  function reset() {
    setValueTitle('');
    setValueDescription('');
    setValueImage('');
    setValueImdb('');
    setValueID('');
    setCount(prev => prev + 1);
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (hasError) {
      return;
    }

    const newMovie: Movie = {
      title: valueTitle.trim(),
      description: valueDescription.trim(),
      imgUrl: valueImage.trim(),
      imdbUrl: valueImdb.trim(),
      imdbId: valueID.trim(),
    };

    onAdd(newMovie);
    reset();
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={valueTitle}
        onChange={setValueTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={valueDescription}
        onChange={setValueDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={valueImage}
        onChange={setValueImage}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={valueImdb}
        onChange={setValueImdb}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={valueID}
        onChange={setValueID}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={hasError}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
