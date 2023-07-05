import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (newMovie: Movie) => void;
}

const initialFormValues: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [formValues, setFormValues] = useState(initialFormValues);

  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = formValues;

  const validValues = title.trim()
    && imgUrl.trim()
    && imdbUrl.trim()
    && imdbId.trim();

  const isDisabled = !title || !imgUrl || !imdbUrl || !imdbId || !validValues;

  const handleFormChange = (name: string, value: string) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleReset = () => {
    setFormValues(initialFormValues);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    handleReset();
    setCount((prevCount) => prevCount + 1);

    onAdd(newMovie);
  };

  return (
    <form
      key={count}
      className="NewMovie"
      onSubmit={handleSubmit}
    >
      <h2 className="title">
        Add a movie

        { count}

      </h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(value) => handleFormChange('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={value => handleFormChange('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={value => handleFormChange('imgUrl', value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={value => handleFormChange('imdbUrl', value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={value => handleFormChange('imdbId', value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
