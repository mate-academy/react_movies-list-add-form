import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [titleInput, setTitleInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [imgUrlInput, setImgUrlInput] = useState('');
  const [imdbUrlInput, setImdbUrlInput] = useState('');
  const [imdbIdInput, setImdbIdInput] = useState('');

  const isFormValid =
    titleInput.trim() &&
    imgUrlInput.trim() &&
    imdbUrlInput.trim() &&
    imdbIdInput.trim();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newMovie: Movie = {
      title: titleInput,
      description: descriptionInput,
      imgUrl: imgUrlInput,
      imdbUrl: imdbIdInput,
      imdbId: imdbIdInput,
    };

    onAdd(newMovie);

    setTitleInput('');
    setDescriptionInput('');
    setImgUrlInput('');
    setImdbUrlInput('');
    setImdbIdInput('');
    setCount(prev => prev + 1);
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
        name="description"
        label="Description"
        value={descriptionInput}
        onChange={setDescriptionInput}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrlInput}
        onChange={setImgUrlInput}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrlInput}
        onChange={setImdbUrlInput}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbIdInput}
        onChange={setImdbIdInput}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
