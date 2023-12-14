import { FC, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [inputTitle, setinputTitle] = useState('');
  const [inputDescription, setinputDescription] = useState('');
  const [inputImageURL, setinputImageURL] = useState('');
  const [inputImdbURL, setinputImdbURL] = useState('');
  const [inputImdbID, setinputImdbID] = useState('');

  const handleInputTitle = (event) => {
    setinputTitle(event.target.value);
  };

  const handleInputDescription = (event) => {
    setinputDescription(event.target.value);
  };

  const handleInputImageURL = (event) => {
    setinputImageURL(event.target.value);
  };

  const handleInputImdbURL = (event) => {
    setinputImdbURL(event.target.value);
  };

  const handleInputImdbID = (event) => {
    setinputImdbID(event.target.value);
  };

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={inputTitle}
        onChange={event => handleInputTitle(event)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={inputDescription}
        onChange={event => handleInputDescription(event)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={inputImageURL}
        onChange={event => handleInputImageURL(event)}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={inputImdbURL}
        onChange={event => handleInputImdbURL(event)}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={inputImdbID}
        onChange={event => handleInputImdbID(event)}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={NewMovie(movie)}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
