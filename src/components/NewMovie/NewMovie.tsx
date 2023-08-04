import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [newValue, setNewValue] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleTextFieldChange = (name: string, value: string) => {
    setNewValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const validInput = newValue.title
  && newValue.imgUrl && newValue.imdbUrl && newValue.imdbId;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validInput) {
      onAdd(newValue);
      setCount((prevCount) => prevCount + 1);

      setNewValue({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      });
    }
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
        value={newValue.title}
        onChange={(value) => handleTextFieldChange('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newValue.description}
        onChange={(value) => handleTextFieldChange('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newValue.imgUrl}
        onChange={(value) => handleTextFieldChange('imgUrl', value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newValue.imdbUrl}
        onChange={(value) => handleTextFieldChange('imdbUrl', value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newValue.imdbId}
        onChange={(value) => handleTextFieldChange('imdbId', value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!validInput}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
