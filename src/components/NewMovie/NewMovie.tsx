import { FC, useMemo, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [inputTitle, setInputTitle] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const [inputImageURL, setInputImageURL] = useState('');
  const [inputImdbURL, setInputImdbURL] = useState('');
  const [inputImdbID, setInputImdbID] = useState('');

  const addMovie = () => {
    const movie: Movie = {
      title: inputTitle,
      description: inputDescription,
      imgUrl: inputImageURL,
      imdbUrl: inputImdbURL,
      imdbId: inputImdbID,
    };

    setCount(prevCounter => prevCounter + 1);
    setInputTitle('');
    setInputDescription('');
    setInputImageURL('');
    setInputImdbURL('');
    setInputImdbID('');
    onAdd(movie);
  };

  const invalidInput = (inputTitle.trim() === ''
  || inputImageURL.trim() === ''
  || inputImdbURL.trim() === ''
  || inputImdbID.trim() === '');

  const verifyInput = useMemo(() => () => {
    return invalidInput;
  }, [invalidInput]);

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={inputTitle}
        onChange={setInputTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={inputDescription}
        onChange={setInputDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={inputImageURL}
        onChange={setInputImageURL}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={inputImdbURL}
        onChange={setInputImdbURL}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={inputImdbID}
        onChange={setInputImdbID}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={addMovie}
            disabled={verifyInput()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
