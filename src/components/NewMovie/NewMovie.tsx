import { FormEventHandler, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie = ({ onAdd }: Props) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [titleInput, setTitleInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [imgUrlInput, setImgUrlInput] = useState('');
  const [imdbUrlInput, setImdbUrlInput] = useState('');
  const [imdbIdInput, setimdbIdInput] = useState('');
  const increaseCount = () => {
    setCount(count + 1);
  };

  const successfulSubmission =
    titleInput !== '' &&
    imgUrlInput !== '' &&
    imdbUrlInput !== '' &&
    imdbIdInput !== '';

  const handleSubmit: FormEventHandler = event => {
    event.preventDefault();
    increaseCount();
    const movie: Movie = {
      title: titleInput.trimEnd(),
      description: descriptionInput.trimEnd(),
      imgUrl: imgUrlInput.trimEnd(),
      imdbUrl: imdbUrlInput.trimEnd(),
      imdbId: imdbIdInput.trimEnd(),
    };

    if (successfulSubmission) {
      onAdd(movie);
      setTitleInput('');
      setDescriptionInput('');
      setImgUrlInput('');
      setImdbUrlInput('');
      setimdbIdInput('');
    }
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={titleInput}
        onChange={setTitleInput}
        required
      />

      <TextField
        onChange={setDescriptionInput}
        name="description"
        label="Description"
        value={descriptionInput}
      />

      <TextField
        onChange={setImgUrlInput}
        name="imgUrl"
        label="Image URL"
        value={imgUrlInput}
        required
      />

      <TextField
        onChange={setImdbUrlInput}
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrlInput}
        required
      />

      <TextField
        onChange={setimdbIdInput}
        name="imdbId"
        label="Imdb ID"
        value={imdbIdInput}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={!successfulSubmission}
            type="submit"
            data-cy="submit-button"
            className="button is-link"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
